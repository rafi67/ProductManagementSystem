using ProductManagementSystem.Models;
using ProductManagementSystem.ViewModel;

namespace ProductManagementSystem.Repository.ProductRepos
{
    public interface IProductRepository
    {
        List<VmProduct> GetAllProduct();
        Product AddProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(long id);
        void UploadProductImg(long id, IFormFile image);
        void UpdateProductImage(long id, IFormFile image);
        List<Category> GetAllCategory();
        void AddCategory(Category category);
        List<Brand> GetAllBrand();
        void AddBrand(Brand brand);
    }
}
