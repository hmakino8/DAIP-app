from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# from .models import CustomUser, Reservation, Product, OrderItem, ReservationDraft, CartItem


# class CustomUserAdmin(UserAdmin):
#   model = CustomUser
#   list_display = ('username', 'email', 'role')
#   fieldsets = UserAdmin.fieldsets + (
#     (None, {'fields': ('role',)}),
#   )
#   add_fieldsets = UserAdmin.add_fieldsets + (
#     (None, {'fields': ('role',)}),
#   )


# class ReservationAdmin(admin.ModelAdmin): 
#   list_display = ('reservation_number', 'user', 'date', 'time_start', 'time_end', 'seat_number', 'status')
#   list_filter = ('date', 'status')
#   search_fields = ('reservation_number', 'user__username')
#   ordering = ('-date',)


# class ProductAdmin(admin.ModelAdmin):
#   list_display = ('name', 'price')
#   search_fields = ('name',)


# class OrderItemAdmin(admin.ModelAdmin):
#   list_display = ('reservation', 'product', 'quantity')
#   list_filter = ('reservation__date',)
#   search_fields = ('reservation__reservation_number', 'product__name')
#   ordering = ('-reservation__date',)


# class ReservationDraftAdmin(admin.ModelAdmin):
#   list_display = ('user', 'date', 'time_start', 'time_end', 'seat_number')
#   list_filter = ('date',)
#   search_fields = ('user__username', 'seat_number')
#   ordering = ('-date',)


# class CartItemAdmin(admin.ModelAdmin):
#   list_display = ('reservation_draft', 'product', 'quantity', 'created_at')
#   list_filter = ('created_at',)
#   search_fields = ('reservation_draft__user__username', 'product__name')
#   ordering = ('-created_at',)


# admin.site.register(CustomUser, CustomUserAdmin)
# admin.site.register(Reservation, ReservationAdmin)
# admin.site.register(Product, ProductAdmin)
# admin.site.register(OrderItem, OrderItemAdmin)
# admin.site.register(ReservationDraft, ReservationDraftAdmin)
# admin.site.register(CartItem, CartItemAdmin)
