using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GClaV2.Data;
using GClaV2.Models;
using GClaV2.Interfaces;

namespace GClaV2.Controllers.API
{
    [Produces("application/json")]
    [Route("api/ads")]
    public class AdsController : Controller
    {
        private readonly IAdsService _adsService;

        public AdsController(IAdsService adsService)
        {
            _adsService = adsService;
        }

        // GET: api/Ads
        [HttpGet]
        public IEnumerable<Ad> GetAds()
        {
            return this._adsService.GetAllAds();
        }

        // GET: api/Ads/User/5
        [HttpGet]
        [Route("~/api/ads/user/{userid}")]
        public async Task<IActionResult> GetUserAds([FromRoute] long userid, [FromQuery(Name = "active")] bool active)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            IEnumerable<Object> ads = await Task.Run(() =>
            {
                IEnumerable<Object> result;
                if (active)
                {
                    result = this._adsService.GetActiveAdsByUser(userid);
                }
                else
                {
                    result = this._adsService.GetAdsByUser(userid);
                }
                return result;
            });

            if (ads == null)
            {
                return NotFound();
            }

            return Ok(ads);
        }

        // GET: api/Ads/User/5
        [HttpGet]
        [Route("~/api/ads/username/{username}")]
        public async Task<IActionResult> GetUsernameAds([FromRoute] string username, [FromQuery(Name = "active")] bool active)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            IEnumerable<Object> ads = await Task.Run(() =>
            {
                IEnumerable<Object> result;
                if (active)
                {
                    result = this._adsService.GetActiveAdsByUsername(username);
                }
                else
                {
                    result = this._adsService.GetAdsByUsername(username);
                }
                return result;
            });

            if (ads == null)
            {
                return NotFound();
            }

            return Ok(ads);
        }

        // GET: api/Ads/Console/5
        [HttpGet]
        [Route("~/api/ads/console/{consoleid}")]
        public async Task<IActionResult> GetConsoleIdAds([FromRoute] long consoleid, [FromQuery] long sectionid)
        {
            //TODO Test from query
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            IEnumerable<Object> ads = await Task.Run(() =>
            {
                return this._adsService.GetActiveAdsWithFilters(consoleid, sectionid);
            });

            if (ads == null)
            {
                return NotFound();
            }

            return Ok(ads);
        }

        // PUT: api/Ads/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAd([FromRoute] long id, [FromBody] Ad ad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ad.ID)
            {
                return BadRequest();
            }

            try
            {
                await Task.Run(() => this._adsService.UpdateAdd(ad));
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Ads
        [HttpPost]
        public async Task<IActionResult> PostAd([FromBody] Ad ad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await Task.Run(() =>
            {
                this._adsService.AddAd(ad);
            });

            return CreatedAtAction("GetAd", new { id = ad.ID }, ad);
        }

        // DELETE: api/Ads/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAd([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IDictionary<long, bool> adsDeleted = await Task.Run(()=> this._adsService.DeleteAds(new long[] { id }));

            if (adsDeleted.ContainsKey(id))
            {
                if (adsDeleted[id] == true)
                {
                    return Ok();
                }
            }
            return NotFound();
        }

        private bool AdExists(long id)
        {
            return this._adsService.GetAd(id) != null;
        }
    }
}