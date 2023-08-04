using System;
using System.Collections.Generic;

namespace ProductManagementSystem.Models
{
    public partial class User
    {
        public long UserId { get; set; }
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? UserPhoto { get; set; }
        public string? UserEmail { get; set; }
        public bool? IsAdmin { get; set; }
        public bool? IsDistributor { get; set; }
        public bool? IsAreaHead { get; set; }
    }
}
