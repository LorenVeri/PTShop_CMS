using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class TransactionProcessing
    {
        public int Id { get; set; }
        public int? AdminId { get; set; }
        public int? TransactionId { get; set; }

        public virtual Admin? Admin { get; set; }
        public virtual Transaction? Transaction { get; set; }
    }
}
