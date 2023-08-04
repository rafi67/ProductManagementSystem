using System;
using System.Collections.Generic;

namespace ProductManagementSystem.Models
{
    public partial class Category
    {
        public Category()
        {
            Brands = new HashSet<Brand>();
            Products = new HashSet<Product>();
        }

        public long CategoryId { get; set; }
        public string? CategoryName { get; set; }

        public virtual ICollection<Brand> Brands { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
