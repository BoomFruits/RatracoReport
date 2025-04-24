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
    public class ReportBCND03Handler : BaseReportService<ReportBCND03Handler>, IService, IReportHandler<ReportBCND03Input, ReportBCND03Output>
    {
        public ReportBCND03Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCND03Output> Handle(ReportBCND03Input request)
        {
            ReportBCND03Output result = new ReportBCND03Output(request);
           
            var detail = await ExecuteSP(request);
            if(detail!=null && detail.Any())
            {
                var Sum = new ReportBCND03Item();
                Sum.DoanhThu = detail.Sum(x => x.DoanhThu);
                Sum.TongSoBooking = detail.Sum(x => x.TongSoBooking);
                Sum.BookingHoanThanh = detail.Sum(x => x.BookingHoanThanh);
                Sum.BookingHuy = detail.Sum(x => x.BookingHuy);
                Sum.BookingDungHan = detail.Sum(x => x.BookingDungHan);
                Sum.BookingTreHan = detail.Sum(x => x.BookingTreHan);          
                result.Data = detail;
                result.Tong = Sum;
            }
            return result;
        }

        public async Task<byte[]> HandleExcel(ReportBCND03Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCND03.xlsx", (package) =>
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


        public async Task<IEnumerable<ReportBCND03Item>> ExecuteSP(ReportBCND03Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamNoiDia_BCND03_BaoCaoDTByNguoiQuanLy]";
                var x = new
                {
                    input.TuNgay,
                    input.DenNgay,
                    input.GaDongID,
                    input.GaTraID,
                    input.MaLoaiHinhVC,
                    input.Username
                };
                var res= await conn.QuerySpAsync<ReportBCND03Item>(sp, x);
                return res;
            }
        }

    }
    public class ReportBCND03Input : IRequest<ReportBCND03Output>
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }   
        public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
        public string MaLoaiHinhVC { get; set; }   
        public string Username { get; set; }

    }
    public class ReportBCND03Output : BaseReportOutput<ReportBCND03Input>
    {
        public IEnumerable<ReportBCND03Item> Data { get; set; }
        public ReportBCND03Item Tong { get; set; }
        public ReportBCND03Output(ReportBCND03Input input) : base(input)
        {
        }
    }
    public class ReportBCND03Item
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public long? DoanhThu { get; set; }
        public int? TongSoBooking { get; set; }
        public int? BookingHoanThanh { get; set; }
        public int? BookingHuy { get; set; }
        public int? BookingDungHan { get; set; }
        public int? BookingTreHan { get; set; }       
    }
   
}
