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
    public class ReportBCHH01Handler : BaseReportService<ReportBCHH01Handler>, IService, IReportHandler<ReportBCHH01Input, ReportBCHH01Output>
    {
        public ReportBCHH01Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCHH01Output> Handle(ReportBCHH01Input request)
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
            if (string.IsNullOrEmpty(request.NhomLenh))
            {
                var data = await ExecuteSP(request);
                return new ReportBCHH01Output(request)
                {
                    Data = data,
                    Tong = Sum(data)
                };
            }
            else
            {
                var data = await ExecuteSP2(request);
                return new ReportBCHH01Output(request)
                {
                    Data = data,
                    Tong = Sum(data)
                };
            }
           
            
        }

        public async Task<byte[]> HandleExcel(ReportBCHH01Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCHH01.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["C2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                worksheet.Cells["C3"].UseValue("Tại ga:{0}", request.TenGa);
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

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBCHH01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[Tram_BCHH01_TacNghiepCau]";
                DynamicParameters param = new DynamicParameters();
                param.Add("NgayBD", input.Ngay_BatDau);
                param.Add("NgayKT", input.Ngay_KetThuc);
                param.Add("GaID", input.GaID);
                param.Add("MaNCC", input.MaNCC);
                param.Add("MaKH", input.MaKH);
                param.Add("MaDV", input.MaDV);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
        public async Task<IEnumerable<ReportObject>> ExecuteSP2(ReportBCHH01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[Tram_BCHH01_TacNghiepCau_Detail]";
                DynamicParameters param = new DynamicParameters();
                param.Add("NgayBD", input.Ngay_BatDau);
                param.Add("NgayKT", input.Ngay_KetThuc);
                param.Add("GaID", input.GaID);
                param.Add("MaNCC", input.MaNCC);
                param.Add("MaKH", input.MaKH);
                param.Add("MaDV", input.MaDV);
                param.Add("Username", input.Username);
                param.Add("NgayTacNghiep", input.NgayTacNghiep);
                param.Add("NhomLenh", input.NhomLenh);
                param.Add("LoaiCONT", input.LoaiCONT);
                return await conn.ExecuteSpReportAsync(sp, param);
       
            }
        }
    }
    public class ReportBCHH01Input : IRequest<ReportBCHH01Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }       
        public int? GaID { get; set; }
        public string TenGa { get; set; }
        public string MaNCC { get; set; }
        public string MaKH { get; set; }
        public string MaDV { get; set; }
        public string Username { get; set; }
        public DateTime? NgayTacNghiep { get; set; }
        public string NhomLenh { get; set; }
        public string LoaiCONT { get; set; }

    }
    public class ReportBCHH01Output : BaseReportOutput<ReportBCHH01Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCHH01Output(ReportBCHH01Input input) : base(input)
        {
        }
    }
    public class ReportBCHH01DetailItem
    {

    }
}
