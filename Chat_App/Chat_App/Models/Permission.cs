using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Permission
    {
        public int Id { get; set; }
        public int AdminGroupId { get; set; }
        public int RoleId { get; set; }

        public virtual AdminGroup AdminGroup { get; set; } = null!;
        public virtual Role Role { get; set; } = null!;
    }
}
