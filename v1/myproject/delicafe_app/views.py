from django.shortcuts import render, redirect
from django.views.generic import TemplateView, CreateView, View
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import logout
from .forms import SignUpForm, LoginForm
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib import messages
from .models import \
  Reservation as ReservationModel, \
  Product as ProductModel, \
  OrderItem as OrderItemModel, \
  TempOrderItem as TempOrderItemModel

class ReservationContextMixin:
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    reservations = ReservationModel.objects.filter(
      user=self.request.user
    )

    order_items = OrderItemModel.objects.filter(
      reservation__in=reservations
    )

    context['reservations'] = reservations
    context['order_items'] = order_items
    return context

# LoginRequiredMixin: ログインしていない場合はログイン画面にリダイレクト
# UserPassesTestMixin: ログインしているユーザーが特定のユーザーであるかをチェック 
class UserViewSet:
  class Home(LoginRequiredMixin, UserPassesTestMixin, TemplateView):
    template_name = "user/home.html"
    
    # UserPassesTestMixinで使用されるメソッド
    # 特定の条件を満たすユーザのみがビューにアクセスできるようにするための認証機能
    # True -> アクセス可
    # False -> アクセス不可 403エラー
    def test_func(self):
      return self.request.user.role == 'user'
    

  class Reservation:
    class Main(LoginRequiredMixin, ReservationContextMixin, TemplateView):
      template_name = "reservation/main.html"

      def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # カート情報
        context['cart_items'] = TempOrderItemModel.objects.filter(
          user=self.request.user
        )
        return context
      
    class Confirm(TemplateView):
      template_name = "reservation/confirm.html"

    class Done(TemplateView):
      template_name = "reservation/done.html"

    class Calendar(TemplateView):
      template_name = "reservation/calendar.html"

    class History(LoginRequiredMixin, ReservationContextMixin, TemplateView):
      template_name = "reservation/history.html"

    class Cancel(TemplateView):
      template_name = "reservation/cancel.html"

    class CancelDone(TemplateView):
      template_name = "reservation/cancel_done.html"

    class PreOrder(TemplateView):
      template_name = "reservation/pre-order.html"
      
      class DeleteCartItem(View):
        def post(self, request, item_id):
          cart_item = TempOrderItemModel.objects.get(id=item_id)
          cart_item.delete()
          return redirect('user:reservation_main')
      
      def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = ProductModel.objects.all()
        return context
      
      def post(self, request, *args, **kwargs):
        product_id = request.POST.get('product_id')
        if product_id:
          product = ProductModel.objects.get(id=product_id)
          
          temp_order = TempOrderItemModel.objects.filter(
            user=request.user,
            product=product
          ).first()  # なければNoneを返す
          
          if temp_order:
            temp_order.quantity += 1
            temp_order.save()
          else:
            TempOrderItemModel.objects.create(
              user=request.user,
              product=product,
              quantity=1
            )
            
        # 商品を追加したらメイン画面に戻る
        return redirect('user:reservation_main')

# reverse: URLの解決が即座に行われる。主に関数内やメソッド内で使用される。
# reverse_lazy: URLの解決が遅延される。主にクラス内で使用される。
# Djangoの起動時にURLconfが完全にロードされる前にクラス属性が評価されることがあり、上記の使い分けが必要。

class AccountsViewSet:
  class SignUp(CreateView):
    form_class = SignUpForm
    template_name = "accounts/signup.html"
    success_url = reverse_lazy('accounts:login')
    
    def form_valid(self, form):
      response = super().form_valid(form)
      return response

  class Login(LoginView):
    form_class = LoginForm
    template_name = "accounts/login.html"
    
    def get_success_url(self):
      if self.request.user.role == 'user':
        return reverse('user:home')
      elif self.request.user.role == 'staff':
        return reverse('staff:home')
      else:
        return reverse('login')
    
    def form_invalid(self, form):
      messages.error(self.request, '※メールアドレスもしくはパスワードが間違っています。')
      return super().form_invalid(form)
    
  class Logout(LogoutView):
    def dispatch(self, request, *args, **kwargs):
      # セッションのクリア
      logout(request)
      return super().dispatch(request, *args, **kwargs)

