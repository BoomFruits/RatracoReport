using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DieuHanh
{
    public class Booking
    {
        public long? BookingID { get; set; }
        public long? YCVCID { get; set; }
        public long? PLHDID { get; set; }
        public string SoBooking { get; set; }
        public string MaHangTCT { get; set; }
        public string MaHangRAT { get; set; }
        public string TenHang { get; set; }
        public string ChiDanHangHoa { get; set; }
        public string LoaiBaoBi { get; set; }
        public short? SoKien { get; set; }
        public string DonViTinh { get; set; }
        public double? SoLuong { get; set; }
        public double? TanTT { get; set; }
        public double? TanTC { get; set; }
        public string NguoiApTai_Ten { get; set; }
        public string NguoiApTai_Phone { get; set; }
        public string NguoiApTai_CMT { get; set; }
        public string SoHieuCont { get; set; }
        public string VienNPCONT { get; set; }
        public string SoHieuXe { get; set; }
        public string VienNP { get; set; }
        public int? DonGia { get; set; }
        public int? ThanhTien { get; set; }
        public string GhiChu { get; set; }
        public byte? TrangThai { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
  
}
