using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.Workflow
{
    public class UyQuyenEntity
    {
        public int ID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public int PhanQuyenID { get; set; }
        public string CanBoNhanUyQuyen { get; set; }
        public bool CoDieuKien { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public TimeSpan? Timeout { get; set; }
        public string GhiChu { get; set; }
        public DateTime? ApDungTu { get; set; }
        public DateTime? ApDungDen { get; set; }
    }
}
