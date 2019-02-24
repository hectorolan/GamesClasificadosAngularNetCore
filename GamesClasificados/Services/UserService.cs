using GClaV2.Data;
using GClaV2.Interfaces;
using GClaV2.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GClaV2.Services
{
    public class UserService : IUserService
    {
        private readonly GclaDBContext _dbcontext;

        public UserService(GclaDBContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<User> GetUser(string email)
        {
            User user = null;
            try
            {
                user = await _dbcontext.GClaUsers.SingleOrDefaultAsync(u => u.Email == email);
            } catch (Exception ex){
                Console.Out.WriteLine(ex.Message);
            }
                return user;
        }

        public async Task<User> GetUser(long id)
        {
            User user = await _dbcontext.GClaUsers.SingleOrDefaultAsync(u => u.ID == id);
            return user;
        }

        public void AddUser(User user)
        {
            _dbcontext.GClaUsers.Add(user);

            _dbcontext.SaveChanges();
        }

        public void DeleteUser(User user, IAdsService adsService)
        {
            // Remove first all the Ads and Data
            this._dbcontext.Ads.RemoveRange(this._dbcontext.Ads.Where(ad => ad.OwnerId == user.ID));

            // Then remove the user
            _dbcontext.GClaUsers.Remove(user);

            _dbcontext.SaveChanges();
        }

        public async Task<User> SaveUser(User user)
        {
            _dbcontext.Entry(user).State = EntityState.Modified;

            try
            {
                await _dbcontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw ex;
            }

            return user;
        }

        public async Task<bool> UsernameExists(string username)
        {
            bool result = await _dbcontext.GClaUsers.AnyAsync(e => e.Username == username);
            return result;
        }

        public bool UserExists(string email)
        {
            return _dbcontext.GClaUsers.Any(e => e.Email == email);
        }

        public bool UserExists(long id)
        {
            return _dbcontext.GClaUsers.Any(e => e.ID == id);
        }
    }
}
