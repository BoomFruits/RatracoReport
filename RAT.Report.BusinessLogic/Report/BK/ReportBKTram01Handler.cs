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
    public class ReportBKTram01Handler : BaseReportService<ReportBKTram01Handler>, IService, IReportHandler<ReportBKTram01Input, ReportBKTram01Output>
    {
        public ReportBKTram01Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBKTram01Output> Handle(ReportBKTram01Input request)
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
            return new ReportBKTram01Output(request)
            {
                //CurrentNhanVien = await CurrentNhanVien(),
                //CurrentDonVi = await CurrentDonVi(),
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBKTram01Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BKTram01.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers
                //worksheet.Cells["A1"].UseValue(GetTenCongTyLine1(report.CurrentDonVi));
                //worksheet.Cells["A2"].UseValue(GetTenCongTyLine2(report.CurrentDonVi));

                //worksheet.Cells["F1"].UseValue("BÁO CÁO TỔNG HỢP NHANH DOANH THU");
                worksheet.Cells["D2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                worksheet.Cells["D3"].UseValue("Đơn vị:{0}", request.TenDV);


                var beginRow = 6;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                //BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();
               
                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 3)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 4)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:K{1}", beginRow, totalRow-1);
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
            
            cols["B"].UseValue(item.Get("KhachHang_Ten")+"("+item.Get("KhachHang_MaKH")+")").UseAlignLeft();
            cols["C"].UseValue(item.Get("TenHang")).UseAlignLeft();
            cols["D"].UseValue(item.Get("TenZoneDong")).UseAlignLeft();
            cols["E"].UseValue(item.Get("TenZoneTra")).UseAlignLeft(); 
            cols["F"].UseValue(item.Get("TenLoaiKH")).UseAlignLeft();
            cols["G"].UseValue(isTong ? "" : item.Get<DateTime>("ThoiGianKH").ToString("dd/MM/yyyy HH:mm")).UseAlignLeft();
            cols["H"].UseValue(item.Get("SoCONT")).UseAlignLeft();
            cols["I"].UseValue(item.Get("TenNhaCC")).UseAlignLeft();
            cols["J"].UseValue(item.Get("SoXeDK")).UseAlignLeft();
            cols["K"].UseValue(item.Get("LoaiCONT")).UseAlignLeft();
          
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBKTram01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[Tram_BangKeXepDo]";
                DynamicParameters param = new DynamicParameters();
                param.Add("NgayBD", input.Ngay_BatDau);
                param.Add("NgayKT", input.Ngay_KetThuc);
                param.Add("LoaiKH", input.LoaiKH);
                param.Add("MaDV", input.MaDV);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBKTram01Input : IRequest<ReportBKTram01Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }     
        public byte? LoaiKH { get; set; }
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public string Username { get; set; }


    }
    public class ReportBKTram01Output : BaseReportOutput<ReportBKTram01Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBKTram01Output(ReportBKTram01Input input) : base(input)
        {
        }
    }
}
