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
    public class ReportBCLV02Handler : BaseReportService<ReportBCLV02Handler>, IService, IReportHandler<ReportBCLV02Input, ReportBCLV02Output>
    {
        public ReportBCLV02Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCLV02Output> Handle(ReportBCLV02Input request)
        {
            ReportBCLV02Output result = new ReportBCLV02Output(request);
           
            var detail1 = await ExecuteSP(request);
            var detail2 = await ExecuteSP2(request);
            var detail3 = await ExecuteSP3(request);
            if (detail1!=null && detail1.Any())
            {
                for (var i = 0; i < detail1.Count();i++)
                {
                    var item = detail1.ElementAt(i);
                    item.TongDoanhThu = item.DoanhThuCont + item.DoanhThuToa;
                }
                result.Data_Xuat = detail1;
            }
            if (detail2 != null && detail2.Any())
            {
                for (var i = 0; i < detail2.Count(); i++)
                {
                    var item = detail2.ElementAt(i);
                    item.TongDoanhThu = item.DoanhThuCont + item.DoanhThuToa;
                }
                result.Data_Nhap = detail2;
            }
            if (detail3 != null && detail3.Any())
            {
                for (var i = 0; i < detail3.Count(); i++)
                {
                    var item = detail3.ElementAt(i);
                    item.TongDoanhThu = item.DoanhThuCont + item.DoanhThuToa;
                }
                result.Data_Khac = detail3;
            }
            return result;
        }

        public async Task<byte[]> HandleExcel(ReportBCLV02Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCLV02.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["C2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.TuNgay, request.DenNgay);
                var indexRow = 6;
                var count = 1;
                foreach (var item in report.Data_Xuat)
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


        public async Task<IEnumerable<ReportBCLV02Item>> ExecuteSP(ReportBCLV02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamLVQT_BCLV02_BaoCaoSLDT_Xuat]";
                var x = new
                {
                    input.TuNgay,
                    input.DenNgay,
                    input.GaDongID,
                    input.GaTraID,
                    input.MaKH,
                    input.Username
                };
                var res= await conn.QuerySpAsync<ReportBCLV02Item>(sp, x);
                return res;
            }
        }
        public async Task<IEnumerable<ReportBCLV02Item>> ExecuteSP2(ReportBCLV02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamLVQT_BCLV02_BaoCaoSLDT_Nhap]";
                var x = new
                {
                    input.TuNgay,
                    input.DenNgay,
                    input.GaDongID,
                    input.GaTraID,
                    input.MaKH,
                    input.Username
                };
                var res = await conn.QuerySpAsync<ReportBCLV02Item>(sp, x);
                return res;
            }
        }
        public async Task<IEnumerable<ReportBCLV02Item>> ExecuteSP3(ReportBCLV02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamLVQT_BCLV02_BaoCaoSLDT_Khac]";
                var x = new
                {
                    input.TuNgay,
                    input.DenNgay,
                    input.GaDongID,
                    input.GaTraID,
                    input.MaKH,
                    input.Username
                };
                var res = await conn.QuerySpAsync<ReportBCLV02Item>(sp, x);
                return res;
            }
        }

    }
    public class ReportBCLV02Input : IRequest<ReportBCLV02Output>
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }   
        public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
        public string MaKH { get; set; }   
        public string Username { get; set; }

    }
    public class ReportBCLV02Output : BaseReportOutput<ReportBCLV02Input>
    {
        public IEnumerable<ReportBCLV02Item> Data_Xuat { get; set; }
        public IEnumerable<ReportBCLV02Item> Data_Nhap { get; set; }
        public IEnumerable<ReportBCLV02Item> Data_Khac { get; set; }
        public ReportBCLV02Output(ReportBCLV02Input input) : base(input)
        {
        }
    }
    public class ReportBCLV02Item
    {
        public string ChiTieu { get; set; }
        public int SLCont20 { get; set; }
        public long TienCont20 { get; set; }
        public int SLCont40 { get; set; }
        public long TienCont40 { get; set; }
        public int SLContRF { get; set; }
        public long TienContRF { get; set; }
        public int SanLuongCont { get; set; }
        public long DoanhThuCont { get; set; }
        public int SanLuongToa { get; set; }
        public long DoanhThuToa { get; set; }
        public long TongDoanhThu { get; set; }
    }
   
}
