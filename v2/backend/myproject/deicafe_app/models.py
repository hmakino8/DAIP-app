from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import string, random


# デフォルトのUserモデルを継承してroleを追加
# IDにはメールアドレスを使用
class CustomUser(AbstractUser):
  email = models.EmailField(unique=True)
  role = models.CharField(max_length=20, default='user')
  password_confirm = models.CharField(max_length=20, default='')
  
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  @property
  def cart_total(self) -> int:
    return sum(item.total for item in self.cartitem_set.all())
  
  @property
  def cart_discount_amount(self) -> int:
    return sum(item.discount_amount for item in self.cartitem_set.all())

  @property
  def cart_total_after_discount(self) -> int:
    return int(self.cart_total - self.cart_discount_amount )
  
  @property
  def cart_tax_amount(self) -> int:
    return int(self.cart_total_after_discount * 0.1)

  @property
  def cart_total_with_tax(self) -> int:
    return int(self.cart_total_after_discount + self.cart_tax_amount)


class Reservation(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  reservation_number = models.CharField(max_length=20, unique=True)
  date = models.DateField()
  time_start = models.TimeField()
  time_end = models.TimeField()
  seat_number = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
  total = models.IntegerField(default=0)
  item_count = models.IntegerField(default=0)
  discount_amount = models.IntegerField(default=0)
  total_after_discount = models.IntegerField(default=0)
  tax_amount = models.IntegerField(default=0)
  total_with_tax = models.IntegerField(default=0)
  status = models.CharField(
    max_length=20,
    choices=[
      ('active', '予約中'),
      ('canceled', '予約取り消し'),
      ('completed', '利用済み'),
      ('expired', '予約期限切れ')
    ],
    default='active'
  )
  
  def save(self, *args, **kwargs):
    if not self.reservation_number:
      self.reservation_number = self._generate_reservation_number()
    super().save(*args, **kwargs)
    
  def _generate_reservation_number(self) -> str:
    date_time = self.date.strftime('%m%d') + self.time_start.strftime('%H%M')
    seat_part = str(self.seat_number).zfill(2) #座席番号を２桁でゼロ埋め
    chars = string.ascii_letters + string.digits
    random_part = ''.join(random.choices(chars, k=4)) #ランダムな英数字4文字
    
    reservation_number = f"{date_time}-{seat_part}-{random_part}"
    
    # 重複チェック。重複する場合は重複しなくなるまで再度乱数を生成し、reservation_numberを更新
    while Reservation.objects.filter(reservation_number=reservation_number).exists():
      random_part = ''.join(random.choices(chars, k=4))
      reservation_number = f"{date_time}-{seat_part}-{random_part}"
      
    return reservation_number

  # self.orderitem_set.all()でOrderItemのインスタンスを取得
  # DjangoのORMのリレーションの仕組み
  # OrderItemモデルで外部キーを定義すると、Djangoは自動的に逆方向のリレーションを作成する。
  # そのため、ReservationモデルのインスタンスからOrderItemモデルのインスタンスを取得できる。
  # SELECT * FROM orderitem WHERE reservation_id = <self.id>
  
  # @property
  # def total_price(self) -> int:
  #   order_items = self.orderitem_set.all()
  #   return sum(item.total for item in order_items)

  class Meta:
    ordering = ['-created_at']
    
class Product(models.Model):
  name = models.CharField(max_length=100)
  price = models.IntegerField()
  
  def __str__(self):
    return self.name

class OrderItem(models.Model):
  reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
  product = models.ForeignKey(Product, on_delete=models.PROTECT)
  quantity = models.IntegerField(default=0)
  total = models.IntegerField(default=0)

class CartItem(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
  product = models.ForeignKey(Product, on_delete=models.PROTECT)
  quantity = models.IntegerField(default=0)
  created_at = models.DateTimeField(auto_now_add=True)
  discount_rate = models.FloatField(default=0.1)

  @property
  def total(self) -> int:
    return int(self.product.price * self.quantity)

  @property
  def discount_amount(self) -> int:
    return int(self.total * self.discount_rate)
  
  @property
  def total_after_discount(self) -> int:
    return int(self.total - self.discount_amount)

  @property
  def tax_amount(self) -> int:
    return int(self.total_after_discount * 0.1)

  @property
  def total_with_tax(self) -> int:
    return int(self.total_after_discount + self.tax_amount)

  class Meta:
    ordering = ['-created_at']

class ReservationDraft(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
  date = models.DateField(null=True, blank=True)
  time_start = models.TimeField(null=True, blank=True)
  time_end = models.TimeField(null=True, blank=True)
  seat_number = models.CharField(max_length=20, null=True, blank=True)
  created_at = models.DateTimeField(default=timezone.now)

  @property
  def cart_items(self):
    return CartItem.objects.filter(user=self.user)

  @property
  def item_count(self) -> int:
    return sum(item.quantity for item in self.cart_items)
  
  @property
  def cart_total(self) -> int:
    return sum(item.total for item in self.cart_items)
  
  @property
  def cart_discount_amount(self) -> int:
    return sum(item.discount_amount for item in self.cart_items)

  @property
  def cart_total_after_discount(self) -> int:
    return int(self.cart_total - self.cart_discount_amount )
  
  @property
  def cart_tax_amount(self) -> int:
    return int(self.cart_total_after_discount * 0.1)

  @property
  def cart_total_with_tax(self) -> int:
    return int(self.cart_total_after_discount + self.cart_tax_amount)
  
  class Meta:
    ordering = ['-created_at']
