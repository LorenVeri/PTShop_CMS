using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public int? TransactionId { get; set; }
        public int? ProductId { get; set; }
        public int? Count { get; set; }
        public int? AmountOrder { get; set; }
        public string? Data { get; set; }
        public bool? Status { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Transaction? Transaction { get; set; }
    }
}
