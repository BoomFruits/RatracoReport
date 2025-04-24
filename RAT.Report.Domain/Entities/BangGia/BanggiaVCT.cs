using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.BangGia
{
    public class BangGiaVCT
    {
        public int VCTrucID { get; set; }
        public string TenBangGia { get; set; }
        public byte LoaiBangGia { get; set; }
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public string MaDV { get; set; }
        public byte? TrangThai { get; set; }
        public string GhiChu { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ThoiGianDuyet { get; set; }
        public string NguoiDuyet { get; set; }
        public short? Khoa { get; set; }
        public string SoBangGia { get; set; }
    }
    public class BangGiaVCTDetail
    {
        public long  ID { get; set; }
        public int VCTrucID { get; set; }
      
        public string MaNCC { get; set; }
       
        public string MaTuyen { get; set; }
        public int? KhoDuong { get; set; }
        public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
        public string DVT { get; set; }
        public short SoLuong { get; set; }
        public int DonGia { get; set; }
        public string GhiChu { get; set; }
        public DateTime? CreatedDate { get; set; }
        
    }
}
