using GClaV2.Data;
using GClaV2.Interfaces;
using GClaV2.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GClaV2.Services
{
    public class AdsService : IAdsService
    {
        private readonly GclaDBContext _context;

        public AdsService(GclaDBContext dbcontext)
        {
            this._context = dbcontext;
        }

        public Ad GetAd(long id)
        {
            if (!_context.Ads.Any(ad => ad.ID == id))
            {
                return null;
            }
            return _context.Ads.FirstOrDefault(ad => ad.ID == id);
        }

        public IEnumerable<Ad> GetAllAds()
        {
            return _context.Ads;
        }

        public IEnumerable<Object> GetAdsByUser(long userId)
        {
            IEnumerable<Ad> tempAds = _context.Ads.Where(m => m.OwnerId == userId);
            return from ad in tempAds
                   join gclauser in _context.GClaUsers on ad.OwnerId equals gclauser.ID
                   select new
                   {
                       id = ad.ID,
                       title = ad.Title,
                       ownerId = ad.OwnerId,
                       username = gclauser.Username,
                       price = ad.Price,
                       consoleId = ad.ConsoleId,
                       sectionId = ad.SectionId,
                       imageUrl = ad.ImageUrl,
                       description = ad.Description,
                       expired = ad.Expired,
                       datePosted = ad.DatePosted,
                       ownerName = gclauser.Name,
                       city = gclauser.City,
                       telephone = gclauser.ShowPhone ? gclauser.Telephone : "",
                       email = gclauser.ShowEmail ? gclauser.Email : "",
                       preferedContactMethod = gclauser.PreferedContactMethod
                   };
        }

        public IEnumerable<Object> GetAdsByUsername(string username)
        {
            long userId = _context.GClaUsers.Where(u => u.Username == username).SingleOrDefault().ID;
            return this.GetAdsByUser(userId);
        }

        public IEnumerable<Object> GetActiveAdsByUser(long userId)
        {
            IEnumerable<Ad> tempAds = _context.Ads.Where(m => m.OwnerId == userId && m.Expired == false);
            return from ad in tempAds
                   join gclauser in _context.GClaUsers on ad.OwnerId equals gclauser.ID
                   select new
                   {
                       id = ad.ID,
                       title = ad.Title,
                       ownerId = ad.OwnerId,
                       username = gclauser.Username,
                       price = ad.Price,
                       consoleId = ad.ConsoleId,
                       sectionId = ad.SectionId,
                       imageUrl = ad.ImageUrl,
                       description = ad.Description,
                       expired = ad.Expired,
                       datePosted = ad.DatePosted,
                       ownerName = gclauser.Name,
                       city = gclauser.City,
                       telephone = gclauser.ShowPhone ? gclauser.Telephone : "",
                       email = gclauser.ShowEmail ? gclauser.Email : "",
                       preferedContactMethod = gclauser.PreferedContactMethod
                   };
        }

        public IEnumerable<Object> GetActiveAdsByUsername(string username)
        {
            long userId = _context.GClaUsers.Where(u => u.Username == username).SingleOrDefault().ID;

            IEnumerable<Ad> tempAds = _context.Ads.Where(m => m.OwnerId == userId && m.Expired == false);
            return from ad in tempAds
                   join gclauser in _context.GClaUsers on ad.OwnerId equals gclauser.ID
                   select new
                   {
                       id = ad.ID,
                       title = ad.Title,
                       ownerId = ad.OwnerId,
                       username = gclauser.Username,
                       price = ad.Price,
                       consoleId = ad.ConsoleId,
                       sectionId = ad.SectionId,
                       imageUrl = ad.ImageUrl,
                       description = ad.Description,
                       expired = ad.Expired,
                       datePosted = ad.DatePosted,
                       ownerName = gclauser.Name,
                       city = gclauser.City,
                       telephone = gclauser.ShowPhone ? gclauser.Telephone : "",
                       email = gclauser.ShowEmail ? gclauser.Email : "",
                       preferedContactMethod = gclauser.PreferedContactMethod
                   };
        }

        public IEnumerable<Object> GetActiveAdsWithFilters(long consoleid, long sectionid)
        {
            IEnumerable<Ad> tempAds;
            if (sectionid != 0)
            {
                tempAds = _context.Ads.Where(
                    m => m.ConsoleId == consoleid &&
                    m.SectionId == sectionid &&
                    m.Expired == false);
            }
            else if (consoleid == 0)
            {
                tempAds = _context.Ads.Where(ad => ad.Expired == false);
            }
            else
            {
                tempAds = _context.Ads.Where(
                    ad => ad.ConsoleId == consoleid &&
                    ad.Expired == false);
            }

            if (tempAds == null)
            {
                return null;
            }

            return from ad in tempAds
                   join gclauser in _context.GClaUsers on ad.OwnerId equals gclauser.ID
                   select new
                   {
                       id = ad.ID,
                       title = ad.Title,
                       ownerId = ad.OwnerId,
                       username = gclauser.Username,
                       price = ad.Price,
                       consoleId = ad.ConsoleId,
                       sectionId = ad.SectionId,
                       imageUrl = ad.ImageUrl,
                       description = ad.Description,
                       expired = ad.Expired,
                       datePosted = ad.DatePosted,
                       ownerName = gclauser.Name,
                       city = gclauser.City,
                       telephone = gclauser.ShowPhone ? gclauser.Telephone : "",
                       email = gclauser.ShowEmail ? gclauser.Email : "",
                       preferedContactMethod = gclauser.PreferedContactMethod
                   };
        }

        public bool AddAd(Ad ad)
        {
            _context.Ads.Add(ad);

            _context.SaveChanges();

            return true;
        }

        public bool UpdateAdd(Ad ad)
        {
            _context.Entry(ad).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw ex;
            }
            return true;
        }

        public IDictionary<long, bool> DeleteAds(long[] adIds)
        {
            IDictionary<long, bool> adsDeleted = new Dictionary<long, bool>();
            foreach (var id in adIds)
            {
                var ad = _context.Ads.SingleOrDefault(m => m.ID == id);
                if (ad == null)
                {
                    adsDeleted.Add(id, false);
                }
                else
                {
                    ad.Expired = true;
                    bool updated = this.UpdateAdd(ad);
                }
            }
            return adsDeleted;
        }
    }
}
