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
    public class GetListLoaiHinhVCHandler : BaseDanhMucHandler<GetListLoaiHinhVCHandler>, IService, IRequestHandler<GetListLoaiHinhVCInput, IEnumerable<LoaiHinhVCInfo>>
    {
        public GetListLoaiHinhVCHandler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<IEnumerable<LoaiHinhVCInfo>> Handle(GetListLoaiHinhVCInput request)
        {
            return await DanhMucDAL.GetListLoaiHinhVC();
        }
    }
    public class GetListLoaiHinhVCInput : IRequest<IEnumerable<LoaiHinhVCInfo>>
    {
      
    }
}
