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
    public class ReportBCHH02Handler : BaseReportService<ReportBCHH02Handler>, IService, IReportHandler<ReportBCHH02Input, ReportBCHH02Output>
    {
        public ReportBCHH02Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCHH02Output> Handle(ReportBCHH02Input request)
        {
            ReportBCHH02Output result = new ReportBCHH02Output(request);
            if (request.Loai.HasValue)
            {
                var detail2 = await ExecuteSP2(request);
                result.DataDetail = detail2;
                return result;
            }      
            var detail = await ExecuteSP(request);
            if (detail != null && detail.Any())
            {
                var grp = detail.GroupBy(m => new { m.GaID,m.TenGa });
                if (grp != null && grp.Any())
                {
                    var lst = new List<ReportBCHH02Item>();
                    foreach (var d in grp)
                    {
                        var item = new ReportBCHH02Item();
                        item.TenGa = d.Key.TenGa;
                        item.GaID = d.Key.GaID;                       
                        item.Items = d.ToList();
                        lst.Add(item);
                    }
                    result.Data = lst;
                   
                }
            }

            return result;
        }

        public async Task<byte[]> HandleExcel(ReportBCHH02Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCHH02.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["C2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                worksheet.Cells["C3"].UseValue("Tên đơn vị:{0}", request.TenDV);
                var indexRow = 6;
                var count = 1;
                foreach (var item in report.Data)
                {
                    worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(count);
                    worksheet.Cells[string.Format("B{0}:B{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(item.TenGa);

                    worksheet.BindList(item.Items, indexRow, (cols, d, index) =>
                    {
                        if (!string.IsNullOrEmpty(d.PhanLoaiXe))
                        {
                            cols["C"].UseValue(string.Format("Toa xe:{0}", d.PhanLoaiXe));
                        }
                        if (d.SanLuongXep != null)
                        {
                            cols["D"].UseValue(d.SanLuongXep);
                        }
                        if (d.SanLuongDo != null)
                        {
                            cols["E"].UseValue(d.SanLuongDo);
                        }                      

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
       

        public async Task<IEnumerable<ReportBCHH02ChiTietItem>> ExecuteSP(ReportBCHH02Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[Tram_BCHH02_TongHopSXKD]";
                //var param = new DynamicParameters();
                //param.Add("NgayBD", input.Ngay_BatDau);
                //param.Add("NgayKT", input.Ngay_KetThuc);
                //param.Add("MaDV", input.MaDV);
                //param.Add("Username", input.Username);
                var x = new
                {
                    NgayBD = input.Ngay_BatDau,
                    NgayKT = input.Ngay_KetThuc,
                    input.MaDV,
                    input.Username
                };
                var res= await conn.QuerySpAsync<ReportBCHH02ChiTietItem>(sp, x);
                return res;
            }
        }
        public async Task<IEnumerable<ReportBCHH02DetailItem>> ExecuteSP2(ReportBCHH02Input input)
        {
            string sp="";
            if (input.Loai == 1)
            {
                sp = @"[dbo].[Tram_BCHH02_TongHopSXKD_Detail_Xep]";
            }
            else if (input.Loai == 2)
            {
                sp = @"[dbo].[Tram_BCHH02_TongHopSXKD_Detail_Do]";
            }
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var x = new
                {
                    NgayBD = input.Ngay_BatDau,
                    NgayKT = input.Ngay_KetThuc,
                    input.MaDV,
                    input.Username,
                    input.PhanLoaiXe,
                    input.GaID
                };
                var res = await conn.QuerySpAsync<ReportBCHH02DetailItem>(sp, x);
                return res;
            }
        }

    }
    public class ReportBCHH02Input : IRequest<ReportBCHH02Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }       
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public string Username { get; set; }
        public short? Loai { get; set; }
        public int? GaID { get; set; }
        public string PhanLoaiXe { get; set; }


    }
    public class ReportBCHH02Output : BaseReportOutput<ReportBCHH02Input>
    {
        public IEnumerable<ReportBCHH02Item> Data { get; set; }
        public IEnumerable<ReportBCHH02DetailItem> DataDetail { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCHH02Output(ReportBCHH02Input input) : base(input)
        {
        }
    }
    public class ReportBCHH02Item
    {
        public string TenGa { get; set; }
        public int? GaID { get; set; }
        public IEnumerable<ReportBCHH02ChiTietItem> Items { get; set; }
    }
    public class ReportBCHH02ChiTietItem 
    {
        public string TenGa { get; set; }
        public int GaID { get; set; }
        public string PhanLoaiXe { get; set; }
        public int? SanLuongXep { get; set; }
        public int? SanLuongDo { get; set; }
    }
    public class ReportBCHH02DetailItem
    {
        public int? GaID { get; set; }
        public string TenGa { get; set; }
        public string PhanLoaiXe { get; set; }
        public string SoHieuXe { get; set; }
        public string SoCONT { get; set; }
        public string LoaiCONT { get; set; }
        public string SoBooking { get; set; }
        public long? BookingID { get; set; }
        public DateTime? NgayPH { get; set; }
        public string KhachHang_Ten { get; set; }
        public string TenHang { get; set; }
        public double? TanTT { get; set; }
        public string MaDV { get; set; }
        public string TenDV { get; set; }
    }
}
