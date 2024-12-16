from django.db import models
from django.contrib.auth.models import AbstractUser

# デフォルトのUserモデルを継承してroleを追加
# IDにはメールアドレスを使用
class CustomUser(AbstractUser):
  email = models.EmailField(unique=True)
  role = models.CharField(max_length=20, default='user')
  
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']


class Reservation(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  reservation_id = models.CharField(max_length=20, unique=True)
  date = models.DateField()
  start_time = models.TimeField()
  end_time = models.TimeField()
  seat_id = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
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
  
  # self.orderitem_set.all()でOrderItemのインスタンスを取得
  # DjangoのORMのリレーションの仕組み
  # OrderItemモデルで外部キーを定義すると、Djangoは自動的に逆方向のリレーションを作成する。
  # そのため、ReservationモデルのインスタンスからOrderItemモデルのインスタンスを取得できる。
  # SELECT * FROM orderitem WHERE reservation_id = <self.id>

  @property
  def total_price(self) -> int:
    order_items = self.orderitem_set.all()
    return sum(item.total for item in order_items)

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
  price_at_order = models.IntegerField(default=0)
  tax_rate = models.FloatField(default=0.1)
  pre_order_discount = models.FloatField(default=0.1)
  
  def save(self, *args, **kwargs):
    if not self.price_at_order:
      self.price_at_order = self.product.price
    super().save(*args, **kwargs)
    
  @property
  def subtotal_ex_tax(self) -> int:
    return int(self.price_at_order * (1 - self.pre_order_discount))

  @property
  def subtotal_in_tax(self) -> int:
    return int(self.subtotal_ex_tax * (1 + self.tax_rate))
  
  @property
  def total(self) -> int:
    return int(self.subtotal_in_tax * self.quantity)

class TempOrderItem(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  product = models.ForeignKey(Product, on_delete=models.PROTECT)
  quantity = models.IntegerField(default=0)
  created_at = models.DateTimeField(auto_now_add=True)
  pre_order_discount = models.FloatField(default=0.1)

  @property
  def total_price(self) -> int:
    return int(self.product.price * self.quantity)
  
  @property
  def total_discount_price(self) -> int:
    return int(self.total_price * (1 - self.pre_order_discount))

  class Meta:
    ordering = ['-created_at']
