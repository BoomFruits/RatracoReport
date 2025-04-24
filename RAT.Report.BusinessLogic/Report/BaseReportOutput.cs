using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Mediator;
using RAT.Report.Domain.Entities.DanhMuc;

namespace RAT.Report.BusinessLogic.Report
{
    public abstract class BaseReportOutput<TIn> : BaseReportOutput
        where TIn : IRequest
    {
        public TIn Input { get; private set; }
        public BaseReportOutput(TIn input)
        {
            Input = input;
        }
    }

    public abstract class BaseReportOutput
    {
        public DateTime ReportTime
        {
            get
            {
                return DateTime.Now;
            }
        }
        public DMNhanVien CurrentNhanVien { get; set; }
        public DMDonVi CurrentDonVi { get; set; }
    }
}
