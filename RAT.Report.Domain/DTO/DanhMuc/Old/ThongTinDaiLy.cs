using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc.Old
{
    public struct ThongTinDaiLy
    {
        public int DaiLyID { get; set; }
        public string MaDV { get; set; }
        public string MaSoDaiLy { get; set; }
        public string TenDaiLy { get; set; }
        public string DiaChiKD { get; set; }
        public string DiaChiLienHe { get; set; }
        public string MaSoThue { get; set; }
        public string SoDienThoai { get; set; }
        public string Email { get; set; }
        public string MaSoDangKyKD { get; set; }
        public int CapDaiLy { get; set; }
        public int SoLuongGiuVe { get; set; }
        public int SoLuongBanVe { get; set; }

        public int ThoiGianGiuVe { get; set; }
        public decimal HanMucTinDung { get; set; }
        public int Status { get; set; }
        public DateTime NgayTao { get; set; }
        public string NguoiTao { get; set; }
        public DateTime NgayCapNhat { get; set; }
        public string NguoiCapNhat { get; set; }
        public decimal HanMucKhaDung { get; set; }
        public string TenTrangThai { get; set; }
        public string DonViQuanLy { get; set; }

        public int ParentID { get; set; }
        public decimal SoTienDatCoc { get; set; }
        public int SoVeDangGiu { get; set; }
        public List<int> PhuongThucIDs { get; set; }

        public bool DuocBanTapThe { get; set; }

        public short DiaDiemDaiLyID { get; set; }
    }
}
