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
            path('main/', views.UserViewSet.Reservation.Main.as_view(), name="reservation_main"),
            path('confirm/', views.UserViewSet.Reservation.Confirm.as_view(), name="reservation_confirm"),
            path('done/', views.UserViewSet.Reservation.Done.as_view(), name="reservation_done"),
            path('calendar/', views.UserViewSet.Reservation.Calendar.as_view(), name="reservation_calendar"),
            path('history/', views.UserViewSet.Reservation.History.as_view(), name="reservation_history"),
            path('cancel/', views.UserViewSet.Reservation.Cancel.as_view(), name="reservation_cancel"),
            path('cancel/done/', views.UserViewSet.Reservation.CancelDone.as_view(), name="reservation_cancel_done"),
            path('pre-order/', views.UserViewSet.Reservation.PreOrder.as_view(), name="reservation_pre_order"),
            path('delete_cart_item/<int:item_id>/', views.UserViewSet.Reservation.PreOrder.DeleteCartItem.as_view(), name="delete_cart_item"),
            path('delete_temp_order/<int:temp_order_id>/', views.UserViewSet.Reservation.PreOrder.DeleteTempOrder.as_view(), name="delete_temp_order"),
        ])),

        path('home/', views.UserViewSet.Home.as_view(), name="home"),
    ], 'user'), namespace='user')),

    # accounts
    path('accounts/', include(([
        path('login/', views.AccountsViewSet.Login.as_view(), name="login"),
        path('signup/', views.AccountsViewSet.SignUp.as_view(), name="signup"),
        path('logout/', views.AccountsViewSet.Logout.as_view(), name="logout")
    ], 'accounts'), namespace='accounts')),
]

if settings.DEBUG:
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]
