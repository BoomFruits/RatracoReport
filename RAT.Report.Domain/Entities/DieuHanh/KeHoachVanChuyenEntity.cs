using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DieuHanh
{
    public class KeHoachVanChuyenEntity
    {
        public long? KHVCID { get; set; }
        public long? YCVCID { get; set; }
        public long? TauID { get; set; }
        public short? LoaiKH { get; set; }
        public short? KieuYCVC { get; set; }
        public string MaTuyen { get; set; }
        public string MacTau { get; set; }
        public string NgayXP { get; set; }
        public string DonViTinh { get; set; }
        /// <summary>
        /// So luong ke hoach 
        /// </summary>
        public int? SoLuong { get; set; }
        /// <summary>
        /// So luong da thuc hien thanh cong
        /// </summary>
        public int? SoLuongDa { get; set; }
        /// <summary>
        /// So luong dang thuc hien chua thanh cong
        /// </summary>
        public int? SoLuongDang { get; set; }
        public DateTime? ThoiGianDi { get; set; }
        public DateTime? ThoiGianDen { get; set; }
        public int? GaDiID { get; set; }
        public int? GaDenID { get; set; }
        public short? TrangThai { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public string ModifyBy { get; set; }
        public string MaDV { get; set; }
        public long? OldKHVCID { get; set; }
        public long? OldSoLuong { get; set; }
    }
    
}
