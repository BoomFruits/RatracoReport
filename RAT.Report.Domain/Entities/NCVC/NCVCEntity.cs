using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.NCVC
{
    public class NCVCEntity
    {
        public long NCVCID { get; set; }
        public string SoNCVC { get; set; }
        public short LoaiNCVC { get; set; }
        public int PLHDID { get; set; }
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_MST { get; set; }
        public string KhachHang_Ten { get; set; }
        public string KhachHang_DaiDien { get; set; }
        public string KhachHang_DiaChi { get; set; }
        public string KhachHang_Phone { get; set; }
        public string KhachHang_Mail { get; set; }
        public string MaHangTCT { get; set; }
        public string MaHangRAT { get; set; }
        public string TenHang { get; set; }
        public string ChiDanHangHoa { get; set; }
        public string DonViTinh { get; set; }
        public int SoLuong { get; set; }
        public int DonGia { get; set; }
        public int TongTien { get; set; }
        public DateTime ThoiGianDong { get; set; }
        public DateTime ThoiGianTra { get; set; }
        public short HinhThucVC { get; set; }
        public short PhuongThucGN { get; set; }
        public long TinhDongID { get; set; }
        public long QuanDongID { get; set; }
        public long PhuongDongID { get; set; }
        public long GaDongID { get; set; }
        public long TinhTraID { get; set; }
        public long QuanTraID { get; set; }
        public long PhuongTraID { get; set; }
        public int GaTraID { get; set; }
        public int GaLVQTID { get; set; }
        public string GhiChu { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public short TrangThai { get; set; }
        public string NguoiLienHeDH_Ten { get; set; }
        public string NguoiLienHeDH_Phone { get; set; }
        public string DiaChiDongHang { get; set; }
        public string NguoiLienHeTH_Ten { get; set; }
        public string NguoiLienHeTH_Phone { get; set; }
        public string DiaChiTraHang { get; set; }
        public int KhuCNDongID { get; set; }
        public int KhuCNTraID { get; set; }
        public string MaKhuCNDong { get; set; }
        public string MaKhuCNTra { get; set; }
        public int DiemDongID { get; set; }
        public int DiemTraID { get; set; }
    }
}
