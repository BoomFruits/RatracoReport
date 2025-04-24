using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Common
{
    public class ResultInt
    {
        public int IsOK { get; set; }
        public string msg { get; set; }
    }
    public class ResultLong
    {
        public long IsOK { get; set; }
        public string msg { get; set; }
        public List<long> listErr { get; set; }
        public List<long> listSucc { get; set; }
    }
}
