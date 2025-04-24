
using RAT.Report.Domain.DTO.Workflow;
using RAT.Report.Domain.Entities.BangGia;
using RAT.Report.Domain.Entities.DanhMuc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.BanHang
{
    public class BangGiaVCTPheDuyetInput
    {
        public string UserName { get; set; }
        public int? VCTrucID { get; set; }
        public int? taskid { get; set; }
        public bool IsDongY { get; set; }
        public string NoiDung { get; set; }
    }
    public class BangGiaVCTFilter
    {
      
        public byte? TrangThai { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public byte?  LoaiBangGia { get; set; }
        public string UserName { get; set; }
        public int itemsPerPage { get; set; }
        public int currentPage { get; set; }
    }
    public class BangGiaVCTOutput
    {
        public int? TotalCount { get; set; }
        public IEnumerable<BangGiaVCTItem> data { get; set; }
    }
    public class BangGiaVCTItem : BangGiaVCT
    {
        public int TotalCount { get; set; }
        public string TenTrangThai { get; set; }
        public string UserName { get; set; }
        public short? IsSua { get; set; }
        public short? IsXoa { get; set; }
        public short? IsHuy { get; set; }
        public short? IsPheDuyet { get; set; }
        public short? IsTrinhDuyet { get; set; }
        public long? TaskID { get; set; }
        public IEnumerable<TaskInfo> TaskInfos { get; set; }

    }
    public class BangGiaVCTInput
    {
        public int VCTrucID { get; set; }
        public string TenBangGia { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string GhiChu{ get; set; }
        public string UserName { get; set; }
    }
    public class BangGiaVCTDetailFilter
    {
        public int VCTrucID { get; set; }

      
        public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
    }
    public class BangGiaVCTDetailItem : BangGiaVCTDetail
    {
      
        public string TenGaDong { get; set; }
        public string TenGaTra { get; set; }
        public string TenTuyen{ get; set; }

    }
    public class BangGiaVCTDetailUpload : BangGiaVCTDetail
    {
        public string TenGaDong { get; set; }
        public string TenGaTra { get; set; }


    }
    public class ResultBangGiaVCTUpload
    {
        public long IsOK { get; set; }
        public string msg { get; set; }
        public List<BangGiaVCTDetailUpload> Items { get; set; }
        public string TenBangGia { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string GhiChu { get; set; }
    }


}
