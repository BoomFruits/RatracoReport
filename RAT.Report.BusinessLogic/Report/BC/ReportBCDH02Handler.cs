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
    public class ReportBCDH02Handler : BaseReportService<ReportBCDH02Handler>, IService, IReportHandler<ReportBCDH02Input, ReportBCDH02Output>
    {
        public ReportBCDH02Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCDH02Output> Handle(ReportBCDH02Input request)
        {
            // ExecuteSP to get data
            ReportBCDH02Output result = new ReportBCDH02Output(request);
            if (!request.Loai.HasValue)//main
            {
                var detail = await ExecuteSP(request);
                if (detail != null && detail.Any())
                {
                    var grp = detail.GroupBy(m => new { m.TenGa, m.GaID });
                    if (grp != null && grp.Any())
                    {
                        var lst = new List<ReportBCDH02Item>();
                        foreach (var d in grp)
                        {
                            var item = new ReportBCDH02Item();
                            item.GaID = d.Key.GaID;
                            item.TenGa = d.Key.TenGa;
                            item.Items = d.ToList();
                            lst.Add(item);
                        }
                        result.Data = lst;

                    }
                }
            }else if(request.Loai == 1)
            {
                 var detail1 = await ExecuteSP1(request);
                result.DataDetail = detail1;
            }
            else if (request.Loai == 2)
            {
                var detail2 = await ExecuteSP2(request);
                result.DataDetail = detail2;
            }

            return result;
            
        }

        public async Task<byte[]> HandleExcel(ReportBCDH02Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCDH02.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["F2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                var indexRow = 6;
                var count = 1;
                foreach (var item in report.Data)
                {
                    worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(count).UseAlignCenter();
                    worksheet.Cells[string.Format("B{0}:B{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(item.TenGa).UseAlignCenter();

                    worksheet.BindList(item.Items, indexRow, (cols, d, index) =>
                    {
                        if (!string.IsNullOrEmpty(d.Loai))
                        {
                            cols["C"].UseValue(d.Loai).UseAlignCenter();
                        }
                        if (d.SoLuongXep!=null)
                        {
                            cols["D"].UseValue(d.SoLuongXep).UseAlignCenter();
                        }
                        if (d.ThoiGianDongXep!=null)
                        {
                            cols["E"].UseValue(d.ThoiGianDongXep).UseAlignCenter();
                        }
                        if (d.ThoiGianDongXepBQ != null)
                        {
                            cols["F"].UseValue(d.ThoiGianDongXepBQ).UseAlignCenter();
                        }
                        if (d.SoLuongDo != null)
                        {
                            cols["G"].UseValue(d.SoLuongDo).UseAlignCenter();
                        }
                        if (d.ThoiGianDongDo != null)
                        {
                            cols["H"].UseValue(d.ThoiGianDongDo).UseAlignCenter();
                        }
                        if (d.ThoiGianDongDoBQ != null)
                        {
                            cols["I"].UseValue(d.ThoiGianDongDoBQ).UseAlignCenter();
                        }
                    });
                    indexRow = indexRow + item.Items.Count();
                    count++;
                }


                // fomat number
                string numberRange = string.Format("D{0}:I{1}", 6, indexRow);
                worksheet.Cells[numberRange].Style.Numberformat.Format = "#,##0";

                // Ghi chu
                worksheet.Cells[string.Format("A{0}", indexRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", indexRow + 2)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", report.ReportTime).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:I{1}", 6, indexRow - 1);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }


        public async Task<IEnumerable<ReportBCDH02ChiTietItem>> ExecuteSP(ReportBCDH02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamDH_BCDH02_TinhHinhDongCont]";
                var x = new
                {
                    TuNgay = input.Ngay_BatDau,
                    DenNgay = input.Ngay_KetThuc,
                    input.Username,
                    input.GaID,
                    input.MaKH,
                    input.LoaiCONT
                };
                var res = await conn.QuerySpAsync<ReportBCDH02ChiTietItem>(sp, x);
                return res;
            }
        }
        public async Task<IEnumerable<ReportBCDH02DetailItem>> ExecuteSP1(ReportBCDH02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamDH_BCDH02_TinhHinhDongCont_DongXep]";
                var x = new
                {
                    TuNgay = input.Ngay_BatDau,
                    DenNgay = input.Ngay_KetThuc,
                    input.Username,
                    input.GaID,
                    input.MaKH,
                    input.LoaiCONT
                };
                var res = await conn.QuerySpAsync<ReportBCDH02DetailItem>(sp, x);
                return res;
            }
        }
        public async Task<IEnumerable<ReportBCDH02DetailItem>> ExecuteSP2(ReportBCDH02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamDH_BCDH02_TinhHinhDongCont_DongDo]";
                var x = new
                {
                    TuNgay = input.Ngay_BatDau,
                    DenNgay = input.Ngay_KetThuc,
                    input.Username,
                    input.GaID,
                    input.MaKH,
                    input.LoaiCONT
                };
                var res = await conn.QuerySpAsync<ReportBCDH02DetailItem>(sp, x);
                return res;
            }
        }
    }
    public class ReportBCDH02Input : IRequest<ReportBCDH02Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }            
        public string MaKH { get; set; }
        public string LoaiCONT { get; set; }
        public int? GaID { get; set; }
        public int? Loai { get; set; }
        public string Username { get; set; }

    }
    public class ReportBCDH02Output : BaseReportOutput<ReportBCDH02Input>
    {
        public IEnumerable<ReportBCDH02Item> Data { get; set; }
        public IEnumerable<ReportBCDH02DetailItem> DataDetail { get; set; }
        public ReportBCDH02ChiTietItem Tong { get; set; }
        public ReportBCDH02Output(ReportBCDH02Input input) : base(input)
        {
        }
    }
    public class ReportBCDH02Item
    {
        public string TenGa { get; set; }
        public int? GaID { get; set; }
        public IEnumerable<ReportBCDH02ChiTietItem> Items { get; set; }
    }
    public class ReportBCDH02ChiTietItem
    {
        public string Loai { get; set; }
        public string TenGa { get; set; }
        public int? GaID { get; set; }
        public int? STT { get; set; }
        public int? STTGa { get; set; }
        public int? SoLuongXep { get; set; }
        public int? ThoiGianDongXep { get; set; }
        public int? ThoiGianDongXepBQ { get; set; }
        public int? SoLuongDo { get; set; }
        public int? ThoiGianDongDo { get; set; }
        public int? ThoiGianDongDoBQ { get; set; }

    }
    public class ReportBCDH02DetailItem
    {
        public int LoaiDong { get; set; }
        public string Loai { get; set; }
        public string TenGa { get; set; }
        public int? GaID { get; set; }
        public int? BookingID { get; set; }
        public string SoBooking { get; set; }
        public string TenHang { get; set; }
        public string KhachHang_Ten { get; set; }
        public string TenGaDong { get; set; }
        public string TenGaTra { get; set; }
        public DateTime? ThoiGianXepXong { get; set; }
        public DateTime? ThoiGianDi { get; set; }
        public DateTime? ThoiGianVeGa { get; set; }
        public DateTime? ThoiGianTra { get; set; }
        public int ThoiGianDong { get; set; }
       

    }


}
