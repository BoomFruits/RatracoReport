using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Excel;
using TLS.Lib.Net.Service;
using RAT.Report.BusinessLogic.Handlers;
using RAT.Report.DataAccess.DAL;
using RAT.Report.Domain.DTO.DanhMuc;
using RAT.Report.Domain.Entities.DanhMuc;

namespace RAT.Report.BusinessLogic.Report
{
    public abstract class BaseReportService<TService> : BaseExcelService<TService> where TService : BaseService, IService
    {
        protected ICacheService CacheService { get; private set; }
        protected string CurrentUserName { get; set; }
        public BaseReportService(ICacheService cacheService)
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
        protected string GetTenCongTyLine1(DMDonVi donVi)
        {
            if (donVi != null && (donVi.MaCT == "KHN" || donVi.MaCT == "FHN"))
            {
                return "Công ty cổ phần";
            }
            if (donVi != null && (donVi.MaCT == "KSG" || donVi.MaCT == "FSG"))
            {
                return "Công ty cổ phần";
            }
            return null;
        }
        protected string GetTenCongTyLine2(DMDonVi donVi)
        {
            if (donVi != null && (donVi.MaCT == "KHN" || donVi.MaCT == "FHN"))
            {
                return "Vận tải đường sắt Hà Nội";
            }
            if (donVi != null && (donVi.MaCT == "KSG" || donVi.MaCT == "FSG"))
            {
                return "Vận tải đường sắt Sài Gòn";
            }
            return null;
        }
        public void SetCurrentUser(string userName)
        {
            CurrentUserName = userName;
        }
        protected virtual ExpandoObject Aggregate(IEnumerable<ReportObject> data, Action<dynamic, IEnumerable<ReportObject>> items)
        {
            if (data != null && data.Any())
            {
                dynamic result = new ExpandoObject();
                items(result, data);
                return result;
            }
            return null;
        }
        protected virtual ExpandoObject Sum(IEnumerable<ReportObject> data)
        {
            return Sum(data, null);
        }
        protected virtual ExpandoObject Sum(IEnumerable<ReportObject> data, Action<dynamic, IEnumerable<ReportObject>> specialItems)
        {
            if (data != null)
            {
                var result = new ExpandoObject();
                if (specialItems != null)
                {
                    result = Aggregate(data, specialItems);
                }
                var list = AggregateData(data);
                foreach (var item in list)
                {
                    IDictionary<string, object> current = result;

                    if (!current.ContainsKey(item.Key))
                    {
                        object sum = null;
                        try
                        {
                            sum = AggregateSum(item.Value.Key, item.Value.Value);
                        }
                        catch //(Exception ex)
                        {
                            // Log error
                            sum = null;
                        }
                        current.Add(item.Key, sum);
                    }
                }
                return result;
            }
            return null;
        }
        protected virtual Dictionary<string, KeyValuePair<Type, List<object>>> AggregateData(IEnumerable<ReportObject> data)
        {
            var dic = new Dictionary<string, KeyValuePair<Type, List<object>>>();
            foreach (var item in data)
            {
                foreach (var key in item.Keys)
                {
                    var value = item.Get(key);
                    if (value != null && IsAggregateType(value.GetType()))
                    {
                        if (!dic.ContainsKey(key))
                        {
                            dic[key] = new KeyValuePair<Type, List<object>>(value.GetType(), new List<object>());
                        }
                        dic[key].Value.Add(value);
                    }

                }
            }
            return dic;
        }
        protected virtual object AggregateSum(Type type, IEnumerable<object> data)
        {
            object cur = null;
            foreach (var item in data)
            {
                if (cur == null)
                {
                    cur = 0;
                }
                cur = AggregateSumItem(type, cur, item);
            }
            return cur;
        }
        protected virtual object AggregateSumItem(Type type, object x, object y)
        {
            return Convert.ChangeType((dynamic)x + (dynamic)y, type);
        }
        protected virtual bool IsAggregateType(Type type)
        {
            if (type.IsValueType)
            {
                if (type == typeof(sbyte) ||
                    type == typeof(byte) ||
                    type == typeof(short) ||
                    type == typeof(ushort) ||
                    type == typeof(int) ||
                    type == typeof(uint) ||
                    type == typeof(long) ||
                    type == typeof(ulong) ||
                    type == typeof(float) ||
                    type == typeof(double) ||
                    type == typeof(decimal)
                    )
                {
                    return true;
                }
            }
            return false;
        }
    }
}
