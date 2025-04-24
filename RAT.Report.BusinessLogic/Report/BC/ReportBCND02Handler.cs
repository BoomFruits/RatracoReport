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
    public class ReportBCND02Handler : BaseReportService<ReportBCND02Handler>, IService, IReportHandler<ReportBCND02Input, ReportBCND02Output>
    {
        public ReportBCND02Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCND02Output> Handle(ReportBCND02Input request)
        {
            ReportBCND02Output result = new ReportBCND02Output(request);
           
            var detail = await ExecuteSP(request);
            if(detail!=null && detail.Any())
            {
                var Sum = new ReportBCND02Item();
                Sum.ToaG = 0;
                Sum.ToaNr = 0;
                Sum.ToaP = 0;
                Sum.Cont = 0;
                Sum.ContRF = 0;
                Sum.Tank = 0;
                Sum.TienCuoc = 0;
                Sum.TienPhatSinh = 0;
                Sum.TongDoanhThu = 0;
                for (var i = 0; i < detail.Count();i++)
                {
                    var item = detail.ElementAt(i);
                    item.TongDoanhThu = item.TienCuoc + item.TienPhatSinh;
                    Sum.ToaG += item.ToaG;
                    Sum.ToaNr += item.ToaNr;
                    Sum.ToaP += item.ToaP;
                    Sum.Cont += item.Cont;
                    Sum.ContRF += item.ContRF;
                    Sum.Tank += item.Tank;
                    Sum.TienCuoc += item.TienCuoc;
                    Sum.TienPhatSinh += item.TienPhatSinh;
                    Sum.TongDoanhThu += item.TongDoanhThu;
                }
                result.Data = detail;
                result.Tong = Sum;
            }
            return result;
        }

        public async Task<byte[]> HandleExcel(ReportBCND02Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCND02.xlsx", (package) =>
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


        public async Task<IEnumerable<ReportBCND02Item>> ExecuteSP(ReportBCND02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamNoiDia_BCND02_BaoCaoSLDTByKhachHang]";
                var x = new
                {
                    input.TuNgay,
                    input.DenNgay,
                    input.GaDongID,
                    input.GaTraID,
                    input.MaKH,
                    input.Username
                };
                var res= await conn.QuerySpAsync<ReportBCND02Item>(sp, x);
                return res;
            }
        }

    }
    public class ReportBCND02Input : IRequest<ReportBCND02Output>
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }   
        public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
        public string MaKH { get; set; }   
        public string Username { get; set; }

    }
    public class ReportBCND02Output : BaseReportOutput<ReportBCND02Input>
    {
        public IEnumerable<ReportBCND02Item> Data { get; set; }
        public ReportBCND02Item Tong { get; set; }
        public ReportBCND02Output(ReportBCND02Input input) : base(input)
        {
        }
    }
    public class ReportBCND02Item
    {
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_Ten { get; set; }
        public int? ToaG { get; set; }
        public int? ToaP { get; set; }
        public int? ToaNr { get; set; }
        public int? ContRF { get; set; }
        public int? Tank { get; set; }
        public int? Cont { get; set; }
        public long? TienCuoc { get; set; }
        public long? TienPhatSinh { get; set; }
        public long? TongDoanhThu { get; set; }
    }
   
}
