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
    public class ReportBCQLX02Handler : BaseReportService<ReportBCQLX02Handler>, IService, IReportHandler<ReportBCQLX02Input, ReportBCQLX02Output>
    {
        public ReportBCQLX02Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCQLX02Output> Handle(ReportBCQLX02Input request)
        {
           
            // ExecuteSP to get data
            var data = await ExecuteSP(request);
            return new ReportBCQLX02Output(request)
            {
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBCQLX02Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCQLX02.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers
                //worksheet.Cells["A1"].UseValue(GetTenCongTyLine1(report.CurrentDonVi));
                //worksheet.Cells["A2"].UseValue(GetTenCongTyLine2(report.CurrentDonVi));

                worksheet.Cells["F1"].UseValue("BÁO CÁO SỬA CHỮA TOA XE");
                worksheet.Cells["F2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);

                var beginRow = 7;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();

                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 3)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                //// fomat number
                string numberRange = string.Format("H{0}:H{1}", beginRow, totalRow);
                string number1Range = string.Format("J{0}:J{1}", beginRow, totalRow);
                string number2Range = string.Format("K{0}:K{1}", beginRow, totalRow);
                worksheet.Cells[numberRange].Style.Numberformat.Format = "#,##0";
                worksheet.Cells[number1Range].Style.Numberformat.Format = "#,##0";
                worksheet.Cells[number2Range].Style.Numberformat.Format = "#,##0";
                // Model table
                string tableRange = string.Format("A{0}:N{1}", beginRow, totalRow);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }
        private void BinOneRowExcelItem(ExcelRow cols, ReportObject item, int index)
        {
            BinOneRowExcel(cols, item, index, false);
        }
        private void BinOneRowExcel(ExcelRow cols, ReportObject item, int index, bool isTong)
        {
            cols["A"].UseValue(isTong ? "Tổng" : (index + 1) + "").UseAlignCenter().UseFontBold(isTong);
            cols["B"].UseValue(item.Get("SoHieuXe")).UseAlignCenter();
            cols["C"].UseValue(item.Get("PhanLoaiXe")).UseAlignCenter();
            cols["D"].UseValue(item.Get("TenNCC")).UseAlignLeft();
            cols["E"].UseValue(isTong ? "" : item.Get<DateTime>("NgayVaoXuong").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayVaoXuong").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["F"].UseValue(isTong ? "" : item.Get<DateTime>("NgayRaXuong").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayRaXuong").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["G"].UseValue(item.Get("TuTrinhSuaChua")).UseAlignLeft();
            cols["H"].UseValue(item.Get("Dongia")).UseAlignRight();
            cols["I"].UseValue(item.Get("NgoaiTuTrinh_ChiTiet")).UseAlignLeft();
            cols["J"].UseValue(item.Get("NgoaiTuTrinh_Dongia")).UseAlignRight();
            cols["K"].UseValue(item.Get("TienSauThue")).UseAlignRight();
            cols["L"].UseValue(item.Get("SoHoaDon")).UseAlignCenter();
            cols["M"].UseValue(isTong ? "" : item.Get<DateTime>("NgayHoaDon").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayHoaDon").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["N"].UseValue(item.Get("NgayDung")).UseAlignCenter();
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBCQLX02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCao_BCQLX02]";
                DynamicParameters param = new DynamicParameters();
                param.Add("TuNgay", input.Ngay_BatDau);
                param.Add("DenNgay", input.Ngay_KetThuc);
                param.Add("MaXuong", input.MaXuong);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBCQLX02Input : IRequest<ReportBCQLX02Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }
        public string MaXuong { get; set; }
        public string Username { get; set; }

    }
    public class ReportBCQLX02Output : BaseReportOutput<ReportBCQLX02Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCQLX02Output(ReportBCQLX02Input input) : base(input)
        {
        }
    }
}
