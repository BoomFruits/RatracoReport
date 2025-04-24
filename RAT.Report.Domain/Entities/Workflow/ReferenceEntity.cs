using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.Workflow
{
    public class ReferenceEntity
    {
        public int ID { get; set; }
        public short ProcessID { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public byte DataType { get; set; }
        public string Control { get; set; }
        public string GhiChu { get; set; }
    }
}
