using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Contact
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public TimeSpan? Opentime { get; set; }
        public TimeSpan? Closetime { get; set; }
    }
}
