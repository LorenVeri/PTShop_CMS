using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Country
    {
        public Country()
        {
            Products = new HashSet<Product>();
        }

        public string Code { get; set; } = null!;
        public string? Name { get; set; }
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
