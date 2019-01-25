using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GClaV2.Models
{
    public class UploadImageModel
    {
        public string Name { get; set; }
        public IFormFile FileImage { get; set; }
        public string Base64Img { get; set; }
    }
}
