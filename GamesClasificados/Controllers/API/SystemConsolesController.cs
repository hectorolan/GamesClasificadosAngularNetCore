using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GClaV2.Data;
using GClaV2.Models;

namespace GClaV2.Controllers.API
{
    [Produces("application/json")]
    [Route("api/SystemConsoles")]
    public class SystemConsolesController : Controller
    {
        private readonly GclaDBContext _context;

        public SystemConsolesController(GclaDBContext context)
        {
            _context = context;
        }

        // GET: api/SystemConsoles
        [HttpGet]
        public IEnumerable<SystemConsole> GetSystemConsoles()
        {
            return _context.SystemConsoles;
        }
    }
}