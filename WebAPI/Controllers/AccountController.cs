using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;

        public AccountController(IUnitOfWork _uow)
        {
            this.uow = _uow;
        }

        // api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq) {
            var user = await this.uow.userRepository.Authenticate(loginReq.UserName, loginReq.Password);
            if (user == null) {
                return Unauthorized();
            }

            var loginRes = new LoginResDto {
                UserName = user.Username,
                Token = "token to be generated"
            }
            return Ok(user);
        }
    }
}
