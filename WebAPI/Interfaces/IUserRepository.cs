using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string _userName, string _password);

        void Register (string _userName, string _password);

        Task<bool> UserAlreadyExists(string _userName);
    }
}
