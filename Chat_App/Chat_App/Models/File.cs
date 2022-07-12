using System;
using System.Collections.Generic;

namespace PTShop_CMS.Models
{
    public partial class File
    {
        public int Id { get; set; }
        public string? FileName { get; set; }
        public int? FileSize { get; set; }
        public string? Format { get; set; }
        public string? Path { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
