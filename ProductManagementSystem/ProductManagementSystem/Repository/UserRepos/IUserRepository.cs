using ProductManagementSystem.Models;
using ProductManagementSystem.ViewModel;

namespace ProductManagementSystem.Repository.UserRepos
{
    public interface IUserRepository
    {
        string CreateJwt(User user);
        object Login(VmUser user);
        List<User> GetAllUser();
        User AddUser(User user);
        void EditUser(User user);
        void DeleteUser(long id);
        void UploadUserImg(long id, IFormFile image);
        void UpdateUserImage(long id, IFormFile image);
    }
}
