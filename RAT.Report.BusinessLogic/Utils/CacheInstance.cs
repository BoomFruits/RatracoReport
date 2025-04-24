using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Redis;

namespace RAT.Report.BusinessLogic.Utils
{
    public static class CacheInstance
    {
        private const string ConnectionAuth = "RedisAuth";
        private const string ConnectionRatraco = "RedisRatraco";

        private static string GetConnectionString(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                name = ConnectionRatraco;
            }
            return ConfigurationManager.ConnectionStrings[name].ConnectionString;
        }

        private static ICacheClient _auth = null;
        public static ICacheClient Auth
        {
            get
            {
                if (_auth == null)
                {
                    _auth = new RedisCacheClient(GetConnectionString(ConnectionAuth));
                }
                return _auth;
            }
        }

        private static ICacheClient _ratraco = null;
        public static ICacheClient Ratraco
        {
            get
            {
                if (_ratraco == null)
                {
                    _ratraco = new RedisCacheClient(GetConnectionString(ConnectionRatraco));
                }
                return _ratraco;
            }
        }
    }
}
