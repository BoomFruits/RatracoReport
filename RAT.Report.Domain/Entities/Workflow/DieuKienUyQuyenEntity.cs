using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.Workflow
{
    public class DieuKienUyQuyenEntity
    {
        public int ID { get; set; }
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
}
