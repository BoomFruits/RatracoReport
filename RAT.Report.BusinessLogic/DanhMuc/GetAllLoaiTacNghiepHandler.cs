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
    public class GetListLoaiTacNghiepHandler : BaseDanhMucHandler<GetListLoaiTacNghiepHandler>, IService, IRequestHandler<GetListLoaiTacNghiepInput, IEnumerable<LoaiTacNghiepInfo>>
    {
        public GetListLoaiTacNghiepHandler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<IEnumerable<LoaiTacNghiepInfo>> Handle(GetListLoaiTacNghiepInput request)
        {
            return await DanhMucDAL.GetListLoaiTacNghiep();
        }
    }
    public class GetListLoaiTacNghiepInput : IRequest<IEnumerable<LoaiTacNghiepInfo>>
    {
      
    }
}
