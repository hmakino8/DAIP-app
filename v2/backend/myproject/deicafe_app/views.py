from django.shortcuts import render, redirect
from django.views.generic import TemplateView, CreateView, View
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import login, logout, authenticate
from .forms import SignUpForm, LoginForm
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib import messages
from django.utils import timezone
from datetime import timedelta
from .models import \
  Reservation as ReservationModel, \
  Product as ProductModel, \
  OrderItem as OrderItemModel, \
  ReservationDraft as ReservationDraftModel, \
  CartItem as CartItemModel, \
  CustomUser as CustomUserModel
from datetime import datetime

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from django.middleware.csrf import get_token
from .serializers import SignupSerializer

@api_view(['GET'])
def get_csrf_token(request):
  return JsonResponse({'csrfToken': get_token(request)})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
  user = request.user
  return Response({
    'username': user.username,
    'email': user.email,
    'role': user.role
  }, status=status.HTTP_200_OK)

@api_view(['POST'])
@csrf_exempt
def signup_api(request):
  if request.method == 'POST':
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
      password = request.data.get('password')
      password_confirm = request.data.get('password_confirm')
      
      if password != password_confirm:
        return Response(
          {'message': 'パスワード不一致'},
          status=status.HTTP_400_BAD_REQUEST
        )

      user = serializer.save()
      user.set_password(password)
      user.save()

      return Response(
        {'message': 'ユーザー登録完了'},
        status=status.HTTP_201_CREATED
      )
    return Response(
      serializer.errors,
      status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['POST'])
@csrf_exempt
def login_api(request):
  if request.method == 'POST':
    email = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=email, password=password)
    
    if user is not None:
      login(request, user)
      return Response({
        'message': 'ログイン成功',
        'username': user.username,
        'email': user.email,
        'role': user.role
      }, status=status.HTTP_200_OK)
    else:
      return Response({
        'message': '不正なログイン',
      }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@csrf_exempt
def logout_api(request):
  logout(request)
  return Response({'message': 'ログアウト成功'}, status=status.HTTP_200_OK)

class BaseUserView(LoginRequiredMixin, TemplateView):
  pass

class ReservationContextMixin:
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    reservations = ReservationModel.objects.filter(
      user=self.request.user
    )

    # order_items = OrderItemModel.objects.filter(
    #   reservation__in=reservations
    #   # user=self.request.user
    # )
    
    context['reservations'] = reservations
    # context['order_items'] = order_items
    context['total_price'] = sum(reservation.total_with_tax for reservation in reservations)
    return context

# LoginRequiredMixin: ログインしていない場合はログイン画面にリダイレクト
# UserPassesTestMixin: ログインしているユーザーが特定のユーザーであるかをチェック 
class UserViewSet:
  class Home(BaseUserView, UserPassesTestMixin):
    template_name = "user/home.html"
    
    # UserPassesTestMixinで使用されるメソッド
    # 特定の条件を満たすユーザのみがビューにアクセスできるようにするための認証機能
    # True -> アクセス可
    # False -> アクセス不可 403エラー
    def test_func(self):
      return self.request.user.role == 'user'
    

  class Reservation:
    class Main(BaseUserView):
      template_name = "reservation/main.html"
      
      def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        reservation_draft = ReservationDraftModel.objects.filter(user=self.request.user).first()
        cart_items = CartItemModel.objects.filter(user=self.request.user)
        context.update({
          'reservation_draft': reservation_draft,
          'cart_items': cart_items,
        })
        return context

      class DeleteCartItem(View):
        def post(self, request, item_id):
          cart_item = CartItemModel.objects.get(id=item_id)
          cart_item.delete()
          return redirect('user:reservation_main')
      
      class DeleteReservationDraft(View):
        def post(self, request, reservation_draft_id):
          reservation_draft = ReservationDraftModel.objects.get(id=reservation_draft_id)
          reservation_draft.delete()
          return redirect('user:reservation_main')
      
    class Confirm(BaseUserView):
      template_name = "reservation/confirm.html"

      def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        reservation_draft = ReservationDraftModel.objects.filter(user=self.request.user).first()
        cart_items = CartItemModel.objects.filter(user=self.request.user)
        context.update({
          'reservation_draft': reservation_draft,
          'cart_items': cart_items,
          'custom_user': CustomUserModel.objects.get(id=self.request.user.id)
        })
        return context

    class Done(BaseUserView):
      template_name = "reservation/done.html"
      
      # getリクエスト(~/reservation/done/に直接アクセスがあった場合)は~/reservation/confirmに遷移
      def get(self, request, *args, **kwargs):
        return redirect('user:reservation_confirm')
      
      def post(self, request, *args, **kwargs):
        # 仮予約の取得
        reservation_draft = ReservationDraftModel.objects.filter(user=self.request.user).first()
        cart_items = reservation_draft.cart_items

        # 予約情報の作成
        reservation = ReservationModel.objects.create(
          user=self.request.user,
          date=reservation_draft.date,
          time_start=reservation_draft.time_start,
          time_end=reservation_draft.time_end,
          seat_number=reservation_draft.seat_number,
          total=reservation_draft.cart_total,
          discount_amount=reservation_draft.cart_discount_amount,
          total_after_discount=reservation_draft.cart_total_after_discount,
          tax_amount=reservation_draft.cart_tax_amount,
          total_with_tax=reservation_draft.cart_total_with_tax,
          item_count=reservation_draft.item_count
        )
        
        for cart_item in cart_items:
          OrderItemModel.objects.create(
            reservation=reservation,
            product=cart_item.product,
            quantity=cart_item.quantity,
            total=cart_item.total
          )
        
        # 仮予約を削除
        reservation_draft.delete()
        cart_items.delete()
        
        context = self.get_context_data(**kwargs)
        context['reservation'] = reservation
        return self.render_to_response(context)
        
        # viewからレスポンスを返す場合は、必ず適切はHTTPレスポンスオブジェクトを返す必要があり、
        # get_context_data()は表示用のコンテキストデータの準備のみを担当し、return contextとしても親クラスのtemplate_viewのrender_to_response()が呼び出される。
        # postリクエストの場合は、return cont
        # 
        # getリクエストの場合は、return contextとしても親クラスのtemplate_viewのrender_to_response()が呼び出されるため、
        # def get_context_data()は、親クラスの処理フローに従い、コンテキストデータの準備のみを担当する。

    class Calendar(BaseUserView):
      template_name = "reservation/calendar.html"
      
      def post(self, request):
        if request.method == 'POST':
          if request.POST.get('role'):
            selected_seat = request.POST.get('role')
            context = self.get_context_data()
            context['selected_seat'] = selected_seat
            # return render(request, 'reservation/calendar.html', context)

          selected_date = datetime.strptime(request.POST.get('selected_date'), '%Y年%m月%d日')
          selected_time = request.POST.get('selected_time')
          time_end = datetime.strptime(selected_time, '%H:%M') + timedelta(hours=1)
          selected_seat = request.POST.get('selected_seat', '1')

          ReservationDraftModel.objects.create(
            user=request.user,
            date=selected_date,
            time_start=selected_time,
            time_end=time_end,
            seat_number=selected_seat
          )
          
          return redirect('user:reservation_main')

      def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        now = timezone.localtime()
        today = now.date()
        week_offset = int(self.request.GET.get('week_offset', 0))
        selected_seat = self.request.GET.get('seat', '1')
        reservation_number = self.request.GET.get('reservation_number', None)
        monday = today - timedelta(days=today.weekday()) + timedelta(weeks=week_offset)
        weekdates = [monday + timedelta(days=i) for i in range(7)]
        time_slots = [f'{i:02d}:00' for i in range(9, 17)]
        time_now = f'{now.time().hour:02d}:{now.time().minute:02d}'
        reservation_data = ReservationModel.objects.filter(
          date__in=weekdates,
          time_start__in=time_slots,
          seat_number=selected_seat
        )
        context['reservation_data'] = reservation_data
        DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        SEATS = ['1', '2', '3', '4', '5', '6', '7', '8']

        context['now'] = now
        context['weekdates'] = weekdates
        context['time_slots'] = time_slots
        context['DAYS_OF_WEEK'] = DAYS_OF_WEEK
        context['SEATS'] = SEATS
        context['time_now'] = time_now
        context['week_offset'] = week_offset
        context['selected_seat'] = selected_seat
        context['reservation_number'] = reservation_number
        
        available_seats_data = []
        for time in time_slots:
          for date in weekdates:
            slot_time_hour = datetime.strptime(time, '%H:%M').time().hour
            now_hour = now.time().hour
            is_weekend = date.weekday() >= 5
            is_available = (
              not is_weekend and
              (date > now.date() or 
              (date == now.date() and slot_time_hour > now_hour))
            )
            available_seats_data.append(is_available)

        reserved_seats_data = []
        for time in time_slots:
          for date in weekdates:
            is_reserved = any(
              r for r in reservation_data
              if r.date == date and r.time_start.strftime('%H:%M') == time
            )
            reserved_seats_data.append(is_reserved)

        calendar_data = []
        i = 0
        for time in time_slots:
          slots = []
          for date in weekdates:
            slots.append({
              'date': date,
              'time': time,
              'is_reserved': reserved_seats_data[i],
              'is_available': available_seats_data[i],
            })
            i += 1
          calendar_data.append({
            'time': time,
            'slots': slots,
          })
        context['calendar_data'] = calendar_data
        return context

    class History(ReservationContextMixin, BaseUserView):
      template_name = "reservation/history.html"
      
      def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)

      def post(self, request, *args, **kwargs):
        reservation_id = request.POST.get('reservation_id')
        return redirect('user:reservation_cancel', reservation_id=reservation_id)

    class Cancel(BaseUserView):
      template_name = "reservation/cancel.html"
      
      def get(self, request, reservation_id, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        reservation = ReservationModel.objects.get(id=reservation_id)
        order_items = reservation.orderitem_set.all()
        context['reservation'] = reservation
        context['order_items'] = order_items
        return self.render_to_response(context)
      
      class DeleteReservation(View):
        def post(self, request, reservation_id):
          reservation = ReservationModel.objects.get(id=reservation_id)
          reservation.delete()
          return redirect('user:reservation_cancel_done', reservation_id=reservation_id)


    class CancelDone(BaseUserView):
      template_name = "reservation/cancel_done.html"

      # def get(self, request, reservation_id, *args, **kwargs):
      #   context = self.get_context_data(**kwargs)
      #   reservation = ReservationModel.objects.get(id=reservation_id)
      #   context['reservation'] = reservation
      #   return self.render_to_response(context)

      def post(self, request, reservation_id):
        return redirect('user:reservation_cancel_done', reservation_id=reservation_id)

    class PreOrder(BaseUserView):
      template_name = "reservation/pre-order.html"
      
      # 商品を追加したらメイン画面に戻る
      def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = ProductModel.objects.all()
        return context
      
      def post(self, request, *args, **kwargs):
        product_id = request.POST.get('product_id')
        product = ProductModel.objects.get(id=product_id)
        reservation_draft = ReservationDraftModel.objects.filter(user=self.request.user).first()
        filtered_cart_item = CartItemModel.objects.filter(user=self.request.user, product=product).first()
        if filtered_cart_item:
          filtered_cart_item.quantity += 1
          filtered_cart_item.save()
        else:
          CartItemModel.objects.create(user=self.request.user, product=product, quantity=1)
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

class StaffViewSet:
  class Home(BaseUserView, UserPassesTestMixin):
    template_name = "staff/home.html"
    
    def test_func(self):
      return self.request.user.role == 'staff'
    
