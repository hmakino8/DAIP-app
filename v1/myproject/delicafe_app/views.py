from django.shortcuts import render
from django.views.generic import TemplateView

class LoginView(TemplateView):
  template_name = "index.html"
