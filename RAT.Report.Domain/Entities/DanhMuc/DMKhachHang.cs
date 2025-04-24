using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DanhMuc
{
    public class DMKhachHang
    {
        public long? CustomerID { get; set; }
        public string MaKH { get; set; }
        public string MST { get; set; }
        public string Keyword { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string LienHe { get; set; }
        public string TaiKhoanNH { get; set; }
        public string NHPhatHanh { get; set; }
        public string NguoiDaiDien { get; set; }
        public string NguoiDaiDien_Tel { get; set; }
        public byte? LoaiKH { get; set; }
        public int? LevelKH { get; set; }
        public string Nhom { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int? IsActive { get; set; }

    }
}
