using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.Workflow
{
    public class ProcessEntity
    {
        public short ProcessID { get; set; }
        public byte ProcessType { get; set; }
        public string ProcessName { get; set; }
        //public string ObjectConnectionName { get; set; }
        public string ObjectTableSchema { get; set; }
        public string ObjectTableName { get; set; }
        public string ObjectTableKeyName { get; set; }
        public string ObjectStatusFieldName { get; set; }
        public int? ObjectStatusChoDuyet { get; set; }
        public int? ObjectStatusDongY { get; set; }
        public int? ObjectStatusTuChoi { get; set; }
        public string ObjectDisplayFieldName { get; set; }
        public string LinkPheDuyet { get; set; }
        public string LinkXemChiTiet { get; set; }
    }
}
