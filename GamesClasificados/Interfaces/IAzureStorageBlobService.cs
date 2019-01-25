using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GClaV2.Interfaces
{
    public interface IAzureStorageBlobService
    {
        Task<bool> UploadBlob(Stream fileStream, string fileName, string contentType);
        Task<bool> UploadImage(string imageData, string fileName, string contentType);
    }
}
