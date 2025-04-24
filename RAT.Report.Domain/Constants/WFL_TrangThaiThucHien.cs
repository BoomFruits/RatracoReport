using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Constants
{
    public static class WFL_TrangThaiThucHien
    {
        /// <summary>
        /// Chưa thực hiện (0)
        /// </summary>
        public static byte ChuaThucHien
        {
            get
            {
                return (byte)ConfigValue.ChuaThucHien.GetHashCode();
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
        /// Bỏ qua (9)
        /// </summary>
        public static byte BoQua
        {
            get
            {
                return (byte)ConfigValue.BoQua.GetHashCode();
            }
        }

        /// <summary>
        /// Enum config
        /// </summary>
        private enum ConfigValue
        {
            ChuaThucHien = 0,
            DongYDuyet = 1,
            TuChoiDuyet = 2,
            BoQua = 9
        }
    }
}
