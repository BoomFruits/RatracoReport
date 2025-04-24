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
    public class ReportBCHH03Handler : BaseReportService<ReportBCHH03Handler>, IService, IReportHandler<ReportBCHH03Input, ReportBCHH03Output>
    {
        public ReportBCHH03Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCHH03Output> Handle(ReportBCHH03Input request)
        {
            ReportBCHH03Output result = new ReportBCHH03Output(request);
            if (request.Loai.HasValue)
            {
                var detail3 = await ExecuteSP2(request);
                result.DataDetail = detail3;
                return result;
            }
            var detail = await ExecuteSP(request);
            var detail1 = detail.Where(m => m.Loai == 1);
            var detail2 = detail.Where(m => m.Loai == 2);
            if (detail1 != null && detail1.Any())
            {
                var grp = detail1.GroupBy(m => new { m.GaID,m.TenGa });
                if (grp != null && grp.Any())
                {
                    var lst = new List<ReportBCHH03Item>();
                    foreach (var d in grp)
                    {
                        var item = new ReportBCHH03Item();
                        item.TenGa = d.Key.TenGa;
                        item.GaID = d.Key.GaID;                       
                        item.Items = d.ToList();
                        lst.Add(item);
                    }
                    result.Data1 = lst;
                   
                }
            }
            if (detail2 != null && detail2.Any())
            {
                var grp = detail2.GroupBy(m => new { m.GaID, m.TenGa });
                if (grp != null && grp.Any())
                {
                    var lst = new List<ReportBCHH03Item>();
                    foreach (var d in grp)
                    {
                        var item = new ReportBCHH03Item();
                        item.TenGa = d.Key.TenGa;
                        item.GaID = d.Key.GaID;
                        item.Items = d.ToList();
                        lst.Add(item);
                    }
                    result.Data2 = lst;

                }
            }

            return result;
        }

        public async Task<byte[]> HandleExcel(ReportBCHH03Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BCHH03.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["C2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                worksheet.Cells["C3"].UseValue("Tên đơn vị:{0}", request.TenDV);
                //Title
                var Nam = request.Ngay_KetThuc.Year;
                worksheet.Cells["D4"].UseValue("KH:{0}", Nam);
                worksheet.Cells["E4"].UseValue("TH T1.{0}", Nam);
                worksheet.Cells["F4"].UseValue("TH T2.{0}", Nam);
                worksheet.Cells["G4"].UseValue("TH T3.{0}", Nam);
                worksheet.Cells["H4"].UseValue("TH T4.{0}", Nam);
                worksheet.Cells["I4"].UseValue("TH T5.{0}", Nam);
                worksheet.Cells["J4"].UseValue("TH T6.{0}", Nam);
                worksheet.Cells["K4"].UseValue("TH T7.{0}", Nam);
                worksheet.Cells["L4"].UseValue("TH T8.{0}", Nam);
                worksheet.Cells["M4"].UseValue("TH T9.{0}", Nam);
                worksheet.Cells["N4"].UseValue("TH T10.{0}", Nam);
                worksheet.Cells["O4"].UseValue("TH T11.{0}", Nam);
                worksheet.Cells["P4"].UseValue("TH T12.{0}", Nam);

                //table
                var indexRow = 6;
                worksheet.Cells["A"+ indexRow].UseValue("I").UseAlignCenter().UseFontBold();
                worksheet.Cells["B"+ indexRow].UseValue("SẢN LƯỢNG").UseAlignCenter().UseFontBold();
                indexRow++;
                worksheet.Cells["A" + indexRow].UseValue("1").UseAlignCenter().UseFontBold();
                worksheet.Cells["B" + indexRow].UseValue("Sản lượng hàng xếp").UseAlignCenter().UseFontBold();
                worksheet.Cells["C" + indexRow].UseValue("Toa").UseAlignCenter().UseFontBold();
                indexRow++;
                foreach (var item in report.Data1)
                {
                    worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count()-1)].UseMerge().UseValue(item.TenGa);

                    worksheet.BindList(item.Items, indexRow, (cols, d, index) => 
                    {
                        if (!string.IsNullOrEmpty(d.PhanLoaiXe))
                        {
                            cols["B"].UseValue(string.Format("Toa xe:{0}",d.PhanLoaiXe));
                        }
                        if (d.SanLuongKH != null)
                        {
                            cols["D"].UseValue(d.SanLuongKH);
                        }
                        if (d.ThucHienT1 != null)
                        {
                            cols["E"].UseValue(d.ThucHienT1);
                        }
                        if (d.ThucHienT2 != null)
                        {
                            cols["F"].UseValue(d.ThucHienT2);
                        }
                        if (d.ThucHienT3 != null)
                        {
                            cols["G"].UseValue(d.ThucHienT3);
                        }
                        if (d.ThucHienT4 != null)
                        {
                            cols["H"].UseValue(d.ThucHienT4);
                        }
                        if (d.ThucHienT5 != null)
                        {
                            cols["I"].UseValue(d.ThucHienT5);
                        }
                        if (d.ThucHienT6 != null)
                        {
                            cols["J"].UseValue(d.ThucHienT6);
                        }
                        if (d.ThucHienT7 != null)
                        {
                            cols["K"].UseValue(d.ThucHienT7);
                        }
                        if (d.ThucHienT8 != null)
                        {
                            cols["L"].UseValue(d.ThucHienT8);
                        }
                        if (d.ThucHienT9 != null)
                        {
                            cols["M"].UseValue(d.ThucHienT9);
                        }
                        if (d.ThucHienT10 != null)
                        {
                            cols["N"].UseValue(d.ThucHienT10);
                        }
                        if (d.ThucHienT11 != null)
                        {
                            cols["O"].UseValue(d.ThucHienT11);
                        }
                        if (d.ThucHienT12 != null)
                        {
                            cols["P"].UseValue(d.ThucHienT12);
                        }
                        
                    });
                    indexRow = indexRow + item.Items.Count();
                }
                worksheet.Cells["A" + indexRow].UseValue("2").UseAlignCenter().UseFontBold();
                worksheet.Cells["B" + indexRow].UseValue("Sản lượng hàng dỡ").UseAlignCenter().UseFontBold();
                worksheet.Cells["C" + indexRow].UseValue("Toa").UseAlignCenter().UseFontBold();
                indexRow++;
                foreach (var item in report.Data2)
                {
                    worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(item.TenGa);
                    worksheet.BindList(item.Items, indexRow, (cols, d, index) =>
                    {
                        if (!string.IsNullOrEmpty(d.PhanLoaiXe))
                        {
                            cols["B"].UseValue(string.Format("Toa xe:{0}", d.PhanLoaiXe));
                        }
                        if (d.SanLuongKH != null)
                        {
                            cols["D"].UseValue(d.SanLuongKH);
                        }
                        if (d.ThucHienT1 != null)
                        {
                            cols["E"].UseValue(d.ThucHienT1);
                        }
                        if (d.ThucHienT2 != null)
                        {
                            cols["F"].UseValue(d.ThucHienT2);
                        }
                        if (d.ThucHienT3 != null)
                        {
                            cols["G"].UseValue(d.ThucHienT3);
                        }
                        if (d.ThucHienT4 != null)
                        {
                            cols["H"].UseValue(d.ThucHienT4);
                        }
                        if (d.ThucHienT5 != null)
                        {
                            cols["I"].UseValue(d.ThucHienT5);
                        }
                        if (d.ThucHienT6 != null)
                        {
                            cols["J"].UseValue(d.ThucHienT6);
                        }
                        if (d.ThucHienT7 != null)
                        {
                            cols["K"].UseValue(d.ThucHienT7);
                        }
                        if (d.ThucHienT8 != null)
                        {
                            cols["L"].UseValue(d.ThucHienT8);
                        }
                        if (d.ThucHienT9 != null)
                        {
                            cols["M"].UseValue(d.ThucHienT9);
                        }
                        if (d.ThucHienT10 != null)
                        {
                            cols["N"].UseValue(d.ThucHienT10);
                        }
                        if (d.ThucHienT11 != null)
                        {
                            cols["O"].UseValue(d.ThucHienT11);
                        }
                        if (d.ThucHienT12 != null)
                        {
                            cols["P"].UseValue(d.ThucHienT12);
                        }

                    });
                    indexRow = indexRow + item.Items.Count();
                }


            
                // Ghi chu
                worksheet.Cells[string.Format("A{0}", indexRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", indexRow + 2)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", DateTime.Now).UseAlignLeft().UseFontItalic().UseNoWrapText();

                ////// Formula

                // Model table
                string tableRange = string.Format("A{0}:P{1}", 6, indexRow-1);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }
    

        public async Task<IEnumerable<ReportBCHH03ChiTietItem>> ExecuteSP(ReportBCHH03Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[Tram_BCHH03_TongHopSanLuongXepDo]";
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
                var res= await conn.QuerySpAsync<ReportBCHH03ChiTietItem>(sp, x);
                return res;
            }
        }
        public async Task<IEnumerable<ReportBCHH03DetailItem>> ExecuteSP2(ReportBCHH03Input input)
        {
            string sp="";
            if (input.Loai == 1)
            {
                sp = @"[dbo].[Tram_BCHH03_TongHopSanLuongXepByThang]";
            }
            else if (input.Loai == 2)
            {
                sp = @"[dbo].[Tram_BCHH03_TongHopSanLuongDoByThang]";
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
                    input.GaID,
                    input.Thang
                };
                var res = await conn.QuerySpAsync<ReportBCHH03DetailItem>(sp, x);
                return res;
            }
        }

    }
    public class ReportBCHH03Input : IRequest<ReportBCHH03Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }       
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public string Username { get; set; }
        public short? Loai { get; set; }
        public int? Thang { get; set; }
        public int? GaID { get; set; }
        public string PhanLoaiXe { get; set; }


    }
    public class ReportBCHH03Output : BaseReportOutput<ReportBCHH03Input>
    {
        public IEnumerable<ReportBCHH03Item> Data1 { get; set; }
        public IEnumerable<ReportBCHH03Item> Data2 { get; set; }
        public IEnumerable<ReportBCHH03DetailItem> DataDetail { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBCHH03Output(ReportBCHH03Input input) : base(input)
        {
        }
    }
    public class ReportBCHH03Item
    {
        public string TenGa { get; set; }
        public int? GaID { get; set; }
        public IEnumerable<ReportBCHH03ChiTietItem> Items { get; set; }
    }
    public class ReportBCHH03ChiTietItem 
    {
        public int? NamKH { get; set; }
        public int? SanLuongKH { get; set; }
        public string ChiTieu { get; set; }
        public short? Loai { get; set; }
        public string TenGa { get; set; }
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public int GaID { get; set; }
        public string PhanLoaiXe { get; set; }
        public int? ThucHienT1 { get; set; }
        public int? ThucHienT2 { get; set; }
        public int? ThucHienT3 { get; set; }
        public int? ThucHienT4 { get; set; }
        public int? ThucHienT5 { get; set; }
        public int? ThucHienT6 { get; set; }
        public int? ThucHienT7 { get; set; }
        public int? ThucHienT8 { get; set; }
        public int? ThucHienT9 { get; set; }
        public int? ThucHienT10 { get; set; }
        public int? ThucHienT11 { get; set; }
        public int? ThucHienT12 { get; set; }

    }
    public class ReportBCHH03DetailItem
    {
        public int? GaID { get; set; }
        public string TenGa { get; set; }
        public string PhanLoaiXe { get; set; }
        public string SoHieuXe { get; set; }
        public string SoHieuCont { get; set; }
        public long? BookingID { get; set; }
        public string SoBooking { get; set; }
        public DateTime? NgayPH { get; set; }
        public string KhachHang_Ten { get; set; }
        public string TenHang { get; set; }
        public double? TanTT { get; set; }
        public string MaDV { get; set; }
        public string TenDV { get; set; }
    }
}
