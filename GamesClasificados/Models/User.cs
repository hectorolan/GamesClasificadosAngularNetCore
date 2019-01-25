using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GClaV2.Models
{
    public class User
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public string ProfilePictureURL { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public bool ShowPhone { get; set; }

        public bool ShowEmail { get; set; }

        public string PreferedContactMethod { get; set; }
    }
}