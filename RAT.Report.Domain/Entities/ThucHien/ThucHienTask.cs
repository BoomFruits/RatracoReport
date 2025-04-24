using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.ThucHien
{
    public class ThucHienTask
    {
        public long? TaskID { get; set; }
        public long? KHVCID { get; set; }    
        public string DonViTinh { get; set; }
        public short? SoLuong { get; set; }
        public decimal? SoLuongTC { get; set; }
        public int? DonGiaCau { get; set; }
        public int? DonGiaXDK { get; set; }
        public string MaNCC { get; set; }
        public string MaLenh { get; set; }
        public int? GaTNID { get; set; }
        public DateTime? ThoiGianTN { get; set; }
        public short? TrangThai { get; set; }
        public short? IsTraDong { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public string ModifyBy { get; set; }
        public string MaDV { get; set; }
     
    }
    public class ThucHienLenhDetail
    {

        /// <summary>
        /// ID lệnh cẩu
        /// </summary>
        public long? LenhCauID { get; set; }
        /// <summary>
        /// 1-Đóng hàng, 2 vc đường tàu ratraco, 21-vc đường biển, 22-vc đường sắt dùng tàu sài gòn or hà nội
        /// </summary>
        public int? LoaiKH { get; set; }
        public string MaLenh { get; set; }
        /// <summary>
        /// Thời gian tác nghiệp kế hoạch
        /// </summary>
        public DateTime? ThoiGianTN { get; set; }
        public int? GaTNID { get; set; }
        /// <summary>
        /// 1-rong, 4-nang
        /// </summary>
        public int? TrangThaiTV { get; set; }
        /// <summary>
        /// 1-dong y, 2-tu choi
        /// </summary>
        public int? IsXacNhan { get; set; }

        public long? TaskID { get; set; }

        public long? KHVCID { get; set; }
        public long? BookingID { get; set; }
        public string MaNCC { get; set; }
        public string SoXeCau { get; set; }
        public string SoHieuXe { get; set; }
        public string SoCont { get; set; }
        public string SoXeDK { get; set; }
        public string SoXeDK2 { get; set; }
        /// <summary>
        /// 1- khoi tao, 2-Hoan Thanh, 3-huy
        /// </summary>
        public int? TrangThai { get; set; }
        public DateTime? ThoiGianBD { get; set; }
        public DateTime? ThoiGianKT { get; set; }
        public int? DonGia { get; set; }
        public int? SoLuong { get; set; }
        public decimal? TanTT { get; set; }
        public int? DonGiaCau { get; set; }
        public int? DonGiaXDK { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        /// <summary>
        /// 1-Đánh dấu kết hợp hạ bãi và đóng hàng luôn.
        /// </summary>
        public int? IsTraDong { get; set; }
    }

}
