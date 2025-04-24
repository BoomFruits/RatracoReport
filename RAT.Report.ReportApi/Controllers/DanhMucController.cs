using RAT.Report.BusinessLogic.Handlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TLS.Lib.Net.Json;
using TLS.Lib.Net.Log;
using TLS.Lib.OAuth;
using TLS.Lib.Web;
using RAT.Report.Domain.DTO.DanhMuc;
using RAT.Report.BusinessLogic.DanhMuc;

namespace RAT.Report.ReportApi.Controllers
{
    [RoutePrefix("api/DanhMuc")]
    [AllowAnonymous]
    public class DanhMucController : BaseApiController<DanhMucController>
    {
        [HttpPost]
        [Route("KhachHang")]
        //[AppAuthorize]
        public async Task<IHttpActionResult> KhachHang(GetListKhachHangInput input)
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
        [Route("NCC")]
        //[AppAuthorize]
        public async Task<IHttpActionResult> NCC(GetListNCCInput input)
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
        [Route("Zone")]
        //[AppAuthorize]
        public async Task<IHttpActionResult> Zone(GetListZoneInput input)
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
        [Route("HangHoa")]
        //[AppAuthorize]
        public async Task<IHttpActionResult> HangHoa(GetListHangHoaInput input)
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
        [Route("DonViTinh")]
        //[AppAuthorize]
        public async Task<IHttpActionResult> DonViTinh(GetListDonViTinhInput input)
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
        [Route("LoaiTacNghiep")]
        //[AppAuthorize]
        public async Task<IHttpActionResult> LoaiTacNghiep(GetListLoaiTacNghiepInput input)
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
        [Route("DonVi")]
        //[AppAuthorize]
        public async Task<IHttpActionResult> DonVi(GetListDonViInput input)
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
        [Route("LoaiHinhVC")]
        //[AppAuthorize]
        public async Task<IHttpActionResult> LoaiHinhVC(GetListLoaiHinhVCInput input)
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
        [Route("XuongSuaChua")]
       //[AppAuthorize]
        public async Task<IHttpActionResult> XuongSuaChua(GetListXuongSuaChuaInput input)
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
    }
}