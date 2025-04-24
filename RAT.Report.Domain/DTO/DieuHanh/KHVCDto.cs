using RAT.Report.Domain.DTO.BanHang;
using RAT.Report.Domain.Entities.DieuHanh;
using RAT.Report.Domain.Entities.YCVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DieuHanh
{
    public class KHVCandYCVCDto
    {
        public YCVCItem ycvc { get; set; }
        public List<KHVCOutput> khvc { get; set; }
    }
    public class KHVCandYCVCOutput
    {
        public YCVCEntity ycvc { get; set; }
        public KHVCOutput khvc { get; set; }
    }

    public class KHVCInput
    {
        public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
        public int? HinhThucVC { get; set; }
        public int? KieuYCVC { get; set; }
    }
    public class KHVCOutput : KeHoachVanChuyenEntity
    {
        public string TenGaDi { get; set; }
        public string TenGaDen { get; set; }
        public string TenTrangThai { get; set; }
        public string TenTuyen { get; set; }
        public string MacTauDisplay { get; set; }
        public int? IsXepXeG { get; set; }
        public int? IsDoXeG { get; set; }
    }
    
    public class TrangThaiInput
    {
        public long? KHVCID { get; set; }
        public int TrangThai { get; set; }
        public string Username { get; set; }
    }
}
