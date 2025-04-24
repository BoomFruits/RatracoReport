using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Constants
{
    public static class WFL_Process
    {
        /// <summary>
        /// Phương án vận chuyển mẫu
        /// </summary>
        public static short PhuongAnVCMau
        {
            get
            {
                return (short)ConfigValue.PhuongAnVCMau.GetHashCode();
            }
        }
       
        public static short PhuongAnVC
        {
            get
            {
                return (short)ConfigValue.PhuongAnVC.GetHashCode();
            }
        }
       
        /// <summary>
        /// Bảng giá vận chuyển trục
        /// </summary>
        public static short BangGiaVCTruc
        {
            get
            {
                return (short)ConfigValue.BangGiaVCTruc.GetHashCode();
            }
        }
        public static short BaoGiaVC
        {
            get
            {
                return (short)ConfigValue.BaoGiaVC.GetHashCode();
            }
        }
        /// <summary>
        /// Enum config
        /// </summary>
        private enum ConfigValue
        {
            PhuongAnVCMau = 2,
            BangGiaVCTruc = 3,
            PhuongAnVC = 4,
            BaoGiaVC=5
        }
    }
}
