using EasyGroceries.Server.Models;
using EasyGroceries.Server.Services.Contracts;

namespace EasyGroceries.Server.Service
{
    public class OrderService: IOrderService
    {
        private const decimal LOYALTY_MEMBERSHIP_PRICE = 5m;
        private const decimal LOYALITY_DISCOUNT = 0.2m;

        public Order CheckoutOrder(Order order, List<Product> products)
        {
            if (order.HasLoyaltyMembership)
            {
                foreach(var cart in order.CartItems)
                {
                    var product = products.FirstOrDefault(x => x.Id == cart.ProductId);
                    cart.TotalPrice = cart.UnitPrice * cart.Quantity * (1 - LOYALITY_DISCOUNT);
                    cart.IsPhysical = product != null ? product.IsPhysical : false;
                }

                order.CartItems.Add(new CartItem
                {
                    ProductId = -1,
                    ProductName = "EasyGroceries loyalty membership",
                    Description = "Loyalty program",
                    Quantity = 1,
                    UnitPrice = LOYALTY_MEMBERSHIP_PRICE,
                    TotalPrice = LOYALTY_MEMBERSHIP_PRICE,
                    IsPhysical = false
                });
            }
            else
            {
                foreach (var cart in order.CartItems)
                {
                    var product = products.FirstOrDefault(x => x.Id == cart.ProductId);
                    cart.TotalPrice = cart.UnitPrice * cart.Quantity;
                    cart.IsPhysical = product != null ? product.IsPhysical : false;
                }
            }

            order.TotalAmount = order.CartItems.Sum(x => x.TotalPrice);
            return order;
        }
    }
}
