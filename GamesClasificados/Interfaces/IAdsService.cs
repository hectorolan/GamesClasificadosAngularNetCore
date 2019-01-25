using GClaV2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GClaV2.Interfaces
{
    public interface IAdsService
    {
        Ad GetAd(long id);
        IEnumerable<Ad> GetAllAds();
        IEnumerable<Ad> GetAdsByUser(long userId);
        IEnumerable<Object> GetActiveAdsWithFilters(long consoleid, long sectionid);
        bool AddAd(Ad ad);
        bool UpdateAdd(Ad ad);
        IDictionary<long, bool> DeleteAds(long[] adIds);
    }
}
