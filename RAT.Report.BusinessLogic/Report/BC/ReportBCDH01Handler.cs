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
    public class ReportBCDH01Handler : BaseReportService<ReportBCDH01Handler>, IService, IReportHandler<ReportBCDH01Input, ReportBCDH01Output>
    {
        public ReportBCDH01Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCDH01Output> Handle(ReportBCDH01Input request)
        {
            // ExecuteSP to get data
            if (string.IsNullOrEmpty(request.Loai))
            {
                var data = await ExecuteSP(request);
               
                return new ReportBCDH01Output(request)
                {
                    Data = data,
                    Tong = Sum(data)
                };
            }
            else
            {
                var data = await ExecuteSP2(request);
                return new ReportBCDH01Output(request)
                {
                    Data = data,
                    Tong = Sum(data)
                };
            }
           
            
        }

        public async Task<byte[]> HandleExcel(ReportBCDH01Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCDH01.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["F2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                var beginRow = 6;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                //BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();

                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 2)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:J{1}", beginRow, totalRow-1);
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
            cols["B"].UseValue(item.Get("TenDV")).UseAlignLeft();
            cols["C"].UseValue(isTong ? "": item.Get<DateTime>("ThoiGianKT").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["D"].UseValue(item.Get("LoaiCONT")).UseAlignCenter();
          
            cols["E"].UseValue(item.Get<string>("Bai2Bai") == null ? 0 : item.Get("Bai2Bai")).UseAlignCenter(); 
            cols["F"].UseValue(item.Get<string>("Bai2DK") == null ? 0 : item.Get("Bai2DK")).UseAlignCenter(); 
            cols["G"].UseValue(item.Get<string>("Bai2TX") == null ? 0 : item.Get("Bai2TX")).UseAlignCenter();
            cols["H"].UseValue(item.Get<string>("DK2TX") == null ? 0 : item.Get("DK2TX")).UseAlignCenter(); 
            cols["I"].UseValue(item.Get<string>("DK2DK") ==null? 0 : item.Get("DK2DK")).UseAlignCenter(); 
            cols["J"].UseValue(item.Get<string>("TX2TX") == null ? 0 : item.Get("TX2TX")).UseAlignCenter(); 
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBCDH01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamDH_BCDH01_TinhHinhVanDungCont]";
                DynamicParameters param = new DynamicParameters();
                param.Add("TuNgay", input.Ngay_BatDau);
                param.Add("DenNgay", input.Ngay_KetThuc);
                param.Add("MaNCC", input.MaNCC);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
        public async Task<IEnumerable<ReportObject>> ExecuteSP2(ReportBCDH01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamDH_BCDH01_TinhHinhVanDungCont_Detail]";
                DynamicParameters param = new DynamicParameters();
                param.Add("TuNgay", input.Ngay_BatDau);
                param.Add("DenNgay", input.Ngay_KetThuc);
                param.Add("MaNCC", input.MaNCC);
                param.Add("Username", input.Username);
                param.Add("KieuYCVC", input.KieuYCVC);
                param.Add("Loai", input.Loai);
                return await conn.ExecuteSpReportAsync(sp, param);
       
            }
        }
    }
    public class ReportBCDH01Input : IRequest<ReportBCDH01Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }            
        public string MaNCC { get; set; }
        public string Username { get; set; }
        public string Loai { get; set; }
        public int? KieuYCVC { get; set; }

    }
    public class ReportBCDH01Output : BaseReportOutput<ReportBCDH01Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCDH01Output(ReportBCDH01Input input) : base(input)
        {
        }
    }
   
}
