using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class CanBoPheDuyet
    {
        public PhanQuyenEntity NguoiPhanQuyen { get; private set; }
        public bool HasUyQuyen { get; private set; }
        public UyQuyenEntity NguoiUyQuyen { get; private set; }
        public CanBoPheDuyet(PhanQuyenEntity nguoiPhanQuyen, bool hasUyQuyen = false)
        {
            // Throw if null of parameter nguoiPhanQuyen
            if (nguoiPhanQuyen == null) throw new ArgumentNullException(nameof(nguoiPhanQuyen));

            NguoiPhanQuyen = nguoiPhanQuyen;
            HasUyQuyen = hasUyQuyen;
        }
        public CanBoPheDuyet(PhanQuyenEntity nguoiPhanQuyen, UyQuyenEntity nguoiUyQuyen)
        {
            // Throw if null of parameter nguoiPhanQuyen
            if (nguoiPhanQuyen == null) throw new ArgumentNullException(nameof(nguoiPhanQuyen));

            // Throw if null of parameter nguoiUyQuyen
            if (nguoiUyQuyen == null) throw new ArgumentNullException(nameof(nguoiUyQuyen));

            NguoiPhanQuyen = nguoiPhanQuyen;
            NguoiUyQuyen = nguoiUyQuyen;
            HasUyQuyen = true;
        }
    }
}
