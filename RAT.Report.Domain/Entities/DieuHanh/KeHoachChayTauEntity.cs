using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DieuHanh
{
    public class KeHoachChayTauEntity
    {
       public long? TauID { get; set; }
       public string MacTau { get; set; }
       public string MacTauText { get; set; }
       public int? MacTauValue { get; set; }
       public DateTime? NgayXP { get; set; }
       public int? GaLTID { get; set; }
       public string TenGaLT { get; set; }
       public int? GaGTID { get; set; }
        public string TenGaGT { get; set; }
        public DateTime? CreatedDate { get; set; }
       public string CreatedBy { get; set; }
       public IEnumerable<KeHoachChayTau_TNTau> TNTauItems { get; set; }
    }
    public class KeHoachChayTau_TNTau
    {
        public long? TNTauID { get; set; }
        public long? TauID { get; set; }
        public DateTime? GioDen { get; set; }
        public int? GaTNID { get; set; }
        public string TenGaTN { get; set; }
        public DateTime? GioDi { get; set; }
       
        public string PhanLoaiXe { get; set; }
        public int? SoLuongXe { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public IEnumerable<KeHoachChayTau_TNTau_TPTau> TPTauItems { get; set; }
    }
    public class KeHoachChayTau_TNTau_TPTau
    {
        public long? ID { get; set; }
        public long? TauID { get; set; }
        public string PhanLoaiXe { get; set; }
        public int? SoLuongXe { get; set; }

    }
}
