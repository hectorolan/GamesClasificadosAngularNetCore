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
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace GClaV2.Controllers.API
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly IAdsService _adsService;

        public UsersController(IUserService userService, IAdsService adsService)
        {
            _userService = userService;
            _adsService = adsService;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = await _userService.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] long id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.ID)
            {
                return BadRequest();
            }

            try
            {
                await _userService.SaveUser(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_userService.UserExists(id))
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
        
        // GET: api/Users?username={username}
        [HttpGet()]
        public async Task<IActionResult> GetUser([FromQuery] string username)
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(username))
            {
                return BadRequest(ModelState);
            }

            bool userExists = await _userService.UsernameExists(username);
            
            return Ok(userExists);
        }
        
        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _userService.SaveUser(user);

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        // DELETE: api/Users/Delete/5
        [HttpGet("Delete/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userService.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            User claimsUser = AccountController.GetUserFromClaims((ClaimsIdentity)User.Identity);
            User userFromClaims = await _userService.GetUser(claimsUser.Email);
            // This validate that the request for delete X user correspond to the
            // logged user
            if (userFromClaims.ID != user.ID)
            {
                return BadRequest(ModelState);
            }

            _userService.DeleteUser(user, this._adsService);
            return RedirectToAction(nameof(AccountController.SignOut), "Account");
        }

    }
}