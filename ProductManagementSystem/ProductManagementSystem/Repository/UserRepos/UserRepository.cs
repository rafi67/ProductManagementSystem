using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProductManagementSystem.Configuration;
using ProductManagementSystem.ImageCrud;
using ProductManagementSystem.Models;
using ProductManagementSystem.ViewModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProductManagementSystem.Repository.UserRepos
{
    public class UserRepository : IUserRepository
    {

        private readonly ProductMDbContext db;
        private readonly Image img;
        private readonly IWebHostEnvironment env;
        private readonly JwtConfig _jwtConfig;

        public UserRepository(IWebHostEnvironment env, IOptionsMonitor<JwtConfig> _optionsMonitor) 
        {
            this.env = env;
            db = new ProductMDbContext();
            img = new Image(this.env);
            this._jwtConfig = _optionsMonitor.CurrentValue;
        }

        public string CreateJwt(User user)
        {
            string UserRoll = null;
            if ((bool)user.IsAdmin) UserRoll = "Admin";
            else if ((bool)user.IsDistributor) UserRoll = "Distributor";
            else UserRoll = "Aread Head";
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secrete);
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Iss, "http://localhost:4200"),
                new Claim(JwtRegisteredClaimNames.Aud, "https://localhost:7071/api/"),
                new Claim("Id", user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("UserType", UserRoll),
                new Claim("FullName", user.FullName),
                new Claim("UserPhoto", user.UserPhoto),
                new Claim("Email", user.UserEmail),
                new Claim("UserName", user.UserName),
                new Claim("Password", user.Password)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        public object Login(VmUser user)
        {
            var u = db.Users.Where(x => x.UserName == user.UserName).FirstOrDefault();
            if (u != null && u.Password == user.Password)
            {
                var token = CreateJwt(u);
                return new
                {
                    Token = token,
                    Message = "Successfully Login"
                };
            }
            return new
            {
                Token = "",
                Message = "Failed to Login"
            };
        }

        public List<User> GetAllUser()
        {
            return db.Users.ToList();
        }

        public User AddUser(User user)
        {
            db.Entry(user).State = EntityState.Added;
            db.SaveChanges();
            user = db.Users.Where(x => x.FullName == user.FullName).FirstOrDefault();
            return user;
        }

        public void EditUser(User user)
        {
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void DeleteUser(long id)
        {
            var user = db.Users.Find(id);
            img.DeleteImage(user.UserPhoto);
            db.Remove(user);
            db.SaveChanges();
        }

        public void UploadUserImg(long id, IFormFile image)
        {
            var u = db.Users.Find(id);
            u.UserPhoto = img.UploadImage(image);
            db.Entry(u).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void UpdateUserImage(long id, IFormFile image)
        {
            var u = db.Users.Find(id);
            img.DeleteImage(u.UserPhoto);
            u.UserPhoto = img.UploadImage(image);
            db.Entry(u).State = EntityState.Modified;
            db.SaveChanges();
        }

    }
}
