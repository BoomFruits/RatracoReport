using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;
using TLS.Lib.Net.Json;

namespace RAT.Report.Service.Email
{
    public abstract class RatracoBaseEmailService<T> : BaseService<T> where T : BaseService, IService
    {
        public string RatracoWebClient
        {
            get
            {
                return ConfigurationManager.AppSettings["RatracoWebClient"];
            }
        }

        public bool IsValidEmailAddress(string emailAddress)
        {
            var invalid = false;
            if (string.IsNullOrEmpty(emailAddress))
            {
                return false;
            }

            // Use IdnMapping class to convert Unicode domain names.
            emailAddress = Regex.Replace(emailAddress, @"(@)(.+)$", (Match match) => {
                // IdnMapping class with default property values.
                var idn = new IdnMapping();

                string domainName = match.Groups[2].Value;
                try
                {
                    domainName = idn.GetAscii(domainName);
                }
                catch (ArgumentException)
                {
                    invalid = true;
                }
                return match.Groups[1].Value + domainName;
            });

            // Use Regex to validate
            if (!invalid)
            {
                // Return true if strIn is in valid e-mail format.
                return Regex.IsMatch(emailAddress,
                       @"^(?("")(""[^""]+?""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                       @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9]{2,17}))$",
                       RegexOptions.IgnoreCase);
            }
            return false;
        }

        public string ParametersToString(Dictionary<string, object> parameters)
        {
            var str = new StringBuilder();
            foreach(var param in parameters)
            {
                if (param.Value != null)
                {
                    if (param.Value.GetType() == typeof(DateTime))
                    {
                        str.AppendFormat("{0}:{1}", str, ((DateTime)param.Value).ToString("yyyy-MM-dd HH:mm:ss"));
                    }
                    else if (param.Value.GetType().IsValueType)
                    {
                        str.AppendFormat("{0}:{1}", str, param.Value);
                    }
                    else
                    {
                        str.AppendFormat("{0}:{1}", str, param.Value.SerializeObject());
                    }
                }
                else
                {
                    str.AppendFormat("{0}:null", str);
                }
            }
            return null;
        }
    }
}
