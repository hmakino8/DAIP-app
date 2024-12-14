from django.shortcuts import render
from django.views.generic import TemplateView

class LoginView(TemplateView):
  template_name = "login.html"

class HomeView(TemplateView):
  template_name = "user_home.html"

class ReservationView(TemplateView):
  template_name = "reservation.html"
  
  # def get_context_data(self, **kwargs):
  #   context = super().get_context_data(**kwargs)
  #   context.update({
  #     'back_url': '',
  #     'next_text': '次へ',
  #     'next_color': 'blue-500',
  #     'next_url': ''
  #   })
  #   return context

class ReservationConfirmView(TemplateView):
  template_name = "reservation_confirm.html"

class ReservationDoneView(TemplateView):
  template_name = "reservation_done.html"

class ReservationSeatView(TemplateView):
  template_name = "reservation_seat.html"

class ReservationHistoryView(TemplateView):
  template_name = "reservation_history.html"

class ReservationCancelView(TemplateView):
  template_name = "reservation_cancel.html"

class ReservationCancelDoneView(TemplateView):
  template_name = "reservation_cancel_done.html"