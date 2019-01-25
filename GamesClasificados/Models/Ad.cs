using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GClaV2.Models
{
    public class Ad
    {
        public long ID { get; set; }

        public string Title { get; set; }

        public long OwnerId { get; set; }

        public decimal Price { get; set; }

        public int ConsoleId { get; set; }

        public int SectionId { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public DateTime DatePosted { get; set; }

        public bool Expired { get; set; }
    }
}