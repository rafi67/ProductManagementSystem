using Microsoft.AspNetCore.Mvc;

namespace ProductManagementSystem.ImageCrud
{
    public class Image
    {
        
        private readonly IWebHostEnvironment env;
        
        public Image(IWebHostEnvironment env)
        {
            this.env = env;
        }

        public string UploadImage(IFormFile image)
        {
            string filename = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
            var filePath = Path.Combine(env.WebRootPath, "Pictures", filename);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                image.CopyTo(stream);
                stream.Close();
            }
            return filename;
        }

        public void DeleteImage(string image)
        {
            string imagePath = Path.Combine(env.WebRootPath, "Pictures", image);
            if (File.Exists(imagePath)) File.Delete(imagePath);
        }

    }
}
