using GClaV2.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GClaV2.Services
{
    public class AzureStorageBlobService : IAzureStorageBlobService
    {
        private readonly IConfiguration Configuration;

        public AzureStorageBlobService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private CloudBlobContainer GetCloudBlobContainer()
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(Configuration.GetConnectionString("gclastorage_AzureStorageConnectionString"));
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference("images-container");
            return container;
        }

        public async Task<bool> UploadBlob(Stream fileStream, string fileName, string contentType)
        {
            CloudBlobContainer container = GetCloudBlobContainer();
            CloudBlockBlob blob = container.GetBlockBlobReference(fileName);
            blob.Properties.ContentType = contentType;
            await blob.UploadFromStreamAsync(fileStream);
            return true;
        }

        public async Task<bool> UploadImage(string imageData, string fileName, string contentType)
        {
            CloudBlobContainer container = GetCloudBlobContainer();
            byte[] imageBytes = Convert.FromBase64String(imageData);
            CloudBlockBlob blob = container.GetBlockBlobReference(fileName);
            blob.Properties.ContentType = contentType;
            await blob.UploadFromByteArrayAsync(imageBytes, 0, imageBytes.Length);
            Console.WriteLine("New Image AbsoluteUri: " + blob.StorageUri.PrimaryUri.AbsoluteUri);
            return true;
        }

    }
}
