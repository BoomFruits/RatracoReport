using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc
{
    public class TreeView
    {
        [JsonProperty("code")]
        public string Code { get; set; }
        [JsonProperty("label")]
        public string Label { get; set; }
        [JsonProperty("type")]
        public int? Type { get; set; }
        [JsonProperty("children")]
        public IEnumerable<TreeView> Children { get; set; }
    }
}
