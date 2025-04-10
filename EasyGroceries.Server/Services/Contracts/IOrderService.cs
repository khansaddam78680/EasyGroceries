using EasyGroceries.Server.Models;

namespace EasyGroceries.Server.Services.Contracts
{
    public interface IOrderService
    {
        Order CheckoutOrder(Order order);
    }
}
