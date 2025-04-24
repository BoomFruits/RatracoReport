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
    public class ReportBCQT03Handler : BaseReportService<ReportBCQT03Handler>, IService, IReportHandler<ReportBCQT03Input, ReportBCQT03Output>
    {
        public ReportBCQT03Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCQT03Output> Handle(ReportBCQT03Input request)
        {
           
            // ExecuteSP to get data
            var data = await ExecuteSP(request);
            for (var i = 0; i < data.Count(); i++)
            {
                var TongChiPhiDuongTruc = data.ElementAt(i).Get<long>("DHGT_DTKM") + data.ElementAt(i).Get<long>("DHGT_DMKM") 
                                            + data.ElementAt(i).Get<long>("DHGT_VanTanKM") + data.ElementAt(i).Get<long>("DHGT_DichVuHH")+ data.ElementAt(i).Get<long>("KCKT")
                                            + data.ElementAt(i).Get<long>("CuocVC_DS") + data.ElementAt(i).Get<long>("CuocVC_DBo") + data.ElementAt(i).Get<long>("CuocVC_DBien");
                data.ElementAt(i).Add("TongChiPhiDuongTruc", TongChiPhiDuongTruc);
                var ChenhLech = data.ElementAt(i).Get<long>("DoanhThuBooking") - (data.ElementAt(i).Get<long>("TienDauXep") + data.ElementAt(i).Get<long>("TongChiPhiDuongTruc") + data.ElementAt(i).Get<long>("TienDauDo"));
                data.ElementAt(i).Add("ChenhLech", ChenhLech);
            }
            return new ReportBCQT03Output(request)
            {
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBCQT03Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCQT03.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers
             
                //worksheet.Cells["F1"].UseValue("BÁO CÁO TỔNG HỢP NHANH DOANH THU");
                worksheet.Cells["F2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);

                var beginRow = 10;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();

                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 3)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// fomat number
                string numberRange = string.Format("S{0}:W{1}", beginRow, totalRow);
                string numberCurrencyRange = string.Format("X{0}:AS{1}", beginRow, totalRow);
                worksheet.Cells[numberRange].Style.Numberformat.Format = "#,##0.00";
                worksheet.Cells[numberCurrencyRange].Style.Numberformat.Format = "#,##0";

                // Model table
                string tableRange = string.Format("A{0}:AS{1}", beginRow, totalRow);
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
            cols["B"].UseValue(item.Get("KhachHang_MaKH")).UseAlignCenter();
            cols["C"].UseValue(item.Get("KhachHang_Ten")).UseAlignCenter();
            cols["D"].UseValue(string.Format("{0} {1}",item.Get("MacTau"), (item.Get<DateTime>("NgayXP").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayXP").ToString("dd/MM/yyyy")))).UseAlignCenter();
            cols["E"].UseValue(item.Get("PhanLoaiXe")).UseAlignCenter();
            cols["F"].UseValue(item.Get("SoHieuXe")).UseAlignCenter();
            cols["G"].UseValue(item.Get("VanDonID")).UseAlignCenter();
            cols["H"].UseValue(item.Get("LoaiCont")).UseAlignCenter();
            cols["I"].UseValue(item.Get("SoHieuCont")).UseAlignCenter();
            cols["J"].UseValue(item.Get("VienNP")).UseAlignCenter();
            cols["K"].UseValue(item.Get("TenHang")).UseAlignCenter();
            cols["L"].UseValue(item.Get("TenGaXep")).UseAlignCenter();
            cols["M"].UseValue(item.Get("TenGaDo")).UseAlignCenter();
            cols["N"].UseValue(item.Get("CuLy")).UseAlignCenter();
            cols["O"].UseValue(isTong ? "" : item.Get<DateTime>("NgayNhan").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayNhan").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["P"].UseValue(isTong ? "" : item.Get<DateTime>("NgayXep").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayXep").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["Q"].UseValue(isTong ? "" : item.Get<DateTime>("NgayDo").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayDo").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["R"].UseValue(isTong ? "" : item.Get<DateTime>("NgayGiao").Year.ToString().Equals("1") ? "" : item.Get<DateTime>("NgayGiao").ToString("dd/MM/yyyy HH:mm")).UseAlignCenter();
            cols["S"].UseValue(item.Get("TuTrong")).UseAlignCenter();
            cols["T"].UseValue(item.Get("TaiTrong")).UseAlignCenter();
            cols["U"].UseValue(item.Get("TongTrong")).UseAlignCenter();
            cols["V"].UseValue(item.Get("TanKMHH")).UseAlignCenter();
            cols["W"].UseValue(item.Get("TanKMTT")).UseAlignCenter();
            cols["X"].UseValue(item.Get("DoanThuGaGa")).UseAlignRight();
            cols["Y"].UseValue(item.Get("DoanhThuBooking")).UseAlignRight();
            cols["Z"].UseValue(item.Get("TienDauXep_DN")).UseAlignRight();
            cols["AA"].UseValue(item.Get("TienDauXep_Cau")).UseAlignRight();
            cols["AB"].UseValue(item.Get("TienDauXep_PhatSinh")).UseAlignRight();
            cols["AC"].UseValue(item.Get("TienDauXep")).UseAlignRight();
            cols["AD"].UseValue(item.Get("DHGT_DTKM")).UseAlignRight();
            cols["AE"].UseValue(item.Get("DHGT_DMKM")).UseAlignRight();
            cols["AF"].UseValue(item.Get("DHGT_VanTanKM")).UseAlignRight();
            cols["AG"].UseValue(item.Get("DHGT_DichVuHH")).UseAlignRight();
            cols["AH"].UseValue("").UseAlignRight();
            cols["AI"].UseValue("").UseAlignRight();
            cols["AJ"].UseValue("").UseAlignRight();
            cols["AK"].UseValue(item.Get("CuocVC_DS")).UseAlignRight();
            cols["AL"].UseValue(item.Get("CuocVC_DBo")).UseAlignRight();
            cols["AM"].UseValue(item.Get("CuocVC_DBien")).UseAlignRight();
            cols["AN"].UseValue(item.Get("TongChiPhiDuongTruc")).UseAlignRight();
            cols["AO"].UseValue(item.Get("TienDauDo_DN")).UseAlignRight();
            cols["AP"].UseValue(item.Get("TienDauDo_Cau")).UseAlignRight();
            cols["AQ"].UseValue(item.Get("TienDauDo_PhatSinh")).UseAlignRight();
            cols["AR"].UseValue(item.Get("TienDauDo")).UseAlignRight();
            cols["AS"].UseValue(item.Get("ChenhLech")).UseAlignRight();

        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBCQT03Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCaoQT_BCQT03_TongHopTinhHinhXepDo]";
                DynamicParameters param = new DynamicParameters();
                param.Add("TuNgay", input.Ngay_BatDau);
                param.Add("DenNgay", input.Ngay_KetThuc);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBCQT03Input : IRequest<ReportBCQT03Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }
        public string Username { get; set; }

    }
    public class ReportBCQT03Output : BaseReportOutput<ReportBCQT03Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCQT03Output(ReportBCQT03Input input) : base(input)
        {
        }
    }
}
