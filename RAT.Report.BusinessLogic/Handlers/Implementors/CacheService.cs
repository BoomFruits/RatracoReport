using RAT.Report.DataAccess.DAL.Workflow;
using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;
using System.IO;
using RAT.Report.Domain.DTO.Test;
using RAT.Report.Domain.Entities.DanhMuc;
using RAT.Report.BusinessLogic.Utils;
using TLS.Lib.Net.Json;
using RAT.Report.Domain.DTO.Caching;
using RAT.Report.Domain.DTO.DanhMuc;

namespace RAT.Report.BusinessLogic.Handlers.Implementors
{
    public class CacheService : BaseService<CacheService>, ICacheService
    {
        private const string KeyNhanVien = "R_NV_{MaNV}";
        private const string KeyDonVi = "R_DV_{MaDV}";

        public CacheService() : base()
        {
        }

        public async Task<NhanVienInfo> GetNhanVien(string maNV)
        {
            var cacheKey = KeyNhanVien.FillParams(new { maNV });
            var cached = await CacheInstance.Ratraco.GetAsync<NhanVienInfo>(cacheKey);
            if (cached != null && cached.CreatedDate.HasValue)
            {
                cached.CreatedDate = cached.CreatedDate.Value.ToLocalTime();
            }
            return cached;
        }

        public async Task<bool> SaveNhanVien(NhanVienInfo data)
        {
            try
            {
                var cacheKey = KeyNhanVien.FillParams(new { data.MaNV });
                var cached = await CacheInstance.Ratraco.AddAsync(cacheKey, data, TimeSpan.FromMinutes(5));
                return true;
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Exception when SaveNhanVien to redis: data={0}", data.SerializeObject());
                return false;
            }
        }

        public async Task<DonViInfo> GetDonVi(string maNV)
        {
            var cacheKey = KeyDonVi.FillParams(new { maNV });
            var cached = await CacheInstance.Ratraco.GetAsync<DonViInfo>(cacheKey);
            if (cached != null && cached.CreatedDate.HasValue)
            {
                cached.CreatedDate = cached.CreatedDate.Value.ToLocalTime();
            }
            return cached;
        }

        public async Task<bool> SaveDonVi(DonViInfo data)
        {
            try
            {
                var cacheKey = KeyDonVi.FillParams(new { data.MaDV });
                var cached = await CacheInstance.Ratraco.AddAsync(cacheKey, data, TimeSpan.FromMinutes(5));
                return true;
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Exception when SaveNhanVien to redis: data={0}", data.SerializeObject());
                return false;
            }
        }
    }
}
