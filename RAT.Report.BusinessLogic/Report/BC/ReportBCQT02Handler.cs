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
    public class ReportBCQT02Handler : BaseReportService<ReportBCQT02Handler>, IService, IReportHandler<ReportBCQT02Input, ReportBCQT02Output>
    {
        public ReportBCQT02Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCQT02Output> Handle(ReportBCQT02Input request)
        {
            if (!request.Loai.HasValue)//main
            {
                var data = await ExecuteSP(request);
                for(var i = 0; i < data.Count(); i++)
                {
                    if (data.ElementAt(i).Get<long>("DHVT_CuocVC") > 0)
                    {
                        data.ElementAt(i)["DHGT_DH"] = 0;
                        data.ElementAt(i)["DHGT_SK"] = 0;
                        data.ElementAt(i)["DHVT_TienDon"] = 0;
                        data.ElementAt(i)["DHGT_KCKT"] = 0;
                        data.ElementAt(i)["DHGT_VanTanKM"] = 0;
                        data.ElementAt(i)["DHGT_DichVuHH"] = 0;
                        data.ElementAt(i)["DHGT_Khac"] = 0;
                    }
                    var ChenhLech = data.ElementAt(i).Get<long>("DoanhThuBookingTau")
                                        -(data.ElementAt(i).Get<long>("DHGT_DH") + data.ElementAt(i).Get<long>("DHGT_SK") + data.ElementAt(i).Get<long>("DHVT_TienDon")
                                        + data.ElementAt(i).Get<long>("DHGT_KCKT") + data.ElementAt(i).Get<long>("DHGT_VanTanKM") + data.ElementAt(i).Get<long>("DHGT_DichVuHH") + data.ElementAt(i).Get<long>("DHGT_Khac") + data.ElementAt(i).Get<long>("DHVT_CuocVC") 
                                        + data.ElementAt(i).Get<long>("TienDauXep") + data.ElementAt(i).Get<long>("TienDauDo") + data.ElementAt(i).Get<long>("ChiPhiHaiQuan"));
                    data.ElementAt(i).Add("ChenhLech", ChenhLech);
                }

                return new ReportBCQT02Output(request)
                {
                    Data = data,
                    Tong = Sum(data)
                };
            }
            else if(request.Loai ==1)//detail when click mactau duongsat
            {
                var data2 = await ExecuteSP2(request);

                return new ReportBCQT02Output(request)
                {
                    Data = data2,
                    Tong = Sum(data2)
                };
            }
            else if (request.Loai == 2)//detail when click mactau duongbo
            {
                var data3 = await ExecuteSP3(request);

                return new ReportBCQT02Output(request)
                {
                    Data = data3,
                    Tong = Sum(data3)
                };
            }
            else if (request.Loai == 3)//detail when click kckt
            {
                var data4 = await ExecuteSP4(request);

                return new ReportBCQT02Output(request)
                {
                    Data = data4,
                    Tong = Sum(data4)
                };
            }
            else if (request.Loai == 4)//detail when click mactau duongbien
            {
                var data5 = await ExecuteSP5(request);

                return new ReportBCQT02Output(request)
                {
                    Data = data5,
                    Tong = Sum(data5)
                };
            }
            else { return null; }
        }

        public async Task<byte[]> HandleExcel(ReportBCQT02Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCQT02.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["F2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                var beginRow = 8;
                worksheet.BindList(report.Data, beginRow, BinOneRowExcelItem);

                // Tong
                var totalRow = beginRow + report.Data.Count();
                BinOneRowExcel(new ExcelRow(worksheet.Cells, totalRow), new ReportObject(report.Tong), 0, true);
                //worksheet.Cells["A8:Y8"].UseAutoFilter();

                // Ghi chu
                worksheet.Cells[string.Format("A{0}", totalRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", totalRow + 2)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                // fomat number
                string numberRange = string.Format("H{0}:L{1}", beginRow, totalRow);
                string numberCurrencyRange = string.Format("M{0}:Z{1}", beginRow, totalRow);
                worksheet.Cells[numberRange].Style.Numberformat.Format = "#,##0.00";
                worksheet.Cells[numberCurrencyRange].Style.Numberformat.Format = "#,##0";

                // Model table
                string tableRange = string.Format("A{0}:Z{1}", beginRow, totalRow);
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
            cols["B"].UseValue(isTong ? "":(string.Format("{0} {1}", item.Get("MacTau"), (item.Get<string>("MacTau").Equals("DBO")?"":item.Get<DateTime>("NgayXP").ToString("dd/MM/yyyy"))))).UseAlignCenter();
            cols["C"].UseValue(isTong ?(index + 1) + "":"1").UseAlignCenter().UseFontBold(isTong);
            cols["D"].UseValue(item.Get("SLToa_Nang")).UseAlignCenter();
            cols["E"].UseValue(item.Get("SLToa_Rong")).UseAlignCenter();
            cols["F"].UseValue(item.Get("SLCONT_Nang")).UseAlignCenter();
            cols["G"].UseValue(item.Get("SLCONT_Rong")).UseAlignCenter();
            cols["H"].UseValue(item.Get("TanTT")).UseAlignRight();
            cols["I"].UseValue(item.Get("TuTrongXe")).UseAlignRight();
            cols["J"].UseValue(item.Get("TanKMHH")).UseAlignRight();
            cols["K"].UseValue(item.Get("TanKMTT")).UseAlignRight();
            cols["L"].UseValue(item.Get("DoanTauKM")).UseAlignRight();
            cols["M"].UseValue(item.Get("DoanThuGaGa")).UseAlignRight();
            cols["N"].UseValue(item.Get("DoanhThuBookingTau")).UseAlignRight();
            cols["O"].UseValue(item.Get("DHGT_DH")).UseAlignRight();
            cols["P"].UseValue(item.Get("DHGT_SK")).UseAlignRight();
            cols["Q"].UseValue(item.Get("DHVT_TienDon")).UseAlignRight();
            cols["R"].UseValue(item.Get("DHGT_KCKT")).UseAlignRight();
            cols["S"].UseValue(item.Get("DHGT_VanTanKM")).UseAlignRight();
            cols["T"].UseValue(item.Get("DHGT_DichVuHH")).UseAlignRight();
            cols["U"].UseValue(item.Get("DHGT_Khac")).UseAlignRight();
            cols["V"].UseValue(item.Get("DHVT_CuocVC")).UseAlignRight();
            cols["W"].UseValue(item.Get("TienDauXep")).UseAlignRight();
            cols["X"].UseValue(item.Get("TienDauDo")).UseAlignRight();
            cols["Y"].UseValue(item.Get("ChiPhiHaiQuan")).UseAlignRight();
            cols["Z"].UseValue(item.Get("ChenhLech")).UseAlignRight();
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBCQT02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCaoQT_BCQT01_KetQuaVanTaiTheoTau]";
                DynamicParameters param = new DynamicParameters();
                param.Add("TuNgay", input.Ngay_BatDau);
                param.Add("DenNgay", input.Ngay_KetThuc);
                param.Add("MacTau", input.MacTau);
                param.Add("MaNCC", input.MaNCC);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
        public async Task<IEnumerable<ReportObject>> ExecuteSP2(ReportBCQT02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCaoQT_BCQT01_KetQuaVanTaiTheoTau_ChiTiet]";
                DynamicParameters param = new DynamicParameters();
                param.Add("MacTau", input.MacTau);
                param.Add("NgayXP", input.NgayXP);
                param.Add("MaNCC", input.MaNCC);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
        public async Task<IEnumerable<ReportObject>> ExecuteSP3(ReportBCQT02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCaoQT_BCQT01_KetQuaVanTaiTheoTau_ChiTiet2]";
                DynamicParameters param = new DynamicParameters();
                param.Add("MacTau", input.MacTau);
                param.Add("TuNgay", input.Ngay_BatDau);
                param.Add("DenNgay", input.Ngay_KetThuc);
                param.Add("MaNCC", input.MaNCC);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
        public async Task<IEnumerable<ReportObject>> ExecuteSP4(ReportBCQT02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCaoQT_BCQT01_KetQuaVanTaiTheoTau_ChiTiet3]";
                DynamicParameters param = new DynamicParameters();
                param.Add("MacTau", input.MacTau);
                param.Add("TuNgay", input.NgayXP);
                param.Add("DenNgay", input.NgayXP);
                param.Add("MaNCC", input.MaNCC);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
        public async Task<IEnumerable<ReportObject>> ExecuteSP5(ReportBCQT02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCaoQT_BCQT01_KetQuaVanTaiTheoTau_ChiTiet4]";
                DynamicParameters param = new DynamicParameters();
                param.Add("MacTau", input.MacTau);
                param.Add("TuNgay", input.Ngay_BatDau);
                param.Add("DenNgay", input.Ngay_KetThuc);
                param.Add("MaNCC", input.MaNCC);
                param.Add("Username", input.Username);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBCQT02Input : IRequest<ReportBCQT02Output>
    {
        public DateTime? Ngay_BatDau { get; set; }
        public DateTime? Ngay_KetThuc { get; set; }            
        public string MacTau { get; set; }
        public string Username { get; set; }
        public DateTime? NgayXP { get; set; }
        public string MaNCC { get; set; }
        public int? Loai { get; set; }
    }
    public class ReportBCQT02Output : BaseReportOutput<ReportBCQT02Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCQT02Output(ReportBCQT02Input input) : base(input)
        {
        }
    }
   
}
