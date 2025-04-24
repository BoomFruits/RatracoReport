using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc
{
    public class GetTimeServerOutput
    {
        public DateTime TimeServer { get; set; }
    }
    public class DonViItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
        public int CapQL { get; set; }
        public string DVQL { get; set; }
        public string CodeQL { get; set; }
        public string MaDVQL { get; set; }
        public string MaCT { get; set; }
        public bool Disabled { get; set; }
        public int LoaiDV { get; set; }
        public int IsActive { get; set; }
        public string IsActiveText { get; set; }
    }
    public class DonViInput
    {
        public string MaDV { get; set; }
        public string DVQL { get; set; }
    }

}
