using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.BusinessLogic.Report
{
    public class ReportObject : Dictionary<string, object>
    {
        private Dictionary<string, string> Map = new Dictionary<string, string>();
        public ReportObject()
        {

        }
        public ReportObject(object values)
        {
            var dic = values as IDictionary<string, object>;
            if (dic != null)
            {
                foreach (var item in dic)
                {
                    Add(item.Key, item.Value);
                    Map.Add(item.Key.ToUpper(), item.Key);
                }
            }
        }

        public object Get(string key)
        {
            // Check
            if (string.IsNullOrEmpty(key))
            {
                throw new ArgumentNullException(nameof(key));
            }

            // Get value
            if (ContainsKey(key))
            {
                return this[key];
            }
            else if (Map.ContainsKey(key.ToUpper()) && ContainsKey(Map[key.ToUpper()]))
            {
                return this[Map[key.ToUpper()]];
            }
            return null;
        }
        public T Get<T>(string key)
        {
            var value = Get(key);
            if (value != null)
            {
                return (T)Convert.ChangeType(value, typeof(T));
            }
            return default(T);
        }
    }
}
