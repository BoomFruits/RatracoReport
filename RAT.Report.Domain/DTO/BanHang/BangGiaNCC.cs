
using RAT.Report.Domain.Entities.BangGia;
using RAT.Report.Domain.Entities.DanhMuc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.BanHang
{
  
    public class BangGiaNCCFilter
    {
        public int? CustomerID { get; set; }
        public byte? TrangThai { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public byte?  LoaiBangGia { get; set; }
        public string UserName { get; set; }
        public int itemsPerPage { get; set; }
        public int currentPage { get; set; }
    }
    public class BangGiaNCCOutput
    {
        public int? TotalCount { get; set; }
        public IEnumerable<BangGiaNCCItem> data { get; set; }
    }
    public class BangGiaNCCItem : BangGiaNCC
    {
        public int TotalCount { get; set; }
        public string TenTrangThai { get; set; }
        public string UserName { get; set; }
    }
    public class BangGiaNCCInput
    {
        public int GiaNCCID { get; set; }
        public string TenBangGia { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string GhiChu{ get; set; }
        public List<BangGiaNCCDetail> ListBangGiaNCC { get; set; }
        public string UserName { get; set; }
    }
    public class BangGiaNCCDetailItem : BangGiaNCCDetail
    {
        public  string  TenGa { get; set; }
        public string TenTinhThanh { get; set; }
        public string TenQuanHuyen { get; set; }
        public string TenPhuongXa { get; set; }
        public string TenKhuCN { get; set; }
        public string TenDichVu { get; set; }
        
    }
    public class BangGiaNCCDetailFilter
    {
        public int GiaNCCID { get; set; }
        
        public string MaNCC { get; set; }
        public int? GaID { get; set; }
    }
    public class BangGiaNCCDetailUpload : BangGiaNCCDetail
    {
        public string TenGa { get; set; }      
        public string MaDV { get; set; }
       
       
    }
    public class ResultBangGiaNCCUpload
    {
        public long IsOK { get; set; }
        public string msg { get; set; }
        public List<BangGiaNCCDetailUpload> Items { get; set; }
        public string TenBangGia { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string GhiChu { get; set; }
    }

}
