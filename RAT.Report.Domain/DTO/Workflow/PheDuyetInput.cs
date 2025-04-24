using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class PheDuyetInput
    {
       public short processID { get; set; }
       public int objectID { get; set; }
       public int taskID { get; set; }
       public bool isDongY { get; set; }
       public string nguoiThucHien { get; set; }
       public string ghiChuThucHien { get; set; }
    }
}
