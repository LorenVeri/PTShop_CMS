using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Room
    {
        public Room()
        {
            Messages = new HashSet<Message>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<Message> Messages { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
