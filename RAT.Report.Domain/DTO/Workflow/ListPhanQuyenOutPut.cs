using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class ListPhanQuyenOutput
    {
        public int ID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public short ProcessID { get; set; }
        public string CanBoXuLy { get; set; }
        public byte? CapXuLy { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? ApDungTu { get; set; }
        public DateTime? ApDungDen { get; set; }
        public string ChucVu { get; set; }
        public string TenDV { get; set; }
        public string FullName { get; set; }
    }
}
