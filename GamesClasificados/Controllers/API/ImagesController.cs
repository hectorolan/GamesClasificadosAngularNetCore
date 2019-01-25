using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GClaV2.Interfaces;
using GClaV2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GClaV2.Controllers.API
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/images")]
    public class ImagesController : Controller
    {
        private readonly IAzureStorageBlobService AzureStorageBlobService;

        public ImagesController(IAzureStorageBlobService azureStorageBlobService)
        {
            AzureStorageBlobService = azureStorageBlobService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Post([FromForm] UploadImageModel fileModel)
        {
            bool saved = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (fileModel.FileImage != null && fileModel.FileImage.Length > 0)
            {
                using (var stream = fileModel.FileImage.OpenReadStream())
                {
                    saved = await AzureStorageBlobService.UploadBlob(stream, fileModel.Name, fileModel.FileImage.ContentType);
                }
            }
            else if (fileModel.Base64Img != "" || fileModel.Base64Img != null)
            {
                fileModel.Base64Img = this.SanitizeBase64String(fileModel.Base64Img);
                saved = await AzureStorageBlobService.UploadImage(fileModel.Base64Img, fileModel.Name, "image/jpeg");
            }

            return Ok(saved);
        }

        private string SanitizeBase64String(string base64)
        {
            if (base64.Contains(";base64"))
            {
                string[] datauri = base64.Split(';');
                base64 = datauri[1].Substring(datauri[1].IndexOf(',') + 1);
            }
            return base64;
        }
    }
}