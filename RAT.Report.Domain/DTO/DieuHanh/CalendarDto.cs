using RAT.Report.Domain.Entities.DieuHanh;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc
{

    public class CalendarInput
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }

    public class CalendarOutput
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public List<string> HeaderItem { get; set; }
        public List<List<NgayItem>> Items { get; set; }
    }
}
