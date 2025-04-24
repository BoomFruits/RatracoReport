using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class TaskCanBoOutput
    {
        public string CanBoXuLy { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string ChucVu { get; set; }
        public string MaDv { get; set; }
        public int RequestID { get; set; }
        public string ProcessName { get; set; }
        public int TrangThaiThucHien { get; set; }
        public DateTime ThoiDiemThucHien { get; set; }
        public string LinkPheDuyet { get; set; }
        public string LinkXemChiTiet { get; set; }
        public int ObjectID { get; set; }
    }
}
