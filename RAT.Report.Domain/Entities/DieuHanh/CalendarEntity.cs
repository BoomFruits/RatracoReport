using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DieuHanh
{
    public class NgayItem
    {
        public string Thu { get; set; }
        public int? Ngay { get; set; }
        public DateTime? NgayDate { get; set; }
        public bool IsSelected { get; set; }
        public bool IsAllowed { get; set; }
    }
    public class RowItem
    {
        public List<NgayItem> Items { get; set; }
    }
    public class ThuItem
    {
        public string Thu { get; set; }
        public List<NgayItem> Items { get; set; }
    }
}
