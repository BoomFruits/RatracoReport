using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RAT.Report.Domain.Entities.DanhMuc;

namespace RAT.Report.Domain.DTO.DanhMuc
{
    public class DonViInfo : DMDonVi
    {
        public string TenDVQL { get; set; }
        public string TenDVText { get; set; }
    }
}
