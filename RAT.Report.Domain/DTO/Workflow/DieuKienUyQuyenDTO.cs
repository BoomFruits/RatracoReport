using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class DieuKienUyQuyenDTO
    {
        public int UyQuyenID { get; set; }
        public byte LoaiDieuKien { get; set; }
        public int ReferenceID { get; set; }
        public string DienGiai { get; set; }
        public string DKienStringValue { get; set; }
        public bool? DKienBoolValue { get; set; }
        public long? DKienIntValue { get; set; }
        public double? DKienFloatValue { get; set; }
        public decimal? DKienDecimalValue { get; set; }
        public DateTime? DKienDateValue { get; set; }
        public TimeSpan? DKienTimeValue { get; set; }
    }
    public class DKUQandGhiChu: DieuKienUyQuyenEntity
    {
        public string GhiChu { get; set; }
    }
}
