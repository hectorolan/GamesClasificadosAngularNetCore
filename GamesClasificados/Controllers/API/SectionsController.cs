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
    [Route("api/Sections")]
    public class SectionsController : Controller
    {
        private readonly GclaDBContext _context;

        public SectionsController(GclaDBContext context)
        {
            _context = context;
        }

        // GET: api/Sections
        [HttpGet]
        public IEnumerable<Section> GetSections()
        {
            return _context.Sections;
        }
    }
}