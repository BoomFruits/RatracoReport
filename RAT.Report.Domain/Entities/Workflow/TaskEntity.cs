using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.Workflow
{
    public class TaskEntity
    {
        public int ID { get; set; }
        public short ProcessID { get; set; }
        public int ObjectID { get; set; }
        public int RequestID { get; set; }
        public string NguoiTrinh { get; set; }
        public DateTime? ThoiDiemTrinh { get; set; }
        public string CanBoXuLy { get; set; }
        public byte? CapXuLy { get; set; }
        public DateTime? ThoiHanXuLy { get; set; }
        public int PhanQuyenID { get; set; }
        public bool IsUyQuyen { get; set; }
        public int? UyQuyenID { get; set; }
        public int? UyQuyenByTaskID { get; set; }
        public string UyQuyenByCanBo { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public byte TrangThaiThucHien { get; set; }
        public DateTime? ThoiDiemThucHien { get; set; }
        public string NguoiThucHien { get; set; }
        public string GhiChuThucHien { get; set; }
    }
}
