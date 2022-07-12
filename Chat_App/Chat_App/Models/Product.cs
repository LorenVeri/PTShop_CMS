using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Product
    {
        public Product()
        {
            Favorites = new HashSet<Favorite>();
            Orders = new HashSet<Order>();
            ProductMedia = new HashSet<ProductMedium>();
            ProductPrices = new HashSet<ProductPrice>();
            Products = new HashSet<Product>();
            Suggests = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? MadeIn { get; set; }
        public int? Price { get; set; }
        public int? ManufacturerId { get; set; }
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public bool? IsDelete { get; set; }
        public bool? Status { get; set; }
        public int? CategoryId { get; set; }
        public bool? Sale { get; set; }
        public int? View { get; set; }
        public string? SubDescription { get; set; }
        public string? Thumbnail { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Country? MadeInNavigation { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ProductMedium> ProductMedia { get; set; }
        public virtual ICollection<ProductPrice> ProductPrices { get; set; }

        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Product> Suggests { get; set; }
    }
}
