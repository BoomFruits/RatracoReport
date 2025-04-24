using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.Workflow
{
    public class RequestEntity
    {
        public int ID { get; set; }
        public short ProcessID { get; set; }
        public string RequestBy { get; set; }
        public string RequestEmail { get; set; }
        public string RequestMobile { get; set; }
        public DateTime? RequestTime { get; set; }
        public int RequestObjectID { get; set; }
        public byte KetQuaXuLy { get; set; }
        public DateTime? ApprovedTime { get; set; }
        public string ApprovedBy { get; set; }
        public string ApprovedNote { get; set; }
        public DateTime? RejectedTime { get; set; }
        public string RejectedBy { get; set; }
        public string RejectedNote { get; set; }
    }
}
