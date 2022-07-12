using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Admin
    {
        public int Id { get; set; }
        public string? Avatar { get; set; }
        public string? FirstName { get; set; }
        public string? Password { get; set; }
        public int? Phone { get; set; }
        public string? Email { get; set; }
        public int? AdminGroupId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? LastName { get; set; }
        public DateTime? LastLogin { get; set; }

        public virtual AdminGroup? AdminGroup { get; set; }
    }
}
