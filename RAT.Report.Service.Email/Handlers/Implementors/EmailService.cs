using RAT.Report.DataAccess.DAL.DanhMuc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace RAT.Report.Service.Email.Handlers.Implementors
{
    public class EmailService : RatracoBaseEmailService<EmailService>, IEmailService
    {
        //private string GetTenNhanVienByUsername(string userName)
        //{
        //    var tenCanBo = DanhMucDAL.GetTenNhanVienByUsername(userName);
        //    return string.IsNullOrEmpty(tenCanBo) ? userName : tenCanBo;
        //}
        //private string GetTenCanBo(string userName)
        //{
        //    return string.Format("{0} ({1})", GetTenNhanVienByUsername(userName), userName);
        //}
        //private string GetTenCanBo(IEnumerable<string> userName)
        //{
        //    return string.Join(", ", userName.Select(m => string.Format("{0} ({1})", GetTenNhanVienByUsername(m), m)));
        //}
        public void SendMailByTpl(string receive, string templateCode, string circleCode, Dictionary<string, object> parameters)
        {
            var task = QNotification.ClientApi.NotificationClientApi.SendMailByTpl(receive, templateCode, parameters, null, null, circleCode);

            Logger.DebugFormat("SendMailByTpl (receive={0}, templateCode={1}, circleCode={2}, parameters={3}) with result taskID={4}, token={5}", receive, templateCode, circleCode, ParametersToString(parameters), task.Id, task.Token);
        }

        public void SendMailByTpl(string receive, string templateCode, string circleCode, Dictionary<string, object> parameters, DateTime? scheduleDate)
        {
            var task = QNotification.ClientApi.NotificationClientApi.SendMailByTpl(receive, templateCode, parameters, scheduleDate, null, circleCode);

            Logger.DebugFormat("SendMailByTpl (receive={0}, templateCode={1}, circleCode={2}, parameters={3}, scheduleDate={4}) with result taskID={5}, token={6}", receive, templateCode, circleCode, ParametersToString(parameters), scheduleDate, task.Id, task.Token);
        }
        public void CancelReminder(string circleCode)
        {
            var cancelInfo = new QNotification.ClientApi.ClientCancelScheduleEmail
            {
                CircleCode = circleCode
            };

            var task = QNotification.ClientApi.NotificationClientApi.CancelScheduleEmail(cancelInfo);

            Logger.DebugFormat("CancelScheduleEmail with result taskID={0}, token={1}", task.Id, task.Token);
        }


        public void SendTrinhDuyetToPhanQuyen(string linkPheDuyet, string receive, string processName, int taskID, int objectKey, string objectDisplay, string canBoTrinhDuyet, string canBoPheDuyet)
        {
            try
            {
                if (!string.IsNullOrEmpty(receive) && IsValidEmailAddress(receive))
                {
                    var parameters = new Dictionary<string, object>();

                    parameters.Add("BaseUrl", RatracoWebClient);
                    parameters.Add("LinkPheDuyet", linkPheDuyet);
                    parameters.Add("ProcessName", processName);
                    parameters.Add("TaskID", taskID);
                    parameters.Add("ObjectKey", objectKey);
                    parameters.Add("ObjectDisplay", objectDisplay);
                    //parameters.Add("CanBoTrinhDuyet", GetTenCanBo(canBoTrinhDuyet));
                    //parameters.Add("CanBoPheDuyet", GetTenCanBo(canBoPheDuyet));
                     
                    SendMailByTpl(receive, EmailTemplate.WFL.TrinhDuyetToPhanQuyen, null, parameters);
                }
                else
                {
                    Logger.Debug("SendTrinhDuyetToPhanQuyen with empty or invalid email address receive");
                }
            }
            catch (Exception ex)
            {
                var inputs = new { linkPheDuyet, receive, processName, taskID, objectKey, objectDisplay, canBoTrinhDuyet, canBoPheDuyet };
                Logger.Error(ex, "SendTrinhDuyetToPhanQuyen exception with input", inputs);
            }
        }
    }
}
