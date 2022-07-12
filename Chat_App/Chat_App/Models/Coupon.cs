using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Coupon
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public decimal? DiscountPercent { get; set; }
        public int? DiscountMoney { get; set; }
        public DateTime? Expire { get; set; }
    }
}
