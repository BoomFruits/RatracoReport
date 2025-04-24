using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DieuHanh
{
    public class TaskEntity
    {
        public long? KDVCID { get; set; }
        public long? TaskID { get; set; }
        public string DonViTinh { get; set; }
        public decimal? SoLuong { get; set; }
        public short? LoaiTask { get; set; }
        public int? GaTNID { get; set; }
        public DateTime? ThoiGianTN { get; set; }
        public int? TrangThai { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string MaDV { get; set; }
    }
    public class LenhCauEntity
    {
        public long? LenhCauID { get; set; }
        public long? TaskID { get; set; }
        public int? GaTNID { get; set; }
        public DateTime? ThoiGianTN { get; set; } 
        public string SoCont { get; set; }
        public string SoXeDK { get; set; }
        public string SoHieuXe { get; set; }
        public string SoXeCau { get; set; }
        public int? TrangThai { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string MaDV { get; set; }
    }
}
