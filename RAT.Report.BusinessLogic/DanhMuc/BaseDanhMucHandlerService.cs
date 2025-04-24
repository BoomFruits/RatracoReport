using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;
using RAT.Report.BusinessLogic.Handlers;
using RAT.Report.DataAccess.DAL;
using RAT.Report.Domain.DTO.DanhMuc;

namespace RAT.Report.BusinessLogic.Actions
{
    public abstract class BaseDanhMucHandler<TService> : BaseService<TService> where TService : BaseService, IService
    {
        protected ICacheService CacheService { get; private set; }
        protected string CurrentUserName { get; set; }
        public BaseDanhMucHandler(ICacheService cacheService)
        {
            CacheService = cacheService;
        }
        protected async Task<NhanVienInfo> CurrentNhanVien()
        {
            return await GetNhanVien(CurrentUserName);
        }
        protected async Task<DonViInfo> CurrentDonVi()
        {
            var nhanVien = await CurrentNhanVien();
            if (nhanVien != null)
            {
                return await GetDonVi(nhanVien.MaDV);
            }
            return null;
        }
        protected async Task<NhanVienInfo> GetNhanVien(string maNV)
        {
            if (!string.IsNullOrEmpty(maNV))
            {
                var nhanVien = await CacheService.GetNhanVien(maNV);
                if (nhanVien == null)
                {
                    nhanVien = await DanhMucDAL.GetOneNhanVien(maNV);
                    if (nhanVien != null)
                    {
                        await CacheService.SaveNhanVien(nhanVien);
                    }
                }
                return nhanVien;
            }
            return null;
        }
        protected async Task<DonViInfo> GetDonVi(string maDV)
        {
            if (!string.IsNullOrEmpty(maDV))
            {
                var donVi = await CacheService.GetDonVi(maDV);
                if (donVi == null)
                {
                    donVi = await DanhMucDAL.GetOneDonVi(maDV);
                    if (donVi != null)
                    {
                        await CacheService.SaveDonVi(donVi);
                    }
                }
                return donVi;
            }
            return null;
        }
        public void SetCurrentUser(string userName)
        {
            CurrentUserName = userName;
        }
    }
}
