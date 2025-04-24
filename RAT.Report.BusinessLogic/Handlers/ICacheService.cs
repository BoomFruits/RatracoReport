using RAT.Report.Domain.Entities.DanhMuc;
using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;
using RAT.Report.Domain.DTO.DanhMuc;

namespace RAT.Report.BusinessLogic.Handlers
{
    public interface ICacheService : IService
    {
        Task<NhanVienInfo> GetNhanVien(string maNV);

        Task<bool> SaveNhanVien(NhanVienInfo data);

        Task<DonViInfo> GetDonVi(string maNV);

        Task<bool> SaveDonVi(DonViInfo data);
    }
}
