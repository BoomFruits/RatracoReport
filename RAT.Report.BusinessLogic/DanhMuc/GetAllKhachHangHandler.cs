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
    public class GetListKhachHangHandler : BaseDanhMucHandler<GetListKhachHangHandler>, IService, IRequestHandler<GetListKhachHangInput, IEnumerable<KhachHangInfo>>
    {
        public GetListKhachHangHandler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<IEnumerable<KhachHangInfo>> Handle(GetListKhachHangInput request)
        {
            return await DanhMucDAL.GetListKhachHang();
        }
    }
    public class GetListKhachHangInput : IRequest<IEnumerable<KhachHangInfo>>
    {
      
    }
}
