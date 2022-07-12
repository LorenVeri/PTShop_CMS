using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class ProductPrice
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public int? Price { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual Product? Product { get; set; }
    }
}
