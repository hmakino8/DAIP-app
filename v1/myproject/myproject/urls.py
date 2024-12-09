from django.contrib import admin
from django.urls import path
from delicafe_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.LoginView.as_view(), name="login"),
]
