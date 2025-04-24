using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DanhMuc
{
    public class DMLenhTypeEntity
    {
        public int? ID { get; set; }
        public string MaLenh { get; set; }
        public int? LenhType { get; set; }
        public string TenLenh { get; set; }
        public int? LoaiKH { get; set; }
    }
}
