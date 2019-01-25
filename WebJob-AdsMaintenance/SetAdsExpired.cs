using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Microsoft.SqlServer.Management.Common;
using Microsoft.SqlServer.Management.Smo;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Reflection;

namespace WebJob_AdsMaintenance
{
    public class SetAdsExpired
    {
        public static void ExecuteProcess(string connstring)
        {
            string path = ("./SetAdsExpired.sql");
            FileInfo file = new FileInfo(path);

            string script = file.OpenText().ReadToEnd();

            SqlConnection conn = new SqlConnection(connstring);

            Server server = new Server(new ServerConnection(conn));

            server.ConnectionContext.ExecuteNonQuery(script);
        }
    }
}
