using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Excel;
using TLS.Lib.Net.Data;
using TLS.Lib.Net.Mediator;
using TLS.Lib.Net.Service;
using RAT.Report.DataAccess;
using RAT.Report.DataAccess.DAL;
using RAT.Report.Domain.Entities.DanhMuc;
using RAT.Report.BusinessLogic.Handlers;


namespace RAT.Report.BusinessLogic.Report.BC
{
    public class ReportBCND04Handler : BaseReportService<ReportBCND04Handler>, IService, IReportHandler<ReportBCND04Input, ReportBCND04Output>
    {
        public ReportBCND04Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCND04Output> Handle(ReportBCND04Input request)
        {
            ReportBCND04Output result = new ReportBCND04Output(request);
           
            var detail = await ExecuteSP(request);
            if(detail!=null && detail.Any())
            {
                var Sum = new ReportBCND04Item();
                Sum.ThucHienT1 = detail.Sum(x => x.ThucHienT1);
                Sum.ThucHienT2 = detail.Sum(x => x.ThucHienT2);
                Sum.ThucHienT3 = detail.Sum(x => x.ThucHienT3);
                Sum.ThucHienT4 = detail.Sum(x => x.ThucHienT4);
                Sum.ThucHienT5 = detail.Sum(x => x.ThucHienT5);
                Sum.ThucHienT6 = detail.Sum(x => x.ThucHienT6);          
                Sum.ThucHienT7 = detail.Sum(x => x.ThucHienT7);
                Sum.ThucHienT8 = detail.Sum(x => x.ThucHienT8);
                Sum.ThucHienT9 = detail.Sum(x => x.ThucHienT9);
                Sum.ThucHienT10 = detail.Sum(x => x.ThucHienT10);
                Sum.ThucHienT11 = detail.Sum(x => x.ThucHienT11);
                Sum.ThucHienT12 = detail.Sum(x => x.ThucHienT12);
                Sum.LuyKe = detail.Sum(x => x.LuyKe);
                result.Data = detail;
                result.Tong = Sum;
            }
            return result;
        }

        public async Task<byte[]> HandleExcel(ReportBCND04Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCND04.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["C2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.TuNgay, request.DenNgay);
                var indexRow = 6;
                var count = 1;
                foreach (var item in report.Data)
                {
                    //worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(count);
                    //worksheet.Cells[string.Format("B{0}:B{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(item.TenTuyen);

                    //worksheet.BindList(item.Items, indexRow, (cols, d, index) =>
                    //{
                      

                    //});
                    //indexRow = indexRow + item.Items.Count();
                    //count++;
                }



                // Ghi chu
                worksheet.Cells[string.Format("A{0}", indexRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", indexRow + 2)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", DateTime.Now).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:E{1}", 6, indexRow - 1);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }


        public async Task<IEnumerable<ReportBCND04Item>> ExecuteSP(ReportBCND04Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamNoiDia_BCND04_BaoCaoSLKhachHangByDate]";
                var x = new
                {
                    input.TuNgay,
                    input.DenNgay,
                    input.GaDongID,
                    input.GaTraID,
                    input.MaKH,
                    input.Username
                };
                var res= await conn.QuerySpAsync<ReportBCND04Item>(sp, x);
                return res;
            }
        }

    }
    public class ReportBCND04Input : IRequest<ReportBCND04Output>
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }   
        public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
        public string MaKH { get; set; }   
        public string Username { get; set; }

    }
    public class ReportBCND04Output : BaseReportOutput<ReportBCND04Input>
    {
        public IEnumerable<ReportBCND04Item> Data { get; set; }
        public ReportBCND04Item Tong { get; set; }
        public ReportBCND04Output(ReportBCND04Input input) : base(input)
        {
        }
    }
    public class ReportBCND04Item
    {
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_Ten { get; set; }
        public int? ThucHienT1 { get; set; }
        public int? ThucHienT2 { get; set; }
        public int? ThucHienT3 { get; set; }
        public int? ThucHienT4 { get; set; }
        public int? ThucHienT5 { get; set; }
        public int? ThucHienT6 { get; set; }       
        public int? ThucHienT7 { get; set; }
        public int? ThucHienT8 { get; set; }
        public int? ThucHienT9 { get; set; }
        public int? ThucHienT10 { get; set; }
        public int? ThucHienT11 { get; set; }
        public int? ThucHienT12 { get; set; }
        public int? LuyKe { get; set; }
    }

}
