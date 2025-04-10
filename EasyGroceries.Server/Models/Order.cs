namespace EasyGroceries.Server.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public List<CartItem> CartItems { get; set; } = new();
        public decimal TotalAmount { get; set; }
        public bool HasLoyaltyMembership { get; set; }
        public ShippingInfo ShippingDetails { get; set; }
    }
}
