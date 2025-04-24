using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Constants
{
    public static class WFL_LoaiDieuKien
    {
        /// <summary>
        /// List dieu kien of data type Boolean
        /// </summary>
        private static readonly byte[] _listDKOfBoolean = new byte[]
        {
            Equal,
            NotEqual
        };

        /// <summary>
        /// List dieu kien of data type Boolean
        /// </summary>
        public static byte[] ListOfBoolean
        {
            get
            {
                return _listDKOfBoolean;
            }
        }

        /// <summary>
        /// List dieu kien of data type Numeric
        /// </summary>
        private static readonly byte[] _listDKOfNumeric = new byte[]
        {
            Equal,
            NotEqual,
            LessThan,
            LessThanOrEqual,
            GreaterThan,
            GreaterThanOrEqual
        };

        /// <summary>
        /// List dieu kien of data type Numeric
        /// </summary>
        public static byte[] ListOfNumeric
        {
            get
            {
                return _listDKOfNumeric;
            }
        }

        /// <summary>
        /// List dieu kien of data type DateTime
        /// </summary>
        private static readonly byte[] _listDKOfDateTime = new byte[]
        {
            Equal,
            NotEqual,
            LessThan,
            LessThanOrEqual,
            GreaterThan,
            GreaterThanOrEqual
        };

        /// <summary>
        /// List dieu kien of data type DateTime
        /// </summary>
        public static byte[] ListOfDateTime
        {
            get
            {
                return _listDKOfDateTime;
            }
        }

        /// <summary>
        /// List dieu kien of data type String
        /// </summary>
        private static readonly byte[] _listDKOfString = new byte[]
        {
            Equal,
            NotEqual,
            Contains,
            NotContains,
            StartsWith,
            NotStartsWith,
            EndsWith,
            NotEndsWith
        };

        /// <summary>
        /// List dieu kien of data type String
        /// </summary>
        public static byte[] ListOfString
        {
            get
            {
                return _listDKOfString;
            }
        }

        /// <summary>
        /// List dieu kien of data type DonVi
        /// </summary>
        private static readonly byte[] _listDKOfDonVi = new byte[]
        {
            Equal,
            NotEqual,
            StartsWith,
            NotStartsWith
        };

        /// <summary>
        /// List dieu kien of data type DonVi
        /// </summary>
        public static byte[] ListOfDonVi
        {
            get
            {
                return _listDKOfDonVi;
            }
        }

        /// <summary>
        /// 1: Equal
        /// </summary>
        public static byte Equal
        {
            get
            {
                return (byte)ConfigValue.Equal.GetHashCode();
            }
        }

        /// <summary>
        /// 2: NotEqual
        /// </summary>
        public static byte NotEqual
        {
            get
            {
                return (byte)ConfigValue.NotEqual.GetHashCode();
            }
        }

        /// <summary>
        /// 3: LessThan
        /// </summary>
        public static byte LessThan
        {
            get
            {
                return (byte)ConfigValue.LessThan.GetHashCode();
            }
        }

        /// <summary>
        /// 4: LessThanOrEqual
        /// </summary>
        public static byte LessThanOrEqual
        {
            get
            {
                return (byte)ConfigValue.LessThanOrEqual.GetHashCode();
            }
        }

        /// <summary>
        /// 5: GreaterThan
        /// </summary>
        public static byte GreaterThan
        {
            get
            {
                return (byte)ConfigValue.GreaterThan.GetHashCode();
            }
        }

        /// <summary>
        /// 6: GreaterThanOrEqual
        /// </summary>
        public static byte GreaterThanOrEqual
        {
            get
            {
                return (byte)ConfigValue.GreaterThanOrEqual.GetHashCode();
            }
        }

        /// <summary>
        /// 11: Contains
        /// </summary>
        public static byte Contains
        {
            get
            {
                return (byte)ConfigValue.Contains.GetHashCode();
            }
        }

        /// <summary>
        /// 12: NotContains
        /// </summary>
        public static byte NotContains
        {
            get
            {
                return (byte)ConfigValue.NotContains.GetHashCode();
            }
        }

        /// <summary>
        /// 13: StartsWith
        /// </summary>
        public static byte StartsWith
        {
            get
            {
                return (byte)ConfigValue.StartsWith.GetHashCode();
            }
        }

        /// <summary>
        /// 14: NotStartsWith
        /// </summary>
        public static byte NotStartsWith
        {
            get
            {
                return (byte)ConfigValue.NotStartsWith.GetHashCode();
            }
        }

        /// <summary>
        /// 15: EndsWith
        /// </summary>
        public static byte EndsWith
        {
            get
            {
                return (byte)ConfigValue.EndsWith.GetHashCode();
            }
        }
        /// <summary>
        /// 16: NotEndsWith
        /// </summary>
        public static byte NotEndsWith
        {
            get
            {
                return (byte)ConfigValue.NotEndsWith.GetHashCode();
            }
        }

        public static bool IsValidDieuKienBoolean(byte loaiDieuKien)
        {
            return ListOfBoolean.Contains(loaiDieuKien);
        }

        public static bool IsValidDieuKienNumeric(byte loaiDieuKien)
        {
            return ListOfNumeric.Contains(loaiDieuKien);
        }

        public static bool IsValidDieuKienDateTime(byte loaiDieuKien)
        {
            return ListOfDateTime.Contains(loaiDieuKien);
        }

        public static bool IsValidDieuKienString(byte loaiDieuKien)
        {
            return ListOfString.Contains(loaiDieuKien);
        }

        public static bool IsValidDieuKienDonVi(byte loaiDieuKien)
        {
            return ListOfDonVi.Contains(loaiDieuKien);
        }
        
        /*
        /// <summary>
        /// Check is valid dieu kien for special data type
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="loaiDieuKien"></param>
        /// <returns></returns>
        public static bool IsValid(byte dataType, byte loaiDieuKien)
        {
            if (dataType == WFL_RefDataType.Boolean)
            {
                return ListOfBoolean.Contains(loaiDieuKien);
            }
            else if (dataType == WFL_RefDataType.Interger
                || dataType == WFL_RefDataType.Float
                || dataType == WFL_RefDataType.Decimal)
            {
                return ListOfNumeric.Contains(loaiDieuKien);
            }
            else if (dataType == WFL_RefDataType.Date
                || dataType == WFL_RefDataType.DateTime
                || dataType == WFL_RefDataType.Decimal)
            {
                return ListOfDateTime.Contains(loaiDieuKien);
            }
            else if (dataType == WFL_RefDataType.String)
            {
                return ListOfString.Contains(loaiDieuKien);
            }
            else if (dataType == WFL_RefDataType.DonVi)
            {
                return ListOfDonVi.Contains(loaiDieuKien);
            }
            return false;
        }
        */
        
        /// <summary>
        /// Enum config
        /// </summary>
        private enum ConfigValue
        {
            Equal = 1,
            NotEqual = 2,
            LessThan = 3,
            LessThanOrEqual = 4,
            GreaterThan = 5,
            GreaterThanOrEqual = 6,
            Contains = 11,
            NotContains = 12,
            StartsWith = 13,
            NotStartsWith = 14,
            EndsWith = 15,
            NotEndsWith = 16,
        }
    }
}
