using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Configuration;

namespace WebJob_AdsMaintenance
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new JobHostConfiguration();
            if (config.IsDevelopment)
            {
                config.UseDevelopmentSettings();
            }
            config.DashboardConnectionString = ConfigurationManager.ConnectionStrings["AzureDashboardStorage"].ConnectionString;
            config.StorageConnectionString = ConfigurationManager.ConnectionStrings["AzureWebJobStorage"].ConnectionString;

            config.UseCore();
            config.UseTimers();

            var loggerFactory = new LoggerFactory();
            config.LoggerFactory = loggerFactory
                .AddConsole();

            var host = new JobHost(config);
            host.RunAndBlock();
        }

        [FunctionName("TimerTriggerCSharp")]
        public static void StartupJob(
        [TimerTrigger("0 30 1 * * *", RunOnStartup = true)] TimerInfo timerInfo, ILogger logger)
        {
            logger.LogInformation(DateTime.Now + " Executing the ads maintenance...");
            string connectionstring = ConfigurationManager.ConnectionStrings["GCLADBConnectionString"].ConnectionString;
            SetAdsExpired.ExecuteProcess(connectionstring);
            logger.LogInformation(DateTime.Now + " Ads maintenance finished.");
        }
    }
}
