using System;
using System.Collections.Generic;

namespace ProductManagementSystem.Models
{
    public partial class Product
    {
        public long ProductId { get; set; }
        public long? CategoryId { get; set; }
        public long? BrandId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductModel { get; set; }
        public decimal? ProductPrice { get; set; }
        public string? ProductPhoto { get; set; }

        public virtual Brand? Brand { get; set; }
        public virtual Category? Category { get; set; }
    }
}
