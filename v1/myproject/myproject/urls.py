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
            path('confirm/', views.ReservationViewSet.User.Confirm.as_view(), name="confirm"),
            path('done/', views.ReservationViewSet.User.Done.as_view(), name="done"),
            path('seat/', views.ReservationViewSet.User.Seat.as_view(), name="seat"),
            path('history/', views.ReservationViewSet.User.History.as_view(), name="history"),
            path('cancel/', views.ReservationViewSet.User.Cancel.as_view(), name="cancel"),
            path('cancel/done/', views.ReservationViewSet.User.CancelDone.as_view(), name="cancel_done"),
        ])),

        path('home/', views.HomeViewSet.User.as_view(), name="home"),
    ], 'user'), namespace='user')),

    # accounts
    path('accounts/login/', views.AccountsViewSet.Login.as_view(), name="login"),
    path('accounts/signup/', views.AccountsViewSet.SignUp.as_view(), name="signup"),
]

if settings.DEBUG:
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]
