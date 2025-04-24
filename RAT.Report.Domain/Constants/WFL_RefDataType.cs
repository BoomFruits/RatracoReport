using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Constants
{
    public static class WFL_RefDataType
    {
        /// <summary>
        /// 1: Boolean (bit)
        /// </summary>
        public static byte Boolean
        {
            get
            {
                return (byte)ConfigValue.Boolean.GetHashCode();
            }
        }

        /// <summary>
        /// 2: Interger (tinyint, smallint, int, bigint), 
        /// </summary>
        public static byte Interger
        {
            get
            {
                return (byte)ConfigValue.Interger.GetHashCode();
            }
        }

        /// <summary>
        /// 3: Float
        /// </summary>
        public static byte Float
        {
            get
            {
                return (byte)ConfigValue.Float.GetHashCode();
            }
        }

        /// <summary>
        /// 4: Decimal
        /// </summary>
        public static byte Decimal
        {
            get
            {
                return (byte)ConfigValue.Decimal.GetHashCode();
            }
        }

        /// <summary>
        /// 5: Date
        /// </summary>
        public static byte Date
        {
            get
            {
                return (byte)ConfigValue.Date.GetHashCode();
            }
        }

        /// <summary>
        /// 6: DateTime
        /// </summary>
        public static byte DateTime
        {
            get
            {
                return (byte)ConfigValue.DateTime.GetHashCode();
            }
        }

        /// <summary>
        /// 7: Time
        /// </summary>
        public static byte Time
        {
            get
            {
                return (byte)ConfigValue.Time.GetHashCode();
            }
        }

        /// <summary>
        /// 9: String
        /// </summary>
        public static byte String
        {
            get
            {
                return (byte)ConfigValue.String.GetHashCode();
            }
        }

        /// <summary>
        /// Enum config
        /// </summary>
        private enum ConfigValue
        {
            Boolean = 1,
            Interger = 2,
            Float = 3,
            Decimal = 4,
            Date = 5,
            DateTime = 6,
            Time = 7,
            String = 9
        }
    }
}
