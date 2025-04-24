using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Mediator;

namespace RAT.Report.BusinessLogic.Report
{
    public interface IReportHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        Task<byte[]> HandleExcel(TRequest request);
    }
}
