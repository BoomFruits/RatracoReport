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
    public class ReportBKTTVTND01Handler : BaseReportService<ReportBKTTVTND01Handler>, IService, IReportHandler<ReportBKTTVTND01Input, ReportBKTTVTND01Output>
    {
        public ReportBKTTVTND01Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBKTTVTND01Output> Handle(ReportBKTTVTND01Input request)
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
            return new ReportBKTTVTND01Output(request)
            {
                //CurrentNhanVien = await CurrentNhanVien(),
                //CurrentDonVi = await CurrentDonVi(),
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBKTTVTND01Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BKTTVTND01.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers
                //worksheet.Cells["A1"].UseValue(GetTenCongTyLine1(report.CurrentDonVi));
                //worksheet.Cells["A2"].UseValue(GetTenCongTyLine2(report.CurrentDonVi));

                //worksheet.Cells["F1"].UseValue("BÁO CÁO TỔNG HỢP NHANH DOANH THU");
                worksheet.Cells["D2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
               


                var beginRow = 6;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();
                //tinhthue
                worksheet.Cells[string.Format("A{0}", totalRow + 1)].UseValue("Thuế VAT").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("P{0}", totalRow + 1)].UseValue((new ReportObject(report.Tong).Get<long>("TongTien"))*report.Input.MucThue).UseAlignRight();
                worksheet.Cells[string.Format("A{0}", totalRow + 2)].UseValue("Tổng cộng tiền sau thuế").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("P{0}", totalRow + 2)].UseValue((new ReportObject(report.Tong).Get<long>("TongTien")) * (report.Input.MucThue + 1)).UseAlignRight();
                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 3)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 4)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:Q{1}", beginRow, totalRow+2);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }
        private void BinOneRowExcelItem(ExcelRow cols, ReportObject item, int index)
        {
            BinOneRowExcel(cols, item, index, false);
        }
        private void BinOneRowExcel(ExcelRow cols, ReportObject item, int index, bool isTong)
        {
            cols["A"].UseValue(isTong ? "Tổng cộng" : (index+1)+"").UseAlignCenter().UseFontBold(isTong); 
            cols["B"].UseValue(isTong ? "":item.Get<DateTime>("NgayXepKH").ToString("dd/MM/yyyy")).UseAlignLeft();
            cols["C"].UseValue(item.Get("PhanLoaiXe")).UseAlignLeft();
            cols["D"].UseValue(item.Get("SoHieuXe")).UseAlignLeft();
            cols["E"].UseValue(item.Get("SoCont")).UseAlignLeft();
            cols["F"].UseValue(item.Get("MaLoaiHinhVC")).UseAlignLeft(); 
            cols["G"].UseValue(item.Get("TenHang")).UseAlignLeft(); 
            cols["H"].UseValue(isTong ? "" : item.Get("TrongLuong")).UseAlignLeft(); 
            cols["I"].UseValue(isTong ? "":((string.IsNullOrEmpty(item.Get<string>("TenKhoDong")) ?"" : (item.Get("TenKhoDong") + " / ")) + item.Get("TenGaDong"))).UseAlignLeft();
            cols["J"].UseValue(isTong ? "":((string.IsNullOrEmpty(item.Get<string>("TenKhoTra")) ? "" : (item.Get("TenKhoTra") + " / ")) + item.Get("TenGaTra"))).UseAlignLeft();
            cols["K"].UseValue(item.Get("DonViTinh")).UseAlignCenter(); 

            cols["L"].UseValue(isTong ? "" : item.Get("DonGia")).UseAlignRight(); 
            cols["M"].UseValue(isTong ? "" : item.Get("ThanhTien")).UseAlignRight(); 
            cols["N"].UseValue(isTong ? "" : item.Get("PhuPhiLuuXe")).UseAlignRight();
            cols["O"].UseValue(isTong ? "" : item.Get("PhuPhiContLanh")).UseAlignRight();
            cols["P"].UseValue(item.Get("TongTien")).UseAlignRight(); 
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBKTTVTND01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BangKe_BKTTVTND01]";
                DynamicParameters param = new DynamicParameters();
                param.Add("NgayBD", input.Ngay_BatDau);
                param.Add("NgayKT", input.Ngay_KetThuc);
                param.Add("MaKH", input.MaKH);
                param.Add("MaZoneDi", input.MaZoneDi);
                param.Add("MaZoneDen", input.MaZoneDen);
                param.Add("MaGaDi", input.MaGaDi);
                param.Add("MaGaDen", input.MaGaDen);
                param.Add("MacTau", input.MacTau);
                param.Add("SoHieuXe", input.SoHieuXe);
                param.Add("MaHang", input.MaHang);
                param.Add("DonViTinh", input.DonViTinh);

                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBKTTVTND01Input : IRequest<ReportBKTTVTND01Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }     
        public decimal MucThue { get; set; }
        public string MaKH { get; set; }
        public string MaZoneDi { get; set; }
        public string MaZoneDen { get; set; }
        public string MaGaDi { get; set; }
        public string MaGaDen { get; set; }
        public string MacTau { get; set; }
        public string SoHieuXe { get; set; }
        public string MaHang { get; set; }
        public string DonViTinh { get; set; }


    }
    public class ReportBKTTVTND01Output : BaseReportOutput<ReportBKTTVTND01Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBKTTVTND01Output(ReportBKTTVTND01Input input) : base(input)
        {
        }
    }
}
