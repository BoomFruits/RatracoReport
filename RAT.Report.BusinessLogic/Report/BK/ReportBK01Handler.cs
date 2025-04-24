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
    public class ReportBK01Handler : BaseReportService<ReportBK01Handler>, IService, IReportHandler<ReportBK01Input, ReportBK01Output>
    {
        public ReportBK01Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBK01Output> Handle(ReportBK01Input request)
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
            return new ReportBK01Output(request)
            {
                //CurrentNhanVien = await CurrentNhanVien(),
                //CurrentDonVi = await CurrentDonVi(),
                Data = data,
                Tong = Sum(data)
            };
        }

        public async Task<byte[]> HandleExcel(ReportBK01Input request)
        {
            var report = await Handle(request);
            return ExportExcelTemplateAsBuffering("BK01.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers
                //worksheet.Cells["A1"].UseValue(GetTenCongTyLine1(report.CurrentDonVi));
                //worksheet.Cells["A2"].UseValue(GetTenCongTyLine2(report.CurrentDonVi));

                //worksheet.Cells["F1"].UseValue("BÁO CÁO TỔNG HỢP NHANH DOANH THU");
                worksheet.Cells["D2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                string tenKeHoach ="";
                switch (request.LoaiKH)
                {
                    case 1:
                        tenKeHoach = "Đóng hàng";
                        break;
                    case 2:
                        tenKeHoach = "Đường sắt (RTC)";
                        break;
                    case 3:
                        tenKeHoach = "Trả hàng";
                        break;
                    case 21:
                        tenKeHoach = "Đường biển";
                        break;
                    case 22:
                        tenKeHoach = "Đóng sắt (THUE)";
                        break;
                    case 23:
                        tenKeHoach = "Đường dài";
                        break;
                    default:
                        Console.WriteLine("Kế hoạch trống");
                        break;
                }
                worksheet.Cells["D3"].UseValue("Loại kế hoạch: {0}", tenKeHoach);
                //worksheet.Cells["D3"].UseValue("Đơn vị bán vé: {0}, Hình thức bán vé: {1}, Phương thức thu: {2}"
                //    , string.IsNullOrEmpty(request.MaDV) ? "Tất cả" : request.TenDV
                //    , request.TenLoaiBan
                //    , request.TenLoaiThanhToan
                //);

                //worksheet.Cells["N2"].UseValue("Mẫu: DT01-B1");
                //worksheet.Cells["N3"].UseValue("Đơn vị tính: x1.000 đồng");

                // Body
                //worksheet.Cells["A4"].UseValue(report.Input.TenCapQL);

                var beginRow = 7;
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
                string tableRange = string.Format("A{0}:O{1}", beginRow, totalRow);
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
            cols["B"].UseValue(isTong ? "":item.Get("SoBooking")+ " "+ item.Get<DateTime>("CreatedDate").ToString("dd/MM/yyyy")).UseAlignLeft();
            cols["C"].UseValue(item.Get("SoHieuCont")).UseAlignLeft();
            cols["D"].UseValue(item.Get("SoHieuXe")).UseAlignLeft(); 
            cols["E"].UseValue(item.Get("TenHang")).UseAlignLeft(); 
            cols["F"].UseValue(isTong ? "" : item.Get("KhachHang_Ten")+" ("+ item.Get("KhachHang_MaKH") +")").UseAlignLeft(); 
            cols["G"].UseValue(item.Get("TenZoneDong")).UseAlignLeft();
            cols["H"].UseValue(item.Get("TenZoneTra")).UseAlignLeft();
            cols["I"].UseValue(item.Get("TenMacTau")).UseAlignCenter(); 

            cols["J"].UseValue(item.Get<string>("TienCau") == null ? 0 : item.Get("TienCau")).UseAlignRight(); 
            cols["K"].UseValue(item.Get<string>("TienDuongNgan") == null ? 0 : item.Get("TienDuongNgan")).UseAlignRight(); 
            cols["L"].UseValue(item.Get<string>("TienDuongDai") == null ? 0 : item.Get("TienDuongDai")).UseAlignRight();
            cols["M"].UseValue(item.Get<string>("TienDuongSat") == null ? 0 : item.Get("TienDuongSat")).UseAlignRight(); 
            cols["N"].UseValue(item.Get<string>("TienPhatSinh") ==null? 0 : item.Get("TienPhatSinh")).UseAlignRight(); 
            cols["O"].UseValue(item.Get<string>("ThanhTien") == null ? 0 : item.Get("ThanhTien")).UseAlignRight(); 
        }

        public async Task<IEnumerable<ReportObject>> ExecuteSP(ReportBK01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BangKe_BK01]";
                DynamicParameters param = new DynamicParameters();
                param.Add("NgayBD", input.Ngay_BatDau);
                param.Add("NgayKT", input.Ngay_KetThuc);
                param.Add("LoaiKH", input.LoaiKH);
                return await conn.ExecuteSpReportAsync(sp, param);
            }
        }
    }
    public class ReportBK01Input : IRequest<ReportBK01Output>
    {
        public DateTime Ngay_BatDau { get; set; }
        public DateTime Ngay_KetThuc { get; set; }       
        public short? LoaiKH { get; set; }
      
    }
    public class ReportBK01Output : BaseReportOutput<ReportBK01Input>
    {
        public IEnumerable<ReportObject> Data { get; set; }
        public ExpandoObject Tong { get; set; }
        public ReportBK01Output(ReportBK01Input input) : base(input)
        {
        }
    }
}
