using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DieuHanh
{
    public class ThuChiPhatSinhEntity
    {
        public long ThuChiID { get; set; }
        public long BookingID { get; set; }
        public long LenhCauID { get; set; }
        public int LoaiThuChi { get; set; }
        public DateTime ThoiGianThucHien { get; set; }
        public string MaNCC { get; set; }
        public string TenNhaCungCap { get; set; }
        public string MaDichVu { get; set; }
        public string TenThuChi { get; set; }
        public string DonViTinh { get; set; }
        public int SoLuong { get; set; }
        public int DonGia { get; set; }
        public long ThanhTien { get; set; }
        public int TrangThai { get; set; }
        public string GhiChu { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }

    }
}
