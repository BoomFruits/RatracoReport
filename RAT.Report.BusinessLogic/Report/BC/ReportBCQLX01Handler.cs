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
    public class ReportBCQLX01Handler : BaseReportService<ReportBCQLX01Handler>, IService, IReportHandler<ReportBCQLX01Input, ReportBCQLX01Output>
    {
        public ReportBCQLX01Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCQLX01Output> Handle(ReportBCQLX01Input request)
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
            return new ReportBCQLX01Output(request)
            {
                //CurrentNhanVien = await CurrentNhanVien(),
                //CurrentDonVi = await CurrentDonVi(),
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBCQLX01Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCQLX01.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

              
                var beginRow = 6;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                //BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();

                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 3)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:BH{1}", beginRow, totalRow);
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
            cols["B"].UseValue(item.Get("SoHieuXe")).UseAlignLeft();
            cols["C"].UseValue(item.Get("NamDM")).UseAlignCenter();
            cols["D"].UseValue(item.Get("NoiDM")).UseAlignCenter();
            cols["E"].UseValue(item.Get("PhuongTien_SoDK")).UseAlignCenter();
            cols["F"].UseValue(string.IsNullOrEmpty(item.Get<string>("PhuongTien_NgayDK"))?"":item.Get<DateTime>("PhuongTien_NgayDK").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["G"].UseValue(item.Get("SoGiayDK")).UseAlignCenter();
            cols["H"].UseValue(item.Get("TemDK")).UseAlignCenter();
            cols["I"].UseValue(string.IsNullOrEmpty(item.Get<string>("NgayDangKiem")) ? "" : item.Get<DateTime>("NgayDangKiem").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["J"].UseValue(string.IsNullOrEmpty(item.Get<string>("NgayHetHanDangKiem")) ? "" : item.Get<DateTime>("NgayHetHanDangKiem").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["K"].UseValue(item.Get("ChatNguyHiem_SoDK")).UseAlignCenter();
            cols["L"].UseValue(string.IsNullOrEmpty(item.Get<string>("ChatNguyHiem_NgayDK")) ? "" : item.Get<DateTime>("ChatNguyHiem_NgayDK").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["M"].UseValue(string.IsNullOrEmpty(item.Get<string>("ChatNguyHiem_NgayHH")) ? "" : item.Get<DateTime>("ChatNguyHiem_NgayHH").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["N"].UseValue(string.IsNullOrEmpty(item.Get<string>("BazemDT_NgayDK")) ? "" : item.Get<DateTime>("BazemDT_NgayDK").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["O"].UseValue(string.IsNullOrEmpty(item.Get<string>("BazemDT_NgayHH")) ? "" : item.Get<DateTime>("BazemDT_NgayHH").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["P"].UseValue(item.Get("ThungGioPhu_SoDK")).UseAlignCenter();
            cols["Q"].UseValue(string.IsNullOrEmpty(item.Get<string>("ThungGioPhu_NgayDK")) ? "" : item.Get<DateTime>("ThungGioPhu_NgayDK").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["R"].UseValue(string.IsNullOrEmpty(item.Get<string>("ThungGioPhu_NgayHH")) ? "" : item.Get<DateTime>("ThungGioPhu_NgayHH").ToString("dd/MM/yyyy")).UseAlignCenter();
            cols["S"].UseValue(item.Get("LoaiGCH")).UseAlignCenter();
            cols["T"].UseValue(item.Get("GCHLoaiTrucBanh")).UseAlignCenter();
            cols["U"].UseValue(item.Get("OTrucHopTruc")).UseAlignCenter();
            cols["V"].UseValue(item.Get("GiaCH_ChieuDay1")).UseAlignCenter();
            cols["W"].UseValue(item.Get("GiaCH_DuongKinh1")).UseAlignCenter();
            cols["X"].UseValue(item.Get("GiaCH_ChieuDay2")).UseAlignCenter();
            cols["Y"].UseValue(item.Get("GiaCH_DuongKinh2")).UseAlignCenter();
            cols["Z"].UseValue(item.Get("GiaCH_ChieuDay3")).UseAlignCenter();
            cols["AA"].UseValue(item.Get("GiaCH_DuongKinh3")).UseAlignCenter();
            cols["AB"].UseValue(item.Get("GiaCH_ChieuDay4")).UseAlignCenter();
            cols["AC"].UseValue(item.Get("GiaCH_DuongKinh4")).UseAlignCenter();
            cols["AD"].UseValue(item.Get("VanHam")).UseAlignCenter();
            cols["AE"].UseValue(item.Get("DauDam")).UseAlignCenter();
            cols["AF"].UseValue(item.Get("TuTrong")).UseAlignCenter();
            cols["AG"].UseValue(item.Get("TaiTrong")).UseAlignCenter();
            cols["AH"].UseValue(item.Get("TheTich")).UseAlignCenter();
            cols["AI"].UseValue(item.Get("KTBao_Dai")).UseAlignCenter();
            cols["AJ"].UseValue(item.Get("KTBao_Rong")).UseAlignCenter();
            cols["AK"].UseValue(item.Get("KTBao_Cao")).UseAlignCenter();
            cols["AL"].UseValue(item.Get("NoiDM")).UseAlignCenter();
            cols["AM"].UseValue(item.Get("NgayDM")).UseAlignCenter();
            cols["AN"].UseValue(item.Get("ThangDM")).UseAlignCenter();
            cols["AO"].UseValue(item.Get("NamDM")).UseAlignCenter();
            cols["AP"].UseValue(item.Get("NoiSCL")).UseAlignCenter();
            cols["AQ"].UseValue(item.Get("NgaySCL")).UseAlignCenter();
            cols["AR"].UseValue(item.Get("ThangSCL")).UseAlignCenter();
            cols["AS"].UseValue(item.Get("NamSCL")).UseAlignCenter();
            cols["AT"].UseValue(item.Get("NoiSCN")).UseAlignCenter();
            cols["AU"].UseValue(item.Get("SoLanSCN")).UseAlignCenter();
            cols["AV"].UseValue(item.Get("NgaySCN")).UseAlignCenter();
            cols["AW"].UseValue(item.Get("ThangSCN")).UseAlignCenter();
            cols["AX"].UseValue(item.Get("NamSCN")).UseAlignCenter();
            cols["AY"].UseValue(item.Get("KhamHam_NoiBD")).UseAlignCenter();
            cols["AZ"].UseValue(item.Get("KhamHam_SoLan")).UseAlignCenter();
            cols["BA"].UseValue(item.Get("NgayKhamHam")).UseAlignCenter();
            cols["BB"].UseValue(item.Get("ThangKhamHam")).UseAlignCenter();
            cols["BC"].UseValue(item.Get("NamKhamHam")).UseAlignCenter();
            cols["BD"].UseValue(item.Get("KhamMoc_NoiBD")).UseAlignCenter();
            cols["BE"].UseValue(item.Get("KhamMoc_SoLan")).UseAlignCenter();
            cols["BF"].UseValue(item.Get("NgayKhamMoc")).UseAlignCenter();
            cols["BG"].UseValue(item.Get("ThangKhamMoc")).UseAlignCenter();
            cols["BH"].UseValue(item.Get("NamKhamMoc")).UseAlignCenter();
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBCQLX01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCao_BCQLX01]";
                DynamicParameters param = new DynamicParameters();

                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBCQLX01Input : IRequest<ReportBCQLX01Output>
    {
 
      
    }
    public class ReportBCQLX01Output : BaseReportOutput<ReportBCQLX01Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCQLX01Output(ReportBCQLX01Input input) : base(input)
        {
        }
    }
}
