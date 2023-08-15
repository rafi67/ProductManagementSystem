using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ProductManagementSystem.Configuration;
using ProductManagementSystem.Models;
using ProductManagementSystem.Repository.UserRepos;
using ProductManagementSystem.ViewModel;

namespace ProductManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserRepository userRepository;
        public UserController(IWebHostEnvironment env, IOptionsMonitor<JwtConfig> _optionsMonitor)
        {
            userRepository = new UserRepository(env, _optionsMonitor);
        }

        #region UserAuthentication

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] VmUser user)
        {
           return Ok(userRepository.Login(user));
        }

        #endregion

        #region User

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<User>> GetAllUser()
        {
            return userRepository.GetAllUser();
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<User> AddUser([FromBody] User user)
        {
            return userRepository.AddUser(user);
        }

        [HttpPut("[action]")]
        [Authorize]
        public async Task<IActionResult> EditUser([FromBody] User user)
        {
            userRepository.EditUser(user);
            return Ok(200);
        }

        [HttpDelete("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser([FromRoute] long id)
        {
            userRepository.DeleteUser(id);
            return Ok(200);
        }

        #endregion

        #region Image
        [HttpPost("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> UploadUserImg(long id, IFormFile image)
        {

            userRepository.UploadUserImg(id, image);

            return Ok(200);

        }

        [HttpPut("[action]/{id:long}")]
        [Authorize]
        public async Task<IActionResult> UpdateUserImage(long id, IFormFile image)
        {

            userRepository.UpdateUserImage(id, image);

            return Ok(200);

        }

        #endregion

    }
    
}
