using EasyGroceries.Server.Models;
using EasyGroceries.Server.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyGroceries.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private static int _orderNo = 150;
        private readonly IOrderService _orderService;
        private readonly IShippingService _shippingService;

        public OrderController(IOrderService orderService, IShippingService shippingService)
        {
            _orderService = orderService;
            _shippingService = shippingService;
        }

        private static readonly List<Product> _products = new()
        {
            new Product { Id = 1, Name = "Airpods", Description = "Noise-canceling headphones with Bluetooth 5.3.", Price = 150.99m, IsPhysical= true },
            new Product { Id = 2, Name = "Portable SSD 1TB", Description = "igh-speed USB-C portable solid state drive.", Price = 89.50m, IsPhysical = true },
            new Product { Id = 3, Name = "Photoshop Software License", Description = "1 Year license for photoshop software.", Price = 49.75m, IsPhysical=false },
            new Product { Id = 4, Name = "LED Desk Lamp", Description = "Adjustable LED desk lamp with USB charging.", Price = 30.49m, IsPhysical = true },
            new Product { Id = 5, Name = "Projecter", Description = "Compact HD projector for home cinema.", Price = 119.99m, IsPhysical = true },
            new Product { Id = 6, Name = "Portable Bluetooth Speaker", Description = "Water-resistant speaker with 12-hour battery life.", Price = 59.95m, IsPhysical = true },
            new Product { Id = 7, Name = "Coding Bootcamp Pass", Description = "Virtual pass to a 2-week intensive coding bootcamp.", Price = 75.50m, IsPhysical = false },
        };

        [HttpGet("getProducts")]
        public IActionResult GetProducts()
        {
            return Ok(_products);
        }

        [HttpPost("checkout")]
        public IActionResult Checkout([FromBody]Order order)
        {
            order.OrderId = _orderNo++;
            order.CustomerId = Random.Shared.Next(1500, 150000);
            var placedOrder = _orderService.CheckoutOrder(order , _products);
            var shippingData = _shippingService.GenerateSlip(placedOrder);
            return Ok(shippingData);
        }

    }
}
