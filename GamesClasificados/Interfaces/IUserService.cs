using GClaV2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GClaV2.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUser(string email);
        Task<User> GetUser(long id);
        void AddUser(User user);
        void DeleteUser(User user, IAdsService adsService);
        Task<User> SaveUser(User user);
        bool UserExists(string email);
        bool UserExists(long id);
    }
}
