using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class TrinhDuyetInput
    {
        public short processID { get; set; }
        public int objectID { get; set; }
        public string nguoiTrinhDuyet { get; set; }
    }
}
