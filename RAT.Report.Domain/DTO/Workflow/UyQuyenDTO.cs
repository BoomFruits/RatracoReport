using RAT.Report.Domain.DTO.CauHinhWFL;
using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class UyQuyenOutput : UyQuyenEntity
    {
       public string FullName { get; set; }
       public string TenDV { get; set; }
       public string ChucVu { get; set; }
       public short referenceID { get; set; }
        public List<DKUQandGhiChu> ListDieuKien { get; set; }
    }
    //public class CapNhatuyQuyenInput
    //{

    //    public int PhanQuyenID { get; set; }
    //    public string CanBoNhanUyQuyen { get; set; }
    //    public bool CoDieuKien { get; set; }
    //    public string Email { get; set; }
    //    public string PhoneNumber { get; set; }
    //    public TimeSpan? Timeout { get; set; }
    //    public string GhiChu { get; set; }
    //    public DateTime? ApDungTu { get; set; }
    //    public DateTime? ApDungDen { get; set; }
    //}
}
