using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class ObjectTableDTO
    {
        public string ColumnName;
        public string DataType;
    }
    public class TaskInfo : TaskEntity
    {
        public string FullName { get; set; }
        public string ChucVu { get; set; }
    }
}
