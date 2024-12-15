from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser


class SignUpForm(UserCreationForm):
  username = forms.CharField(
    required=True,
    widget=forms.TextInput(attrs={
      'autofocus': True,
      'placeholder': 'ユーザー名',
    }),
  )
  
  email = forms.EmailField(
    required=True,
    widget=forms.EmailInput(attrs={
      'placeholder': 'メールアドレス',
    }),
  )
  
  password1 = forms.CharField(
    widget=forms.PasswordInput(attrs={
      'placeholder': 'パスワード',
    }),
  )

  password2 = forms.CharField(
    widget=forms.PasswordInput(attrs={
      'placeholder': 'パスワード確認',
    }),
  )

  role = forms.CharField(
    initial='user',
    widget=forms.HiddenInput(),  # ユーザーには非表示
  )

  class Meta:
    model = CustomUser
    fields = ['username', 'email', 'password1', 'password2', 'role']


class LoginForm(AuthenticationForm):
  username = forms.EmailField(
    widget=forms.TextInput(attrs={
      'placeholder': 'メールアドレス',
      'autofocus': True,
    }),
  )

  password = forms.CharField(
    widget=forms.PasswordInput(attrs={
      'placeholder': 'パスワード'
    }),
  )