using RAT.Report.BusinessLogic.Handlers;
using RAT.Report.BusinessLogic.Handlers.Implementors;
using RAT.Report.Domain.DTO.DanhMuc;
using RAT.Report.ReportApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using TLS.Lib.OAuth;
using TLS.Lib.Web;
using TLS.Lib.Web.Models;

namespace RAT.Report.ReportApi.Controllers
{
    [RoutePrefix("api/System")]
    public class SystemController : BaseApiController<SystemController>
    {
        [HttpGet]
        [Route("GetSettings")]
        //[AllowAnonymous]
        public SystemSettings GetSettings()
        {
            try
            {
                var settings = new SystemSettings
                {
                    TimeServer = DateTime.Now,
                    Version = Regex.Replace(WebConfigurationManager.AppSettings["SystemSettings:Version"].Trim(), @"^\#\{[^\}]+\}$", "1.0.0"),
                    DataVersion = Regex.Replace(WebConfigurationManager.AppSettings["SystemSettings:DataVersion"].Trim(), @"^\#\{[^\}]+\}$", "1.0.0"),
                    BuildVersion = Regex.Replace(WebConfigurationManager.AppSettings["SystemSettings:BuildVersion"].Trim(), @"^\#\{[^\}]+\}$", "1.0.0.0"),
                    DeployVersion = Regex.Replace(WebConfigurationManager.AppSettings["SystemSettings:DeployVersion"].Trim(), @"^\#\{[^\}]+\}$", "1.0.0.0")
                };

                // Default build version is assembly version
                if (string.IsNullOrEmpty(settings.BuildVersion) || settings.BuildVersion == "1.0.0.0")
                {
                    settings.BuildVersion = GetType().Assembly.GetName().Version.ToString();
                }

                // When dev in local, use dynamic package version for disavle cache
                if (string.IsNullOrEmpty(settings.DeployVersion) || settings.DeployVersion == "1.0.0.0")
                {
                    settings.DeployVersion = DateTime.Now.ToString("yyyy.MM.dd.HHmmss");
                }

                return settings;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        [HttpGet]
        //[AppAuthorize(Roles =DefineAction.RatracoTMS)]
        public async Task<IEnumerable<WebMenuItem>> GetSideBarMenuItems()
        {
            try
            {
                var items = new WebMenu();
                items.AddHead("I. BẢNG KÊ");
                items.AddItem("#", "Bảng kê Trung tâm ĐHVT", null, "fa fa-bar-chart-o", new WebMenu()
                   .AddItem("app.BK.BKTTDH01", "1.Bảng kê chi trả DV cẩu", null, null)
                   .AddItem("app.BK.BKTTDH02", "2.Bảng kê chi trả DV VC đường bộ", null, null)
                   .AddItem("app.BK.BKTTDH03", "3.Bảng kê chi trả DV VC đường sắt", null, null)
                   .AddItem("app.BK.BKTTDH04", "4.Bảng kê chi trả DV VC đường biển", null, null)
                   .AddItem("app.BK.BKTTDH05", "5.Bảng kê chi trả DV hỗ trợ vận tải", null, null)
                   .AddItem("app.BK.BKTTDH06", "6.Bảng kê chi trả DV thuê container", null, null)
                   );
                items.AddItem("#", "Bảng kê Trung tâm VTNĐ", null, "fa fa fa-line-chart", new WebMenu()
                  .AddItem("app.BK.BKTTVTND01", "1.Bảng kê thu cước KH nội địa", null, null)
                  
                  );
                items.AddItem("#", "Bảng kê Trạm vận tải", null, "fa fa fa-line-chart", new WebMenu()
                .AddItem("app.BK.BKTram01", "1.Bảng kê kế hoạch xếp  dỡ", null, null)

                );
                items.AddItem("#", "Báo cáo bảng kê", null, "fa fa-tasks", new WebMenu()
                   .AddItem("app.BK.BK01", "1.BK01 Bảng kê doanh thu booking", null, null));
                items.AddHead("II. BÁO CÁO");
                items.AddItem("#", "Báo cáo phòng An toàn và Q.lý toa xe", null, "fa fa fa-line-chart", new WebMenu()
                 .AddItem("app.BC.BCQLX01", "1.Báo cáo hồ sơ kỹ thuật", null, null)
                 .AddItem("app.BC.BCQLX02", "2.Báo cáo sửa chữa toa xe", null, null)
                 );
                items.AddItem("#", "Báo cáo Trạm vận tải", null, "fa fa fa-tasks", new WebMenu()
                 .AddItem("app.BC.BCHH01", "1.Báo cáo tác nghiệp cẩu", null, null)
                 .AddItem("app.BC.BCHH02", "2.Báo cáo tổng hợp SXKD trung tâm", null, null)
                 .AddItem("app.BC.BCHH03", "3.Báo cáo tổng hợp SL xếp dỡ TTVT", null, null)
                );
                items.AddItem("#", "Báo cáo Trung tâm nội địa", null, "fa fa fa-tasks", new WebMenu()
                 .AddItem("app.BC.BCND01", "1.Báo cáo doanh thu tổng hợp", null, null)
                 .AddItem("app.BC.BCND02", "2.Báo cáo d.thu, s.lượng theo KH", null, null)
                 .AddItem("app.BC.BCND03", "3.Báo cáo d.thu theo người q.lý", null, null)
                 .AddItem("app.BC.BCND04", "4.Báo cáo s.lượng KH theo tháng", null, null)
                );
                items.AddItem("#", "Báo cáo Trung tâm LVQT", null, "fa fa fa-tasks", new WebMenu()
                 .AddItem("app.BC.BCLV01", "1.Báo cáo tổng hợp vận tải q.tế", null, null)
                 .AddItem("app.BC.BCLV02", "2.Báo cáo chi tiết d.thu, s.lượng QT", null, null)
                );
                items.AddItem("#", "Báo cáo Trung tâm điều hành", null, "fa fa fa-tasks", new WebMenu()
                 .AddItem("app.BC.BCDH01", "1.Báo cáo tình hình v.dụng Container", null, null)
                 .AddItem("app.BC.BCDH02", "2.Báo cáo tình hình đọng Container", null, null)
                );
                items.AddItem("#", "Báo cáo Ban lãnh đạo", null, "fa fa fa-tasks", new WebMenu()
                 .AddItem("app.BC.BCQT01", "1.Báo cáo tổng hợp kết quả vận tải", null, null)
                 .AddItem("app.BC.BCQT02", "2.Báo cáo kết quả vận tải theo tàu", null, null)
                 .AddItem("app.BC.BCQT03", "3.Báo cáo tổng hợp tình hình xếp dỡ", null, null)
                 .AddItem("app.BC.BCQT04", "4.Báo cáo chi tiết dịch vụ ngoài VT", null, null)
                );

                items.AddItem("app.trogiup", "Trợ giúp", null, "icon-question");

                return await Task.FromResult(items.ToItems());
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }
    }
}