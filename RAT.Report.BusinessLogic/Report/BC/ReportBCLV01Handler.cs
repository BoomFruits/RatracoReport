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
    public class ReportBCLV01Handler : BaseReportService<ReportBCLV01Handler>, IService, IReportHandler<ReportBCLV01Input, ReportBCLV01Output>
    {
        public ReportBCLV01Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCLV01Output> Handle(ReportBCLV01Input request)
        {
            ReportBCLV01Output result = new ReportBCLV01Output(request);
            if (!string.IsNullOrEmpty(request.MaTuyen)&& !string.IsNullOrEmpty(request.MaTuyen))
            {
                var DataDetail = await ExecuteSP3(request);
                result.DataDetail = DataDetail;
                return result;
            }
            var detail = await ExecuteSP(request);
            if (detail != null && detail.Any())
            {
                for (var i =0;i<detail.Count();i++)
                {
                    var item = detail.ElementAt(i);
                    item.TyLeThucHienThang = item.ThangKH > 0 ?((double)item.ThangThucHien *100 / (double)item.ThangKH):100;
                    item.TyLeThucHienNam = item.ThangKH > 0 ?((double)item.LuyKe *100 / (double)item.SanLuongKH):100;
                }
                var grp = detail.GroupBy(m => new { m.MaTuyen,m.TenTuyen });
                if (grp != null && grp.Any())
                {
                    var lst = new List<ReportBCLV01Item>();
                    foreach (var d in grp)
                    {
                        var item = new ReportBCLV01Item();
                        item.MaTuyen = d.Key.MaTuyen;
                        item.TenTuyen = d.Key.TenTuyen;                       
                        item.Items = d.ToList();
                        lst.Add(item);
                    }
                    result.Data = lst;
                   
                }
            }
            var detail2 = await ExecuteSP2(request);
            if (detail2 != null && detail2.Any())
            {
                for (var i = 0; i < detail2.Count(); i++)
                {
                    var item = detail2.ElementAt(i);
                    item.TyLeThucHienThang = item.ThangKH > 0 ? ((double)item.ThangThucHien * 100 / (double)item.ThangKH) : 100;
                    item.TyLeThucHienNam = item.ThangKH > 0 ? ((double)item.LuyKe * 100 / (double)item.SanLuongKH) : 100;
                }
                var grp = detail2.GroupBy(m => new { m.MaTuyen, m.TenTuyen });
                if (grp != null && grp.Any())
                {
                    var lst = new List<ReportBCLV01Item>();
                    foreach (var d in grp)
                    {
                        var item = new ReportBCLV01Item();
                        item.MaTuyen = d.Key.MaTuyen;
                        item.TenTuyen = d.Key.TenTuyen;
                        item.Items = d.ToList();
                        lst.Add(item);
                    }
                    result.Data2 = lst;

                }
            }

            return result;
        }

        public async Task<byte[]> HandleExcel(ReportBCLV01Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCLV01.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["C2"].UseValue("Tháng {0} năm {1}", request.Thang, request.Nam);
                var indexRow = 6;
                var count = 1;
                foreach (var item in report.Data)
                {
                    worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(count);
                    worksheet.Cells[string.Format("B{0}:B{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(item.TenTuyen);

                    worksheet.BindList(item.Items, indexRow, (cols, d, index) =>
                    {
                      

                    });
                    indexRow = indexRow + item.Items.Count();
                    count++;
                }



                // Ghi chu
                worksheet.Cells[string.Format("A{0}", indexRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", indexRow + 2)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", DateTime.Now).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:E{1}", 6, indexRow - 1);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }


        public async Task<IEnumerable<ReportBCLV01ChiTietItem>> ExecuteSP(ReportBCLV01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamLVQT_BCLV01_BaoCaoTongHopSL]";
                var x = new
                {
                    input.Nam,
                    input.Thang,
                    input.Username
                };
                var res= await conn.QuerySpAsync<ReportBCLV01ChiTietItem>(sp, x);
                return res;
            }
        }
        public async Task<IEnumerable<ReportBCLV01ChiTietItem>> ExecuteSP2(ReportBCLV01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamLVQT_BCLV01_BaoCaoTongHopDT]";
                var x = new
                {
                    input.Nam,
                    input.Thang,
                    input.Username
                };
                var res = await conn.QuerySpAsync<ReportBCLV01ChiTietItem>(sp, x);
                return res;
            }
        }
        public async Task<IEnumerable<ReportBCLV01DetailItem>> ExecuteSP3(ReportBCLV01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[TrungTamLVQT_BCLV01_BaoCaoTongHopDT_Detail]";
                var x = new
                {
                    input.Nam,
                    input.Thang,
                    input.MaTuyen,
                    input.PhanLoaiXe,
                    input.Username
                };
                var res = await conn.QuerySpAsync<ReportBCLV01DetailItem>(sp, x);
                return res;
            }
        }

    }
    public class ReportBCLV01Input : IRequest<ReportBCLV01Output>
    {
        public int? Thang { get; set; }
        public int? Nam { get; set; }   
        public string MaTuyen { get; set; }
        public string PhanLoaiXe { get; set; }

        public string Username { get; set; }   

    }
    public class ReportBCLV01Output : BaseReportOutput<ReportBCLV01Input>
    {
        public IEnumerable<ReportBCLV01Item> Data { get; set; }
        public IEnumerable<ReportBCLV01Item> Data2 { get; set; }
        public IEnumerable<ReportBCLV01DetailItem> DataDetail { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCLV01Output(ReportBCLV01Input input) : base(input)
        {
        }
    }
    public class ReportBCLV01Item
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public IEnumerable<ReportBCLV01ChiTietItem> Items { get; set; }
    }
    public class ReportBCLV01ChiTietItem
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public string PhanLoaiXe { get; set; }
        public string DVT { get; set; }
        public long? SanLuongKH { get; set; }
        public long? LuyKe { get; set; }
        public long? ThangKH { get; set; }
        public long? ThangThucHien { get; set; }
        public double? TyLeThucHienThang { get; set; }
        public double? TyLeThucHienNam { get; set; }
    }
    public class ReportBCLV01DetailItem
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public string PhanLoaiXe { get; set; }
        public string DVT { get; set; }
        public long? BookingID { get; set; }
        public string SoBooking { get; set; }
        public DateTime? NgayPH { get; set; }
        public int? GaDiID { get; set; }
        public string TenGaDong { get; set; }
        public int? GaDenID { get; set; }
        public string TenGaTra { get; set; }
        public string TenHang { get; set; }
        public string KhachHang_Ten { get; set; }
        public long? ThangThucHien { get; set; }

    }


}
