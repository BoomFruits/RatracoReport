using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Caching
{
    public class CacheData<T>
    {
        public DateTime? CachedTime { get; set; }
        public T Data { get; set; }
    }
}
