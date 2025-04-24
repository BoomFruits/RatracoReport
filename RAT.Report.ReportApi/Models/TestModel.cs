using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RAT.Report.ReportApi.Models
{
    public class TestModel
    {
        [JsonProperty("ID")]
        public short Key { get; set; }
    }
}