using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc.Old
{
    public struct DMDonVi
    {
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public string MaGaPA { get; set; }
        public TimeSpan BDCa { get; set; }
        public TimeSpan KTCa { get; set; }
        public string MaDVQL { get; set; }
        public string MaCT { get; set; }
        public string DVQL { get; set; }
        public int CapQL { get; set; }
        public string CodeQL { get; set; }
    }
}
