using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Constants
{
    public static class WFL_KetQuaXuLy
    {
        /// <summary>
        /// Đang trình duyệt (0)
        /// </summary>
        public static byte TrinhDuyet
        {
            get
            {
                return (byte)ConfigValue.TrinhDuyet.GetHashCode();
            }
        }

        /// <summary>
        /// Đồng ý phê duyệt (1)
        /// </summary>
        public static byte DongYDuyet
        {
            get
            {
                return (byte)ConfigValue.DongYDuyet.GetHashCode();
            }
        }

        /// <summary>
        /// Từ chối phê duyệt (2)
        /// </summary>
        public static byte TuChoiDuyet
        {
            get
            {
                return (byte)ConfigValue.TuChoiDuyet.GetHashCode();
            }
        }
        
        /// <summary>
        /// Enum config
        /// </summary>
        private enum ConfigValue
        {
            TrinhDuyet = 0,
            DongYDuyet = 1,
            TuChoiDuyet = 2
        }
    }
}
