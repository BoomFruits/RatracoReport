using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DanhMuc
{
    public class DMLoaiHinhVC
    {
        public string MaLoaiHinhVC { get; set; }
        public string TenLoaiHinhVC { get; set; }
        public short? IsActive { get; set; }
        public short? LoaiHinh { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
