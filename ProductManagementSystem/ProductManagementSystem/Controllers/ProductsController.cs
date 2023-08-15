using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagementSystem.Models;
using ProductManagementSystem.Repository.ProductRepos;
using ProductManagementSystem.ViewModel;

namespace ProductManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductRepository repos;

        public ProductsController(IWebHostEnvironment env)
        {
            repos = new ProductRepository(env);
        }

        #region Brand

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<Brand>> GetAllBrand()
        {
            return repos.GetAllBrand();
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> AddBrand(Brand b)
        {
            repos.AddBrand(b);
            return Ok(200);
        }

        #endregion

        #region Category

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> AddCategory([FromBody] Category c)
        {
            repos.AddCategory(c);
            return Ok(200);
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<Category>> GetAllCategory()
        {
            return repos.GetAllCategory();
        }

        #endregion

        #region Image

        [HttpPost("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> UploadProductImg(long id, IFormFile image)
        {

            repos.UploadProductImg(id, image);

            return Ok(200);

        }

        [HttpPut("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> UpdateProductImage(long id, IFormFile image)
        {

            repos.UpdateProductImage(id, image);

            return Ok(200);

        }
        #endregion

        #region Product

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<VmProduct>> GetAllProduct()
        {

            return repos.GetAllProduct();
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<Product> AddProduct([FromBody] Product product)
        {
            return repos.AddProduct(product);
        }

        [HttpPut("[action]")]
        [Authorize]
        public async Task<IActionResult> UpdateProduct([FromBody] Product product)
        {
            repos.UpdateProduct(product);
            return Ok(200);
        }

        [HttpDelete("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct([FromRoute] long id)
        {
            repos.DeleteProduct(id);
            return Ok(200);
        }

        #endregion

    }

}
