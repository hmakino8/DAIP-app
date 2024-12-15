from django.shortcuts import render, redirect
from django.views.generic import TemplateView, CreateView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import logout
from .forms import SignUpForm, LoginForm
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib import messages

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
    class Main(TemplateView):
      template_name = "reservation/main.html"

    class Confirm(TemplateView):
      template_name = "reservation/confirm.html"

    class Done(TemplateView):
      template_name = "reservation/done.html"

    class Calendar(TemplateView):
      template_name = "reservation/calendar.html"

    class History(TemplateView):
      template_name = "reservation/history.html"

    class Cancel(TemplateView):
      template_name = "reservation/cancel.html"

    class CancelDone(TemplateView):
      template_name = "reservation/cancel_done.html"


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

