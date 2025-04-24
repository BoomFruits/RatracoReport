using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;

namespace RAT.Report.Service.Email.Handlers
{
    public interface IEmailService : IService
    {
        bool IsValidEmailAddress(string emailAddress);
        void SendMailByTpl(string receive, string templateCode, string circleCode, Dictionary<string, object> parameters);
        void SendMailByTpl(string receive, string templateCode, string circleCode, Dictionary<string, object> parameters, DateTime? scheduleDate);
        void CancelReminder(string circleCode);
    }
}
