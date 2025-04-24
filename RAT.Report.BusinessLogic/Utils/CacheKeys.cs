using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.BusinessLogic.Utils
{
    public static class CacheKeys
    {
        private const string UrlShortener = "C_Url_{path}";

        public static string GetUrlShortener(string path)
        {
            return UrlShortener.FillParams(new { path });
        }
    }
}
