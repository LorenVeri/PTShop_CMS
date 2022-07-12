using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class Message
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public DateTime? Timestamp { get; set; }
        public int? FromUserId { get; set; }
        public int? ToRoomId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User? FromUser { get; set; }
        public virtual Room? ToRoom { get; set; }
    }
}
