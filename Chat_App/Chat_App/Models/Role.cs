using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Role
    {
        public Role()
        {
            Permissions = new HashSet<Permission>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<Permission> Permissions { get; set; }
    }
}
