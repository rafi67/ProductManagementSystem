using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.Models;
using ProductManagementSystem.ViewModel;

namespace ProductManagementSystem.Repository.ProductRepos
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductMDbContext db;
        private readonly IWebHostEnvironment env;
        private ImageCrud.Image img;
        public ProductRepository(IWebHostEnvironment env)
        {
            this.env = env;
            db = new ProductMDbContext();
            img = new ImageCrud.Image(env);
        }

        public List<VmProduct> GetAllProduct()
        {
            var product = db.Products.ToList();
            var vmProductList = new List<VmProduct>();
            foreach (var list in product)
            {

                var p = new VmProduct();

                p.ProductBrand = db.Brands
                    .Where(x => x.BrandId == list.BrandId)
                    .Select(x => x.BrandName).FirstOrDefault();

                p.BrandId = (long)list.BrandId;

                p.CategoryName = db.Categories
                    .Where(x => x.CategoryId == list.CategoryId)
                    .Select(x => x.CategoryName).FirstOrDefault();

                p.CategoryId = (long)list.CategoryId;

                p.ProductId = list.ProductId;
                p.ProductName = list.ProductName;
                p.ProductModel = list.ProductModel;
                p.ProductPrice = (decimal)list.ProductPrice;
                p.ProductPhoto = list.ProductPhoto;

                vmProductList.Add(p);

            }

            return vmProductList;
        }

        public Product AddProduct(Product product)
        {
            db.Entry(product).State = EntityState.Added;
            db.SaveChanges();

            product.ProductId = db.Products
                .Where(x => x.ProductModel == product.ProductModel)
                .Select(x => x.ProductId).FirstOrDefault();
            return product;
        }

        public void UpdateProduct(Product product)
        {
            db.Entry(product).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void DeleteProduct(long id)
        {
            var p = db.Products.Find(id);
            img.DeleteImage(p.ProductPhoto);
            db.Remove(p);
            db.SaveChanges();
        }

        public void UploadProductImg(long id, IFormFile image)
        {
            var p = db.Products.Find(id);
            p.ProductPhoto = img.UploadImage(image);
            db.Entry(p).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void UpdateProductImage(long id, IFormFile image)
        {
            var p = db.Products.Find(id);
            img.DeleteImage(p.ProductPhoto);
            p.ProductPhoto = img.UploadImage(image);
            db.Entry(p).State = EntityState.Modified;
            db.SaveChanges();
        }

        public List<Category> GetAllCategory()
        {
            return db.Categories.ToList();
        }

        public void AddCategory(Category category)
        {
            db.Entry(category).State = EntityState.Added;
            db.SaveChanges();
        }

        public List<Brand> GetAllBrand()
        {
            return db.Brands.ToList();
        }

        public void AddBrand(Brand brand)
        {
            db.Entry(brand).State = EntityState.Added;
            db.SaveChanges();
        }
    }
}
