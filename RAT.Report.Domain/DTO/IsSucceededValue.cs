using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO
{
    public class IsSucceededValue
    {
        public bool IsSucceeded { get; set; }
        public string Message { get; set; }
        public IsSucceededValue() : this(false)
        {

        }
        public IsSucceededValue(bool isSucceeded, string message = null)
        {
            IsSucceeded = isSucceeded;
            Message = message;
        }
        public static IsSucceededValue Success(string message = null)
        {
            return new IsSucceededValue(true, message);
        }
        public static IsSucceededValue Success(string format, object arg0)
        {
            return new IsSucceededValue(true, string.Format(format, arg0));
        }

        public static IsSucceededValue Success(string format, params object[] args)
        {
            return new IsSucceededValue(true, string.Format(format, args));
        }

        public static IsSucceededValue Success(string format, object arg0, object arg1)
        {
            return new IsSucceededValue(true, string.Format(format, arg0, arg1));
        }

        public static IsSucceededValue Success(IFormatProvider provider, string format, params object[] args)
        {
            return new IsSucceededValue(true, string.Format(provider, format, args));
        }

        public static IsSucceededValue Success(string format, object arg0, object arg1, object arg2)
        {
            return new IsSucceededValue(true, string.Format(format, arg0, arg1, arg2));
        }
        public static IsSucceededValue Success(string format, object arg0, object arg1, object arg2, object arg3)
        {
            return new IsSucceededValue(true, string.Format(format, arg0, arg1, arg2, arg3));
        }
        public static IsSucceededValue Success(string format, object arg0, object arg1, object arg2, object arg3, object arg4)
        {
            return new IsSucceededValue(true, string.Format(format, arg0, arg1, arg2, arg3, arg4));
        }
        public static IsSucceededValue Failure(string message = null)
        {
            return new IsSucceededValue(false, message);
        }
        public static IsSucceededValue Failure(string format, object arg0)
        {
            return new IsSucceededValue(false, string.Format(format, arg0));
        }

        public static IsSucceededValue Failure(string format, params object[] args)
        {
            return new IsSucceededValue(false, string.Format(format, args));
        }

        public static IsSucceededValue Failure(string format, object arg0, object arg1)
        {
            return new IsSucceededValue(false, string.Format(format, arg0, arg1));
        }

        public static IsSucceededValue Failure(IFormatProvider provider, string format, params object[] args)
        {
            return new IsSucceededValue(false, string.Format(provider, format, args));
        }

        public static IsSucceededValue Failure(string format, object arg0, object arg1, object arg2)
        {
            return new IsSucceededValue(false, string.Format(format, arg0, arg1, arg2));
        }
        public static IsSucceededValue Failure(string format, object arg0, object arg1, object arg2, object arg3)
        {
            return new IsSucceededValue(false, string.Format(format, arg0, arg1, arg2, arg3));
        }
        public static IsSucceededValue Failure(string format, object arg0, object arg1, object arg2, object arg3, object arg4)
        {
            return new IsSucceededValue(false, string.Format(format, arg0, arg1, arg2, arg3, arg4));
        }
    }
}
