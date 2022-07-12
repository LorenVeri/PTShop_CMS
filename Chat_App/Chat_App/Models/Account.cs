using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Account
    {
        public int Id { get; set; }
        public string Password { get; set; } = null!;
        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
