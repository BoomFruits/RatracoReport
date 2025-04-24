using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    class ReferenceDTO
    {
    }
    public class AddReferenceInput
    {
        public int ID { get; set; }
        public short ProcessID { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public byte DataType { get; set; }
        public bool IsDonVi { get; set; }
        public string Control { get; set; }
        public string GhiChu { get; set; }
    }
}
