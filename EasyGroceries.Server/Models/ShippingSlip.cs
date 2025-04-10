namespace EasyGroceries.Server.Models
{
    public class ShippingSlip
    {
        public int CustomerId { get; set; }
        public int OrderNumber { get; set; }
        public List<CartItem> CartItems { get; set; } = new();
        public decimal TotalAmount { get; set; }
    }
}
