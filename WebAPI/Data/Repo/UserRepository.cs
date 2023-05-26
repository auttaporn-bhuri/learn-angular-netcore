﻿using Microsoft.EntityFrameworkCore;
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
        public async Task<User> Authenticate(string _userName, string _password) {
            return await dc.Users.FirstOrDefaultAsync(x => x.Username == _userName && x.Password == _password);
            
        }
    }
}
