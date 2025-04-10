using EasyGroceries.Server.Models;

namespace EasyGroceries.Server.Services.Contracts
{
    public interface IShippingService
    {
        ShippingSlip GenerateSlip(Order order);
    }
}
