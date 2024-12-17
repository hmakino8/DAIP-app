from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Reservation, Product, OrderItem, TempOrder, TempOrderItem

class CustomUserAdmin(UserAdmin):
  model = CustomUser
  list_display = ('username', 'email', 'role')
  fieldsets = UserAdmin.fieldsets + (
    (None, {'fields': ('role',)}),
  )
  add_fieldsets = UserAdmin.add_fieldsets + (
    (None, {'fields': ('role',)}),
  )
  

class ReservationAdmin(admin.ModelAdmin): 
  list_display = ('reservation_id', 'user', 'date', 'start_time', 'end_time', 'seat_id', 'status')
  list_filter = ('date', 'status')
  search_fields = ('reservation_id', 'user__username')
  ordering = ('-date',)
  

class ProductAdmin(admin.ModelAdmin):
  list_display = ('name', 'price')
  search_fields = ('name',)

class OrderItemAdmin(admin.ModelAdmin):
  list_display = ('reservation', 'product', 'quantity', 'price_at_order')
  list_filter = ('reservation__date',)
  search_fields = ('reservation__reservation_id', 'product__name')
  ordering = ('-reservation__date',)
  
class TempOrderAdmin(admin.ModelAdmin):
  list_display = ('user', 'date', 'time_start', 'time_end', 'seat_number')
  list_filter = ('date',)
  search_fields = ('user__username', 'seat_number')
  ordering = ('-date',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(TempOrder, TempOrderAdmin)