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

namespace RAT.Report.BusinessLogic.Report.BK
{
    public class ReportBKTTDH04Handler : BaseReportService<ReportBKTTDH04Handler>, IService, IReportHandler<ReportBKTTDH04Input, ReportBKTTDH04Output>
    {
        public ReportBKTTDH04Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBKTTDH04Output> Handle(ReportBKTTDH04Input request)
        {
            //// Process don vi
            //if (!string.IsNullOrEmpty(request.MaDV))
            //{
            //    var donVi = await DanhMucDAL.GetOneDonVi(request.MaDV);
            //    if (donVi != null)
            //    {
            //        request.TenDV = donVi.TenDV;
            //    }
            //}

            // ExecuteSP to get data
            var data = await ExecuteSP(request);
            return new ReportBKTTDH04Output(request)
            {
                //CurrentNhanVien = await CurrentNhanVien(),
                //CurrentDonVi = await CurrentDonVi(),
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBKTTDH04Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BKTTDH04.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers
                //worksheet.Cells["A1"].UseValue(GetTenCongTyLine1(report.CurrentDonVi));
                //worksheet.Cells["A2"].UseValue(GetTenCongTyLine2(report.CurrentDonVi));

                //worksheet.Cells["F1"].UseValue("BÁO CÁO TỔNG HỢP NHANH DOANH THU");
                worksheet.Cells["C2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                worksheet.Cells["C3"].UseValue("Nhà cung cấp:{0}", request.TenNCC);


                var beginRow = 6;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();

                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 3)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:K{1}", beginRow, totalRow);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }
        private void BinOneRowExcelItem(ExcelRow cols, ReportObject item, int index)
        {
            BinOneRowExcel(cols, item, index, false);
        }
        private void BinOneRowExcel(ExcelRow cols, ReportObject item, int index, bool isTong)
        {
            cols["A"].UseValue(isTong ? "Tổng" : (index+1)+"").UseAlignCenter().UseFontBold(isTong); 
            cols["B"].UseValue(isTong ? "":item.Get<DateTime>("TGThucHien").ToString("dd/MM/yyyy HH:mm")).UseAlignLeft();
            cols["C"].UseValue(item.Get("TenZoneDi")).UseAlignLeft();
            cols["D"].UseValue(item.Get("TenZoneDen")).UseAlignLeft();
            cols["E"].UseValue(item.Get("MacTau")).UseAlignLeft();
            cols["F"].UseValue(item.Get("SoBooking")).UseAlignLeft(); 
            cols["G"].UseValue(item.Get("SoCont")).UseAlignLeft(); 
            cols["H"].UseValue(item.Get("LoaiCont")).UseAlignLeft(); 
            cols["I"].UseValue(item.Get("TenHang")).UseAlignLeft();
            cols["J"].UseValue(isTong ? "" : item.Get("TrongLuong")).UseAlignRight(); 
            cols["K"].UseValue(item.Get("ThanhTien")).UseAlignRight(); 
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBKTTDH04Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BangKe_BKTTDH04]";
                DynamicParameters param = new DynamicParameters();
                param.Add("NgayBD", input.Ngay_BatDau);
                param.Add("NgayKT", input.Ngay_KetThuc);
                param.Add("MaNCC", input.MaNCC);
                param.Add("MaZoneDi", input.MaZoneDi);
                param.Add("MaZoneDen", input.MaZoneDen);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBKTTDH04Input : IRequest<ReportBKTTDH04Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }
        public string MaNCC { get; set; }
        public string TenNCC { get; set; }
        public string MaZoneDi { get; set; }
        public string MaZoneDen { get; set; }
        public string TeZoneDi { get; set; }
        public string TenZoneDen { get; set; }

    }
    public class ReportBKTTDH04Output : BaseReportOutput<ReportBKTTDH04Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBKTTDH04Output(ReportBKTTDH04Input input) : base(input)
        {
        }
    }
}
