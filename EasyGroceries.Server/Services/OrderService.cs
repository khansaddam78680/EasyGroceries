using EasyGroceries.Server.Models;
using EasyGroceries.Server.Services.Contracts;

namespace EasyGroceries.Server.Service
{
    public class OrderService: IOrderService
    {
        private const decimal LOYALTY_MEMBERSHIP_PRICE = 5m;
        private const decimal LOYALITY_DISCOUNT = 0.2m;

        public Order CheckoutOrder(Order order)
        {
            if (order.HasLoyaltyMembership)
            {
                foreach(var cart in order.CartItems)
                {
                    cart.TotalPrice = cart.UnitPrice * cart.Quantity * (1 - LOYALITY_DISCOUNT);
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
                    cart.TotalPrice = cart.UnitPrice * cart.Quantity;
                }
            }

            order.TotalAmount = order.CartItems.Sum(x => x.TotalPrice);
            return order;
        }
    }
}
