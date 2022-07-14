namespace PTShop_CMS.GraphQL.Transaction
{
    public class TransactionType
    {

        public int Id { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public int UserPhone { get; set; }
        public string? UserAdress { get; set; }
        public bool Passersby { get; set; }
        public int Amount { get; set; }
        public string? Message { get; set; }
        //public string? Payment { get; set; }
        //public string? PaymentInfo { get; set; }
        //public string? Security { get; set; }
        public int State { get; set; }
        public List<Order> listOrder { get; set; }
    }
    public class Order
    {
        public int TransactionId { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }
        public int AmountOrder { get; set; }
        public bool Status { get; set; }
    }
}
