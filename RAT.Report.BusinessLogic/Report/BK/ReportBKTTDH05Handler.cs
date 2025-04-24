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
    public class ReportBKTTDH05Handler : BaseReportService<ReportBKTTDH05Handler>, IService, IReportHandler<ReportBKTTDH05Input, ReportBKTTDH05Output>
    {
        public ReportBKTTDH05Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBKTTDH05Output> Handle(ReportBKTTDH05Input request)
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
            return new ReportBKTTDH05Output(request)
            {
                //CurrentNhanVien = await CurrentNhanVien(),
                //CurrentDonVi = await CurrentDonVi(),
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBKTTDH05Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BKTTDH05.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers
                //worksheet.Cells["A1"].UseValue(GetTenCongTyLine1(report.CurrentDonVi));
                //worksheet.Cells["A2"].UseValue(GetTenCongTyLine2(report.CurrentDonVi));

                //worksheet.Cells["F1"].UseValue("BÁO CÁO TỔNG HỢP NHANH DOANH THU");
                worksheet.Cells["C2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                worksheet.Cells["C3"].UseValue("Loại dịch vụ:{0}, Nhà cung cấp:{1}",report.Data.Any()?report.Data.FirstOrDefault()["TenDichVu"]:"",request.TenNCC);

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
                string tableRange = string.Format("A{0}:I{1}", beginRow, totalRow);
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
            cols["C"].UseValue(item.Get("TenZoneTT")).UseAlignLeft();
            cols["D"].UseValue(item.Get("SoBooking")).UseAlignLeft();
            cols["E"].UseValue(item.Get("TenHang")).UseAlignLeft();
            cols["F"].UseValue(item.Get("DonViTinh")).UseAlignLeft(); 
            cols["G"].UseValue(item.Get("DonGia")).UseAlignRight(); 
            cols["H"].UseValue(item.Get("SoLuong")).UseAlignRight(); 
            cols["I"].UseValue(item.Get("ThanhTien")).UseAlignRight();
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBKTTDH05Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BangKe_BKTTDH05]";
                DynamicParameters param = new DynamicParameters();
                param.Add("NgayBD", input.Ngay_BatDau);
                param.Add("NgayKT", input.Ngay_KetThuc);
                param.Add("MaDichVu", input.MaDichVu);
                param.Add("MaNCC", input.MaNCC);

                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBKTTDH05Input : IRequest<ReportBKTTDH05Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }    
        public string MaDichVu { get; set; }
        public string MaNCC { get; set; }
        public string TenNCC { get; set; }

    }
    public class ReportBKTTDH05Output : BaseReportOutput<ReportBKTTDH05Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBKTTDH05Output(ReportBKTTDH05Input input) : base(input)
        {
        }
    }
}
