using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Manufacturer
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Country { get; set; }
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
    }
}
