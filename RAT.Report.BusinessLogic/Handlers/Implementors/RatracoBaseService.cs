using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;

namespace RAT.Report.BusinessLogic.Handlers.Implementors
{
    public abstract class RatracoBaseService<T> : BaseService<T> where T : BaseService, IService
    {
        public string RatracoWebClient
        {
            get
            {
                return ConfigurationManager.AppSettings["RatracoWebClient"];
            }
        }
    }
}
