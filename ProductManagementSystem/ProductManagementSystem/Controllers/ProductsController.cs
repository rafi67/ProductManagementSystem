using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.ImageCrud;
using ProductManagementSystem.Models;
using ProductManagementSystem.ViewModel;
using System.Collections;
using System.Collections.Generic;

namespace ProductManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductMDbContext db;
        private readonly Image img;

        public ProductsController(IWebHostEnvironment env)
        {
            db = new ProductMDbContext();
            img = new Image(env);
        }

        #region Brand

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<Brand>> GetAllBrand()
        {
            return db.Brands.ToList();
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> AddBrand(Brand b)
        {
            db.Entry(b).State = EntityState.Added;
            db.SaveChanges();
            return Ok(200);
        }

        [HttpPut("[action]")]
        [Authorize]
        public async Task<IActionResult> UpdateBrand([FromBody] Brand b)
        {
            db.Entry(b).State = EntityState.Modified;
            db.SaveChanges();
            return Ok(200);
        }

        [HttpGet("[action]/{id:long}")]
        [Authorize]
        public async Task<Brand> GetBrand(long id)
        {
            return db.Brands.Find(id);
        }

        [HttpDelete("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> DeleteBrand([FromRoute] long id)
        {
            var b = db.Brands.Find(id);
            db.Remove(b);
            db.SaveChanges();
            return Ok(200);
        }

        #endregion

        #region Category

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> AddCategory([FromBody] Category c)
        {
            db.Entry(c).State = EntityState.Added;
            db.SaveChanges();
            return Ok(200);
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<Category>> GetAllCategory()
        {
            return db.Categories.ToList();
        }

        [HttpGet("[action]/{id:long}")]
        [Authorize]
        public async Task<Category> GetCategory([FromRoute] long id)
        {
            var c = db.Categories.Find(id);
            return c;
        }

        [HttpPut("[action]")]
        [Authorize]
        public async Task<IActionResult> UpdateCategory([FromBody] Category c)
        {
            db.Entry(c).State = EntityState.Modified;
            db.SaveChanges();
            return Ok(200);
        }

        [HttpDelete("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> DeleteCategory([FromRoute] long id)
        {
            var c = db.Categories.Find(id);
            db.Remove(c);
            db.SaveChanges();
            return Ok(200);
        }

        #endregion

        #region Image

        [HttpPost("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> UploadProductImg(long id, IFormFile image)
        {
           
            var p = db.Products.Find(id);
            p.ProductPhoto = img.UploadImage(image);

            db.Entry(p).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(200);

        }

        [HttpPut("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> UpdateProductImage(long id, IFormFile image)
        {
            
            var p = db.Products.Find(id);

            img.DeleteImage(p.ProductPhoto);
            p.ProductPhoto = img.UploadImage(image);

            db.Entry(p).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(200);

        }
        #endregion

        #region Product

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<VmProduct>> GetAllProduct()
        {
            var product = db.Products.ToList();
            var vmProductList = new List<VmProduct>();
            foreach(var list in  product)
            {

                var p = new VmProduct();

                p.ProductBrand = db.Brands
                    .Where(x=>x.BrandId == list.BrandId)
                    .Select(x=>x.BrandName).FirstOrDefault();

                p.BrandId = (long) list.BrandId;

                p.CategoryName = db.Categories
                    .Where(x=>x.CategoryId == list.CategoryId)
                    .Select(x=>x.CategoryName).FirstOrDefault();

                p.CategoryId = (long) list.CategoryId;

                p.ProductId = list.ProductId;
                p.ProductName = list.ProductName;
                p.ProductModel = list.ProductModel;
                p.ProductPrice = (decimal)list.ProductPrice;
                p.ProductPhoto = list.ProductPhoto;

                vmProductList.Add(p);

            }

            return vmProductList;

        }

        [HttpGet("[action]/{id:long}")]
        [Authorize]
        public async Task<VmProduct> GetProductById([FromRoute] long id)
        {

            var product = db.Products.Find(id);
            var p = new VmProduct();

            p.ProductBrand = db.Brands
                .Where(x => x.BrandId == product.BrandId)
                .Select(x => x.BrandName).FirstOrDefault();

            p.CategoryName = db.Categories
                .Where(x => x.CategoryId == product.CategoryId)
                .Select(x => x.CategoryName).FirstOrDefault();

            p.ProductId = product.ProductId;
            p.ProductName = product.ProductName;
            p.ProductModel = product.ProductModel;
            p.ProductPrice = (decimal)product.ProductPrice;
            p.ProductPhoto = product.ProductPhoto;

            return p;

        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<Product> AddProduct([FromBody] Product product)
        {
            
            db.Entry(product).State = EntityState.Added;
            db.SaveChanges();

            product.ProductId = db.Products
                .Where(x=>x.ProductModel == product.ProductModel)
                .Select(x => x.ProductId).FirstOrDefault();

            return product;

        }

        [HttpPut("[action]")]
        [Authorize]
        public async Task<IActionResult> UpdateProduct([FromBody] Product product)
        {
            db.Entry(product).State = EntityState.Modified; 
            db.SaveChanges();
            return Ok(200);
        }

        [HttpDelete("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct([FromRoute] long id)
        {
            var p = db.Products.Find(id);
            img.DeleteImage(p.ProductPhoto);
            db.Remove(p);
            db.SaveChanges();
            return Ok(200);
        }

        #endregion

    }
    
}
