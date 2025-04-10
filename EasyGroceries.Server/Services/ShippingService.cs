using EasyGroceries.Server.Models;
using EasyGroceries.Server.Services.Contracts;

namespace EasyGroceries.Server.Services
{
    public class ShippingService : IShippingService
    {
        public ShippingSlip GenerateSlip(Order order)
        {
            ShippingSlip shippingSlip = new()
            {
                CustomerId = order.CustomerId,
                OrderNumber = order.OrderId,
                CartItems = order.CartItems.Where(x => x.IsPhysical).ToList(),
                TotalAmount = order.TotalAmount
            };
            return shippingSlip;
        }
    }
}
