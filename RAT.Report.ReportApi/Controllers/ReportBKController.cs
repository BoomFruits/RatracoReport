using RAT.Report.ReportApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TLS.Lib.OAuth;
using RAT.Report.BusinessLogic.Report.BK;

namespace RAT.Report.ReportApi.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/ReportBK")]
    public class ReportBKController : BaseReportApiController<ReportBKController>
    {
        [HttpPost]
        [Route("BK01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BK01(ReportBK01Input input)
        {
            try
            {
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        #region ttdh
        [HttpPost]
        [Route("BK01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BK01Excel(ReportBK01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BK01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BKTTDH01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BKTTDH01(ReportBKTTDH01Input input)
        { 
            try
            {
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("BKTTDH01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BKTTDH01Excel(ReportBKTTDH01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BKTTDH01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BKTTDH02")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BKTTDH02(ReportBKTTDH02Input input)
        {
            try
            {
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("BKTTDH02Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BKTTDH02Excel(ReportBKTTDH02Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BKTTDH02_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BKTTDH03")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BKTTDH03(ReportBKTTDH03Input input)
        {
            try
            {
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("BKTTDH03Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BKTTDH03Excel(ReportBKTTDH03Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BKTTDH03_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BKTTDH04")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BKTTDH04(ReportBKTTDH04Input input)
        {
            try
            {
                return Json(await HandleMediator(input));   
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("BKTTDH04Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BKTTDH04Excel(ReportBKTTDH04Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BKTTDH04_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BKTTDH05")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BKTTDH05(ReportBKTTDH05Input input)
        {
            try
            {
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("BKTTDH05Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BKTTDH05Excel(ReportBKTTDH05Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BKTTDH05_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BKTTDH06")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BKTTDH06(ReportBKTTDH06Input input)
        {
            try
            {
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("BKTTDH06Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BKTTDH06Excel(ReportBKTTDH06Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BKTTDH06_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
      
        #endregion
        #region ttvtnd
        [HttpPost]
        [Route("BKTTVTND01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BKTTVTND01(ReportBKTTVTND01Input input)
        {
            try
            {
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("BKTTVTND01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BKTTVTND01Excel(ReportBKTTVTND01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BKTTVTND01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        #endregion
        #region tram
        [HttpPost]
        [Route("BKTram01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BKTram01(ReportBKTram01Input input)
        {
            try
            {
                var userName = User.GetIdentityUserName();
                input.Username = userName;
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("BKTram01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BKTram01Excel(ReportBKTram01Input input)
        {
            try
            {
                var userName = User.GetIdentityUserName();
                input.Username = userName;
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BKTram01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        #endregion
    }
}