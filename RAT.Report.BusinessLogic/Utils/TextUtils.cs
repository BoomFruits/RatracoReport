using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace RAT.Report.BusinessLogic.Utils
{
    public static class TextUtils
    {
        public static string GenDummyString(int maxSize = 8)
        {
            string str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; // Lazy: Cả hoa lẫn thường để ưu tiên chữ cái
            char[] chars = new char[str.Length];
            chars = str.ToCharArray();
            int size = maxSize;
            byte[] data = new byte[1];
            RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider();
            crypto.GetNonZeroBytes(data);
            size = maxSize;
            data = new byte[size];
            crypto.GetNonZeroBytes(data);

            StringBuilder result = new StringBuilder(size);
            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length - 1)]);
            }
            return result.ToString().ToUpper();
        }

        public static string FillParams(this string strFormat, object param)
        {
            if (!string.IsNullOrEmpty(strFormat) && param != null)
            {
                var dic = new Dictionary<string, object>();
                foreach (var property in param.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.GetProperty))
                {
                    dic.Add(property.Name.ToUpper(), property.GetValue(param));
                }
                return Regex.Replace(strFormat, @"\{([a-zA-Z0-9_]+)\}", m =>
                {
                    if (dic.ContainsKey(m.Groups[1].Value.ToUpper()))
                    {
                        var value = dic[m.Groups[1].Value.ToUpper()];
                        return value != null ? value.ToString() : string.Empty;
                    }
                    return m.Value;
                });
            }
            return strFormat;
        }
    }
}
