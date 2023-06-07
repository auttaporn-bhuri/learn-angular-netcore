using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string _userName, string _passwordText) {
            var user = await this.dc.Users!.FirstOrDefaultAsync(x => x.Username == _userName);

            if (user == null || user.PasswordKey == null)
                return null;

            if (!MatchPasswordHash(_passwordText, user.Password, user.PasswordKey))
                return null;

            return user;
        }

        private bool MatchPasswordHash(string _passwordText, byte[]? _password, byte[]? _passwordKey)
        {
            using (var hmac = new HMACSHA512(_passwordKey)) {
               var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(_passwordText));
               for (int i=0; i< passwordHash.Length; i++) {
                    if (passwordHash[i] != _password[i])
                        return false;
               }

               return true;
                
            }
        }

        public void Register(string _userName, string _password)
        {
            byte[] passwordHash, passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(_password));
            }

            User user = new User
            {
                Username = _userName,
                Password = passwordHash,
                PasswordKey = passwordKey
            };

            this.dc.Add(user);
        }

        public async Task<bool> UserAlreadyExists(string _userName)
        {
            return await this.dc.Users!.AnyAsync(x => x.Username == _userName);
        }
    }
}
