using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.CauHinhWFL
{
    public class CapNhatUyQuyenInput
    {
        public int ID { get; set; }
        public int PhanQuyenID { get; set; }
        public string CanBoNhanUyQuyen { get; set; }
        public bool CoDieuKien { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public TimeSpan? Timeout { get; set; }
        public string GhiChu { get; set; }
        public DateTime? ApDungTu { get; set; }
        public DateTime? ApDungDen { get; set; }

        public List<CapNhatDieuKienUyQuyenItem> ListDieuKien { get; set; }
    }
    public class CapNhatDieuKienUyQuyenItem
    {
        public int ID { get; set; }
        public int ReferenceID { get; set; }
        public byte LoaiDieuKien { get; set; }
        public string DienGiai { get; set; }
        public string DKienStringValue { get; set; }
        public bool? DKienBoolValue { get; set; }
        public int? DKienIntValue { get; set; }
        public float? DKienFloatValue { get; set; }
        public decimal? DKienDecimalValue { get; set; }
        public DateTime? DKienDateValue { get; set; }
        public TimeSpan? DKienTimeValue { get; set; }
    }
}
