from django.contrib import admin
from django.urls import path, include
from delicafe_app import views
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.LoginView.as_view(), name="login"),
    path('home/', views.HomeView.as_view(), name="home"),
    path('reservation/', views.ReservationView.as_view(), name="reservation"),
    path('reservation/confirm/', views.ReservationConfirmView.as_view(), name="confirm"),
    path('reservation/done/', views.ReservationDoneView.as_view(), name="done"),
    path('reservation/seat/', views.ReservationSeatView.as_view(), name="seat"),
    path('reservation/history/', views.ReservationHistoryView.as_view(), name="seat"),
    path('reservation/cancel/', views.ReservationCancelView.as_view(), name="seat"),
    path('reservation/cancel/done/', views.ReservationCancelDoneView.as_view(), name="seat"),
]

if settings.DEBUG:
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]
