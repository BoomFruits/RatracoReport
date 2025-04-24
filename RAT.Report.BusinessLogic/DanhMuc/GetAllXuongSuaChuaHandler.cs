using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Data;
using TLS.Lib.Net.Mediator;
using TLS.Lib.Net.Service;
using RAT.Report.BusinessLogic.Actions;
using RAT.Report.BusinessLogic.Handlers;
using RAT.Report.DataAccess;
using RAT.Report.DataAccess.DAL;
using RAT.Report.Domain.DTO.DanhMuc;
using RAT.Report.Domain.Entities.DanhMuc;

namespace RAT.Report.BusinessLogic.DanhMuc
{
    public class GetListXuongSuaChuaHandler : BaseDanhMucHandler<GetListXuongSuaChuaHandler>, IService, IRequestHandler<GetListXuongSuaChuaInput, IEnumerable<XuongSuaChuaInfo>>
    {
        public GetListXuongSuaChuaHandler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<IEnumerable<XuongSuaChuaInfo>> Handle(GetListXuongSuaChuaInput request)
        {
            return await DanhMucDAL.GetListXuongSuaChua();
        }
    }
    public class GetListXuongSuaChuaInput : IRequest<IEnumerable<XuongSuaChuaInfo>>
    {
      
    }
}
