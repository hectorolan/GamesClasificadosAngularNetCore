using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GClaV2.Controllers.API;
using GClaV2.Interfaces;
using GClaV2.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GClaV2.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly AzureAdB2COptions _options;
        private readonly IUserService _userService;

        public AccountController(IOptions<AzureAdB2COptions> b2cOptions, IUserService userService)
        {
            _options = b2cOptions.Value;
            _userService = userService;
        }

        [HttpGet]
        public IActionResult SignIn()
        {
            if (User.Identity.IsAuthenticated)
            {
                // Redirect to home page if the user is authenticated.
                //return RedirectToAction(nameof(HomeController.Index), "Home");
                return Redirect("/games");
            }
            var redirectUrl = "/games";
            //var redirectUrl = Url.Action(nameof(HomeController.Index), "Home");
            return Challenge(
                new AuthenticationProperties {
                    RedirectUri = redirectUrl,
                    IsPersistent = true
                },
                OpenIdConnectDefaults.AuthenticationScheme);
        }

        [HttpGet]
        public IActionResult ResetPassword()
        {
            var redirectUrl = "/games";
            //var redirectUrl = Url.Action(nameof(HomeController.Index), "Home");
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            properties.Items[AzureAdB2COptions.PolicyAuthenticationProperty] = _options.ResetPasswordPolicyId;
            return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
        }

        [HttpGet]
        public IActionResult EditProfile()
        {
            var redirectUrl = "/games";
            //var redirectUrl = Url.Action(nameof(HomeController.Index), "Home");
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            properties.Items[AzureAdB2COptions.PolicyAuthenticationProperty] = _options.EditProfilePolicyId;
            return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
        }

        [HttpGet]
        public IActionResult SignOut()
        {
            var callbackUrl = "/games";
            //var callbackUrl = Url.Action(nameof(HomeController.Index), "Home");
            return SignOut(new AuthenticationProperties { RedirectUri = callbackUrl },
                CookieAuthenticationDefaults.AuthenticationScheme, OpenIdConnectDefaults.AuthenticationScheme);
        }

        /// <summary>
        /// It was used for redirection on SignOut. Its not used anymore, since
        /// we are redirecting to the main page. HomeController.Index
        /// </summary>
        [HttpGet]
        public IActionResult SignedOut()
        {
            if (User.Identity.IsAuthenticated)
            {
                // Redirect to home page if the user is authenticated.
                return Redirect("/games");
                //return RedirectToAction(nameof(HomeController.Index), "Home");
            }

            return View();
        }

        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }

        [HttpGet]
        public IActionResult IsLoggedIn()
        {
            return Json(User.Identity.IsAuthenticated.ToString());
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            User claimsUser = GetUserFromClaims((ClaimsIdentity)User.Identity);
            User user = await _userService.GetUser(claimsUser.Email);
            if (user == null)
            {
                // By default show phone
                claimsUser.ShowPhone = true;

                _userService.AddUser(claimsUser);
                user = await _userService.GetUser(claimsUser.Email);
            }
            else if (AnyChanges(user, claimsUser))
            {
                await _userService.SaveUser(user);
            }
            return Json(user);
        }

        public static User GetUserFromClaims(ClaimsIdentity claims)
        {
            User claimUser = new User();
            foreach (Claim claim in claims.Claims)
            {
                switch (claim.Type)
                {
                    case "name":
                        claimUser.Name = claim.Value;
                        break;
                    case "extension_Telephone":
                        claimUser.Telephone = claim.Value;
                        break;
                    case "country":
                        claimUser.Country = claim.Value;
                        break;
                    case "city":
                        claimUser.City = claim.Value;
                        break;
                    case "emails":
                        claimUser.Email = claim.Value;
                        break;
                    default:
                        break;
                }
            }
            return claimUser;
        }

        private bool AnyChanges(User dbUser, User claimsUser)
        {
            bool changes = false;
            if (dbUser.Name != claimsUser.Name)
            {
                dbUser.Name = claimsUser.Name;
                changes = true;
            }
            if (dbUser.Telephone != claimsUser.Telephone)
            {
                dbUser.Telephone = claimsUser.Telephone;
                changes = true;
            }
            if (dbUser.City != claimsUser.City)
            {
                dbUser.City = claimsUser.City;
                changes = true;
            }
            if (dbUser.Country != claimsUser.Country)
            {
                dbUser.Country = claimsUser.Country;
                changes = true;
            }
            return changes;
        }
    }
}
