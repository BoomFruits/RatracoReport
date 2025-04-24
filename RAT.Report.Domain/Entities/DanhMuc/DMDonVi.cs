using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DanhMuc
{
    public class DMDonVi
    {
        public string MaCT { get; set; }
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public string MaDVQL { get; set; }
        public string DVQL { get; set; }
        public string CodeQL { get; set; }
        public byte? CapQL { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public byte? LoaiDV { get; set; }
        public byte? IsActive { get; set; }
    }
}
