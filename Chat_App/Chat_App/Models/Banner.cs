using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Banner
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Title { get; set; }
        public string? Uri { get; set; }
    }
}
