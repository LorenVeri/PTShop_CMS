using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class AdminGroup
    {
        public AdminGroup()
        {
            Admins = new HashSet<Admin>();
            Permissions = new HashSet<Permission>();
        }

        public int Id { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? Color { get; set; }

        public virtual ICollection<Admin> Admins { get; set; }
        public virtual ICollection<Permission> Permissions { get; set; }
    }
}
