using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.PAVC
{
    public class PAVCTemplate
    {
        public int? PAVCTempID { get; set; }
        public string SoPAVCTemp { get; set; }
        public short? LoaiPAVC { get; set; }
	    public short? HinhThucVC { get; set; }
	    public string TenPAVC { get; set; }
	    public string MaDV { get; set; }
	    public string CreatedBy { get; set; }
	    public DateTime? CreatedDate { get; set; }
	    public string ModifiedBy { get; set; }
	    public DateTime? ModifiedDate { get; set; }
	    public string GhiChu { get; set; }
	    public short? TrangThai { get; set; }
        public IEnumerable<PAVCTemplate_Detail> detail { get; set; }
    }
    public class PAVCTemplate_Detail
    {
      public long? ID { get; set; }
      public long? PAVCTempID { get; set; }
      public string MaDichVu { get; set; } 
	  public string  TenChiPhi { get; set; }
      public short?	LoaiChiPhi { get; set; }
      public string DonViTinh { get; set; }
	  public short?  SoLuong { get; set; }
	  public string  GhiChu { get; set; }
      public short? IsTaiGa { get; set; }
    }
}
