from django.contrib import admin
from django.urls import path, include
from delicafe_app import views
from django.conf import settings

urlpatterns = [
    # admin
    path('admin/', admin.site.urls),

    # user
    path('', include(([
        path('reservation/', include([
            path('confirm/', views.UserViewSet.Reservation.Confirm.as_view(), name="confirm"),
            path('done/', views.UserViewSet.Reservation.Done.as_view(), name="done"),
            path('seat/', views.UserViewSet.Reservation.Seat.as_view(), name="seat"),
            path('history/', views.UserViewSet.Reservation.History.as_view(), name="history"),
            path('cancel/', views.UserViewSet.Reservation.Cancel.as_view(), name="cancel"),
            path('cancel/done/', views.UserViewSet.Reservation.CancelDone.as_view(), name="cancel_done"),
        ])),

        path('home/', views.UserViewSet.Home.as_view(), name="home"),
    ], 'user'), namespace='user')),

    # accounts
    path('accounts/login/', views.AccountsViewSet.Login.as_view(), name="login"),
    path('accounts/signup/', views.AccountsViewSet.SignUp.as_view(), name="signup"),
]

if settings.DEBUG:
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]
