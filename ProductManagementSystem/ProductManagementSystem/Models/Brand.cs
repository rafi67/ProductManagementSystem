using System;
using System.Collections.Generic;

namespace ProductManagementSystem.Models
{
    public partial class Brand
    {
        public Brand()
        {
            Products = new HashSet<Product>();
        }

        public long BrandId { get; set; }
        public long? CategoryId { get; set; }
        public string? BrandName { get; set; }

        public virtual Category? Category { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
