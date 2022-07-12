using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class User
    {
        public User()
        {
            Accounts = new HashSet<Account>();
            Favorites = new HashSet<Favorite>();
            Transactions = new HashSet<Transaction>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? Password { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
