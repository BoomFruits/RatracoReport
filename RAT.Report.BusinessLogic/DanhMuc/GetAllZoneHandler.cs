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
    public class GetListZoneHandler : BaseDanhMucHandler<GetListZoneHandler>, IService, IRequestHandler<GetListZoneInput, IEnumerable<ZoneInfo>>
    {
        public GetListZoneHandler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<IEnumerable<ZoneInfo>> Handle(GetListZoneInput request)
        {
            return await DanhMucDAL.GetListZone();
        }
    }
    public class GetListZoneInput : IRequest<IEnumerable<ZoneInfo>>
    {
      
    }
}
