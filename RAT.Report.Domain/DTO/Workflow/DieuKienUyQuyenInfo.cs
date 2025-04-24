using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class DieuKienUyQuyenInfo : DieuKienUyQuyenEntity
    {
        public string ReferenceName { get; set; }
        public string ReferenceLabel { get; set; }
        public byte ReferenceDataType { get; set; }
        public bool ReferenceIsDonVi { get; set; }
    }
}
