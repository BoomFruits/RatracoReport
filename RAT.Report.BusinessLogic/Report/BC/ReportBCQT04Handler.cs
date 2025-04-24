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
    public class ReportBCQT04Handler : BaseReportService<ReportBCQT04Handler>, IService, IReportHandler<ReportBCQT04Input, ReportBCQT04Output>
    {
        public ReportBCQT04Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCQT04Output> Handle(ReportBCQT04Input request)
        {
           
            // ExecuteSP to get data
            var data = await ExecuteSP(request);
            return new ReportBCQT04Output(request)
            {
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBCQT04Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCQT04.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers
                //worksheet.Cells["A1"].UseValue(GetTenCongTyLine1(report.CurrentDonVi));
                //worksheet.Cells["A2"].UseValue(GetTenCongTyLine2(report.CurrentDonVi));

                worksheet.Cells["F1"].UseValue("BÁO CÁO CHI TIẾT DỊCH VỤ NGOÀI VẬN TẢI");
                worksheet.Cells["F2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);

                var beginRow = 8;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();

                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 3)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// fomat number
                string numberRange = string.Format("R{0}:X{1}", beginRow, totalRow);
                worksheet.Cells[numberRange].Style.Numberformat.Format = "#,##0";
                // Model table
                string tableRange = string.Format("A{0}:X{1}", beginRow, totalRow);
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
            cols["B"].UseValue(item.Get("TenDichVu")).UseAlignLeft();
            cols["C"].UseValue(item.Get("KhachHang_Ten")).UseAlignLeft();
            cols["D"].UseValue(item.Get("PhanLoaiXe")).UseAlignCenter();
            cols["E"].UseValue(item.Get("SoHieuXe")).UseAlignCenter();
            cols["F"].UseValue(item.Get("LoaiCont")).UseAlignCenter();
            cols["G"].UseValue(item.Get("SoHieuCont")).UseAlignCenter();
            cols["H"].UseValue(item.Get("TenHang")).UseAlignCenter();
            cols["I"].UseValue(item.Get("TenZoneDong")).UseAlignLeft();
            cols["J"].UseValue(item.Get("TenGaXep")).UseAlignCenter();
            cols["K"].UseValue(item.Get("TenGaDo")).UseAlignCenter();
            cols["L"].UseValue(item.Get("TenZoneTra")).UseAlignLeft();
            cols["M"].UseValue(isTong ? "" : item.Get<DateTime>("NgayNhan").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayNhan").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["N"].UseValue(isTong ? "" : item.Get<DateTime>("NgayXep").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayXep").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["O"].UseValue(isTong ? "" : item.Get<DateTime>("NgayDo").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayDo").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["P"].UseValue(isTong ? "" : item.Get<DateTime>("NgayGiao").Year.ToString().Equals("1")? "" : item.Get<DateTime>("NgayGiao").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["Q"].UseValue(item.Get("DonViTinh")).UseAlignRight();
            cols["R"].UseValue(item.Get("DauXep_SoLuong")).UseAlignRight();
            cols["S"].UseValue(isTong ? "" : item.Get("DauXep_DonGia")).UseAlignRight();
            cols["T"].UseValue(item.Get("DauXep_ThanhTien")).UseAlignRight();
            cols["U"].UseValue(item.Get("DauDo_SoLuong")).UseAlignRight();
            cols["V"].UseValue(isTong ? "" : item.Get("DauDo_DonGia")).UseAlignRight();
            cols["W"].UseValue(item.Get("DauDo_ThanhTien")).UseAlignRight();
            cols["X"].UseValue((item.Get<int>("DauXep_ThanhTien")+item.Get<int>("DauDo_ThanhTien"))).UseAlignRight();
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBCQT04Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCaoQT_BCQT04_ChiTietDichVuNgoaiVT]";
                DynamicParameters param = new DynamicParameters();
                param.Add("TuNgay", input.Ngay_BatDau);
                param.Add("DenNgay", input.Ngay_KetThuc);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBCQT04Input : IRequest<ReportBCQT04Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }
        public string Username { get; set; }

    }
    public class ReportBCQT04Output : BaseReportOutput<ReportBCQT04Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCQT04Output(ReportBCQT04Input input) : base(input)
        {
        }
    }
}
