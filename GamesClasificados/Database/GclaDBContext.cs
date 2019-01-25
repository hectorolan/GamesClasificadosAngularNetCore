using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GClaV2.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GClaV2.Data
{
    public class GclaDBContext : DbContext
    {
        public GclaDBContext(DbContextOptions<GclaDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            /*builder.Entity<Ad>().ToTable("Ad");
            builder.Entity<User>().ToTable("User");
            builder.Entity<SystemConsole>().ToTable("SystemConsole");
            builder.Entity<Section>().ToTable("Section");*/
            builder.Entity<User>().HasAlternateKey(u => u.Email);

        }

        public DbSet<Ad> Ads { get; set; }
        public DbSet<User> GClaUsers { get; set; }
        public DbSet<SystemConsole> SystemConsoles { get; set; }
        public DbSet<Section> Sections { get; set; }
    }
}