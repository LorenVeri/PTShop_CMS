using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class AdminRole
    {
        public AdminRole()
        {
            AdminGroups = new HashSet<AdminGroup>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<AdminGroup> AdminGroups { get; set; }
    }
}
