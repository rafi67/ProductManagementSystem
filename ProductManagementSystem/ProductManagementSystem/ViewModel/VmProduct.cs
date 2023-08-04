namespace ProductManagementSystem.ViewModel;

public class VmProduct
{
    public long ProductId { get; set; }
    public string ProductName { get; set; }
    public string ProductPhoto { get; set; }
    public string ProductModel { get; set; }
    public decimal ProductPrice { get; set; }
    public string CategoryName { get; set; }
    public long CategoryId { get; set; }
    public string ProductBrand { get; set; }
    public long BrandId { get; set; }

}
