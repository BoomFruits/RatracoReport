using RAT.Report.ReportApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TLS.Lib.OAuth;
using RAT.Report.BusinessLogic.Report.BC;

namespace RAT.Report.ReportApi.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/ReportBC")]
    public class ReportBCController : BaseReportApiController<ReportBCController>
    {
        #region bc ql phuong tien
        //[HttpPost]
        //[Route("BCQLX01")]
        ////[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        //public async Task<IHttpActionResult> BCQLX01(ReportBCQLX01Input input)
        //{
        //    try
        //    {
        //        return Json(await HandleMediator(input));
        //    }
        //    catch (Exception ex)
        //    {
        //        Logger.Error(ex);
        //        throw;
        //    }

        //}
        [HttpPost]
        [Route("BCQLX01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCQLX01Excel(ReportBCQLX01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCQLX01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCQLX02")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCQLX02(ReportBCQLX02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCQLX02Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCQLX02Excel(ReportBCQLX02Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCQLX02_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        #endregion
        #region bc tram
        [HttpPost]
        [Route("BCHH01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCHH01(ReportBCHH01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCHH01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCHH01Excel(ReportBCHH01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCHH01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCHH01Detail")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCHH01Detail(ReportBCHH01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCHH02")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCHH02(ReportBCHH02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCHH02Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCHH02Excel(ReportBCHH02Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCHH02_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCHH02Detail")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCHH02Detail(ReportBCHH02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCHH03")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCHH03(ReportBCHH03Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCHH03Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCHH03Excel(ReportBCHH03Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCHH03_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCHH03Detail")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCHH03Detail(ReportBCHH03Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }



        #endregion
        #region bc trungtamnoidia
        [HttpPost]
        [Route("BCND01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCND01(ReportBCND01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCND01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCND01Excel(ReportBCND01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCND01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCND01Detail")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCND01Detail(ReportBCND01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCND02")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCND02(ReportBCND02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCND02Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCND02Excel(ReportBCND02Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCND02_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCND03")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCND03(ReportBCND03Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCND03Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCND03Excel(ReportBCND03Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCND03_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCND04")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCND04(ReportBCND04Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCND04Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCND04Excel(ReportBCND04Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCND04_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        #endregion
        #region bc trungtamlvqt
        [HttpPost]
        [Route("BCLV01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCLV01(ReportBCLV01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCLV01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCLV01Excel(ReportBCLV01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCLV01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCLV01Detail")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCLV01Detail(ReportBCLV01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCLV02")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCLV02(ReportBCLV02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCLV02Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCLV02Excel(ReportBCLV02Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCLV02_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        #endregion
        #region bc trungtamdh
        [HttpPost]
        [Route("BCDH01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCDH01(ReportBCDH01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCDH01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCDH01Excel(ReportBCDH01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCDH01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCDH01Detail")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCDH01Detail(ReportBCDH01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCDH02")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCDH02(ReportBCDH02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCDH02Detail")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCDH02Detail(ReportBCDH02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCDH02Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCDH02Excel(ReportBCDH02Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCDH02_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }

        #endregion
        #region bc bandieuhanh
        [HttpPost]
        [Route("BCQT01")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCQT01(ReportBCQT01Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCQT01Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCQT01Excel(ReportBCQT01Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCQT01_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCQT02")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCQT02(ReportBCQT02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCQT02Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCQT02Excel(ReportBCQT02Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCQT02_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCQT02Detail")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCQT02Detail(ReportBCQT02Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCQT03")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCQT03(ReportBCQT03Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCQT03Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCQT03Excel(ReportBCQT03Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCQT03_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("BCQT04")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<IHttpActionResult> BCQT04(ReportBCQT04Input input)
        {
            try
            {
                input.Username = User.GetIdentityUserName();
                return Json(await HandleMediator(input));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }

        }
        [HttpPost]
        [Route("BCQT04Excel")]
        //[AppAuthorize(Roles = DefineAction.BaoCaoCongTy)]
        public async Task<HttpResponseMessage> BCQT04Excel(ReportBCQT04Input input)
        {
            try
            {
                var fileStream = await HandleMediatorExcel(input);
                return FileDownloadExcel(fileStream, string.Format("BCQT04_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
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