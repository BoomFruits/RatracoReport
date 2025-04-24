using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Constants
{
    public static class HinhThucVCContant
    {
        /// <summary>
        /// Phương án vận chuyển mẫu
        /// </summary>
        public static short KhoKho
        {
            get
            {
                return (short)eHinhThucVC.KhoKho.GetHashCode();
            }
        }
        public static short GaGa
        {
            get
            {
                return (short)eHinhThucVC.GaGa.GetHashCode();
            }
        }

        public static short KhoGa
        {
            get
            {
                return (short)eHinhThucVC.KhoGa.GetHashCode();
            }
        }
        public static short GaKho
        {
            get
            {
                return (short)eHinhThucVC.GaKho.GetHashCode();
            }
        }
        /// <summary>
        /// Enum config
        /// </summary>
        private enum eHinhThucVC
        {
            KhoKho = 1,
            GaGa = 2,
            KhoGa = 3,
            GaKho = 4
        }
    }
    public static class LoaiChiPhiContant
    {
        public static short DauXep
        {
            get
            {
                return (short)eLoaiChiphi.DauXep.GetHashCode();
            }
        }
        public static short VanChuyenTruc
        {
            get
            {
                return (short)eLoaiChiphi.VanChuyenTruc.GetHashCode();
            }
        }
        public static short ChiPhiKhac
        {
            get
            {
                return (short)eLoaiChiphi.ChiPhiKhac.GetHashCode();
            }
        }
        public static short DauDo
        {
            get
            {
                return (short)eLoaiChiphi.DauDo.GetHashCode();
            }
        }
        public enum eLoaiChiphi
        {
            DauXep = 1,
            VanChuyenTruc = 2,
            DauDo = 3,
            ChiPhiKhac = 4
        }
    }
}
