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
    public class ReportBCQT01Handler : BaseReportService<ReportBCQT01Handler>, IService, IReportHandler<ReportBCQT01Input, ReportBCQT01Output>
    {
        public ReportBCQT01Handler(ICacheService cacheService) : base(cacheService)
        {
        }

        public async Task<ReportBCQT01Output> Handle(ReportBCQT01Input request)
        {
            ReportBCQT01Output result = new ReportBCQT01Output(request);
           
            var detail = await ExecuteSP(request);
            if (detail != null && detail.Any())
            {
                //chênh lệch
                for(var i = 0;i< detail.Count(); i++)
                {
                    if (detail.ElementAt(i).DHVT_CuocVC > 0)
                    {
                        detail.ElementAt(i).DHGT_DH = 0;
                        detail.ElementAt(i).DHGT_SK = 0;
                        detail.ElementAt(i).DHGT_TienDon = 0;
                        detail.ElementAt(i).DHGT_KCKT = 0;
                        detail.ElementAt(i).DHGT_VanTanKM = 0;
                        detail.ElementAt(i).DHGT_DichVuHH = 0;
                        detail.ElementAt(i).DHGT_Khac = 0;
                    }
                    detail.ElementAt(i).TongDoanhThu = detail.ElementAt(i).DoanhThuBookingTau;
                    detail.ElementAt(i).TongChi = detail.ElementAt(i).DHGT_DH+ detail.ElementAt(i).DHGT_SK 
                            + detail.ElementAt(i).DHGT_TienDon + detail.ElementAt(i).DHGT_KCKT + detail.ElementAt(i).DHGT_VanTanKM + detail.ElementAt(i).DHGT_DichVuHH + detail.ElementAt(i).DHGT_Khac
                            + detail.ElementAt(i).DHVT_CuocVC + detail.ElementAt(i).TienDauXep + detail.ElementAt(i).TienDauDo+ detail.ElementAt(i).ChiPhiHaiQuan;

                    detail.ElementAt(i).ChenhLech = detail.ElementAt(i).TongDoanhThu - detail.ElementAt(i).TongChi;
                }
                //tổng
                result.Tong = new ReportBCQT01ChiTietItem();
                result.Tong.SoDoanTau = detail.Sum(m => m.SoDoanTau);
                result.Tong.SLToa_Nang = detail.Sum(m => m.SLToa_Nang);
                result.Tong.SLToa_Rong = detail.Sum(m => m.SLToa_Rong);
                result.Tong.SLCONT_Nang = detail.Sum(m => m.SLCONT_Nang);
                result.Tong.SLCONT_Rong = detail.Sum(m => m.SLCONT_Rong);
                result.Tong.TanTT = detail.Sum(m => m.TanTT);
                result.Tong.TuTrongXe = detail.Sum(m => m.TuTrongXe);
                result.Tong.TanKMHH = detail.Sum(m => m.TanKMHH);
                result.Tong.TanKMTT = detail.Sum(m => m.TanKMTT);
                result.Tong.DoanTauKM = detail.Sum(m => m.DoanTauKM);
                result.Tong.DoanhThuBookingTau = detail.Sum(m => m.DoanhThuBookingTau);
                result.Tong.DoanhThuGaGa = detail.Sum(m => m.DoanhThuGaGa);
                result.Tong.TienDauXep = detail.Sum(m => m.TienDauXep);
                result.Tong.TienDauDo = detail.Sum(m => m.TienDauDo);
                result.Tong.ChiPhiHaiQuan = detail.Sum(m => m.ChiPhiHaiQuan);
                result.Tong.DHVT_CuocVC = detail.Sum(m => m.DHVT_CuocVC);
                result.Tong.DHGT_DH = detail.Sum(m => m.DHGT_DH);
                result.Tong.DHGT_SK = detail.Sum(m => m.DHGT_SK);
                result.Tong.DHGT_TienDon = detail.Sum(m => m.DHGT_TienDon);
                result.Tong.DHGT_KCKT = detail.Sum(m => m.DHGT_KCKT);
                result.Tong.DHGT_VanTanKM = detail.Sum(m => m.DHGT_VanTanKM);
                result.Tong.DHGT_DichVuHH = detail.Sum(m => m.DHGT_DichVuHH);
                result.Tong.DHGT_Khac = detail.Sum(m => m.DHGT_Khac);
                result.Tong.TongDoanhThu = detail.Sum(m => m.TongDoanhThu);
                result.Tong.TongChi = detail.Sum(m => m.TongChi);
                result.Tong.ChenhLech = detail.Sum(m => m.ChenhLech);
                //group
                var grp = detail.GroupBy(m => new { m.MaTuyen,m.TenTuyen,m.LoaiKH,m.TenLoaiKH });
                if (grp != null && grp.Any())
                {
                    var lst = new List<ReportBCQT01Item>();
                    foreach (var d in grp)
                    {
                        var item = new ReportBCQT01Item();
                        item.MaTuyen = d.Key.MaTuyen;
                        item.TenTuyen = d.Key.TenTuyen;                       
                        item.LoaiKH = d.Key.LoaiKH;
                        item.TenLoaiKH = d.Key.TenLoaiKH;
                        item.Items = d.ToList();
                        lst.Add(item);
                    }
                    result.Data = lst;
                   
                }
            }
           

            return result;
        }

        public async Task<byte[]> HandleExcel(ReportBCQT01Input request)
        {
            var report = await Handle(request);
            IEnumerable<ReportBCQT01Item> data1 = report.Data.Where(m => m.LoaiKH == 2);
            IEnumerable<ReportBCQT01Item> data2 = report.Data.Where(m => (m.LoaiKH == 23 || m.LoaiKH ==25));
            IEnumerable<ReportBCQT01Item> data3 = report.Data.Where(m => m.LoaiKH == 21);

            return ExportExcelTemplateAsBuffering("BCQT01.xlsx", (package) =>
            {
                var worksheet = package.Workbook.Worksheets.First();

                // Headers

                worksheet.Cells["F2"].UseValue("Ngày từ {0:dd/MM/yyyy} đến {1:dd/MM/yyyy}", request.Ngay_BatDau, request.Ngay_KetThuc);
                var indexRow = 8;
                //Duong sat
                worksheet.Cells["A"+ indexRow].UseValue("I").UseFontBold().UseAlignCenter();
                worksheet.Cells["B" + indexRow].UseValue("Đường Sắt").UseFontBold().UseAlignCenter();
                worksheet.Cells["C" + indexRow].UseValue("Nơi đi").UseFontBold().UseAlignCenter();
                worksheet.Cells["D" + indexRow].UseValue("Nơi đến").UseFontBold().UseAlignCenter();
                indexRow++;
                var count = 1;
                foreach (var item in data1)
                {
                    worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(count).UseAlignCenter();
                    worksheet.Cells[string.Format("B{0}:B{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(item.TenTuyen).UseAlignCenter();

                    worksheet.BindList(item.Items, indexRow, (cols, d, index) =>
                    {
                        if (!string.IsNullOrEmpty(d.MaGaLT))
                        {
                            cols["C"].UseValue(d.MaGaLT).UseAlignCenter();
                        }
                        if (!string.IsNullOrEmpty(d.MaGaGT))
                        {
                            cols["D"].UseValue(d.MaGaGT).UseAlignCenter();
                        }
                        if (!string.IsNullOrEmpty(d.MacTau))
                        {
                            cols["E"].UseValue(d.MacTau).UseAlignCenter();
                        }
                        if (d.CuLy != null)
                        {
                            cols["F"].UseValue(d.CuLy).UseAlignCenter();
                        }
                        if (d.SoDoanTau !=null)
                        {
                            cols["G"].UseValue(d.SoDoanTau).UseAlignCenter();
                        }
                        if (d.SLToa_Nang != null)
                        {
                            cols["H"].UseValue(d.SLToa_Nang).UseAlignCenter();
                        }
                        if (d.SLToa_Rong != null)
                        {
                            cols["I"].UseValue(d.SLToa_Rong).UseAlignCenter();
                        }
                        if (d.SLCONT_Nang != null)
                        {
                            cols["J"].UseValue(d.SLCONT_Nang).UseAlignCenter();
                        }
                        if (d.SLCONT_Rong != null)
                        {
                            cols["K"].UseValue(d.SLCONT_Rong).UseAlignCenter();
                        }
                        if (d.TanTT != null)
                        {
                            cols["L"].UseValue(d.TanTT).UseAlignRight();
                        }
                        if (d.TuTrongXe != null)
                        {
                            cols["M"].UseValue(d.TuTrongXe).UseAlignRight();
                        }
                        if (d.TanKMHH != null)
                        {
                            cols["N"].UseValue(d.TanKMHH).UseAlignRight();
                        }
                        if (d.TanKMTT != null)
                        {
                            cols["O"].UseValue(d.TanKMTT).UseAlignRight();
                        }
                        if (d.DoanTauKM != null)
                        {
                            cols["P"].UseValue(d.DoanTauKM).UseAlignRight();
                        }
                        
                        cols["Q"].UseValue(d.DoanhThuGaGa).UseAlignRight();
                       
                      
                        cols["R"].UseValue(d.DoanhThuBookingTau).UseAlignRight();
                       
                        cols["S"].UseValue("").UseAlignRight();
                      
                        cols["T"].UseValue(d.TongDoanhThu).UseAlignRight();

                        cols["U"].UseValue(d.DHGT_DH).UseAlignRight();
                        cols["V"].UseValue(d.DHGT_SK).UseAlignRight();
                        cols["W"].UseValue(d.DHGT_TienDon).UseAlignRight();
                        cols["X"].UseValue(d.DHGT_KCKT).UseAlignRight();
                        cols["Y"].UseValue(d.DHGT_VanTanKM).UseAlignRight();
                        cols["Z"].UseValue(d.DHGT_DichVuHH).UseAlignRight();
                        cols["AA"].UseValue(d.DHGT_Khac).UseAlignRight();

                        cols["AB"].UseValue(d.DHVT_CuocVC).UseAlignRight();
                       
                        cols["AC"].UseValue(d.TienDauXep).UseAlignRight();
                       
                        cols["AD"].UseValue(d.TienDauDo).UseAlignRight();
                       
                        cols["AE"].UseValue(d.ChiPhiHaiQuan).UseAlignRight();
                       
                        cols["AF"].UseValue(d.TongChi).UseAlignRight();
                       
                        cols["AG"].UseValue(d.ChenhLech).UseAlignRight();
                    });
                    indexRow = indexRow + item.Items.Count();
                    count++;
                }
                //Duong bo
                worksheet.Cells["A" + indexRow].UseValue("II").UseFontBold().UseAlignCenter();
                worksheet.Cells["B" + indexRow].UseValue("Đường Bộ").UseFontBold().UseAlignCenter();
              
                indexRow++;
                var count1 = 1;
                foreach (var item in data2)
                {
                    worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(count1).UseAlignCenter();
                    worksheet.Cells[string.Format("B{0}:B{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(item.TenTuyen).UseAlignCenter();

                    worksheet.BindList(item.Items, indexRow, (cols, d, index) =>
                    {
                        if (!string.IsNullOrEmpty(d.MaGaLT))
                        {
                            cols["C"].UseValue(d.MaGaLT).UseAlignCenter();
                        }
                        if (!string.IsNullOrEmpty(d.MaGaGT))
                        {
                            cols["D"].UseValue(d.MaGaGT).UseAlignCenter();
                        }
                        if (!string.IsNullOrEmpty(d.MacTau))
                        {
                            cols["E"].UseValue(d.MacTau).UseAlignCenter();
                        }
                        cols["F"].UseValue("").UseAlignCenter();
                        if (d.SoDoanTau != null)
                        {
                            cols["G"].UseValue(d.SoDoanTau).UseAlignCenter();
                        }
                        if (d.SLToa_Nang != null)
                        {
                            cols["H"].UseValue(d.SLToa_Nang).UseAlignCenter();
                        }
                        if (d.SLToa_Rong != null)
                        {
                            cols["I"].UseValue(d.SLToa_Rong).UseAlignCenter();
                        }
                        if (d.SLCONT_Nang != null)
                        {
                            cols["J"].UseValue(d.SLCONT_Nang).UseAlignCenter();
                        }
                        if (d.SLCONT_Rong != null)
                        {
                            cols["K"].UseValue(d.SLCONT_Rong).UseAlignCenter();
                        }
                        if (d.TanTT != null)
                        {
                            cols["L"].UseValue(d.TanTT).UseAlignRight();
                        }
                        if (d.TuTrongXe != null)
                        {
                            cols["M"].UseValue(d.TuTrongXe).UseAlignRight();
                        }
                        if (d.TanKMHH != null)
                        {
                            cols["N"].UseValue(d.TanKMHH).UseAlignRight();
                        }
                        if (d.TanKMTT != null)
                        {
                            cols["O"].UseValue(d.TanKMTT).UseAlignRight();
                        }
                        if (d.DoanTauKM != null)
                        {
                            cols["P"].UseValue(d.DoanTauKM).UseAlignRight();
                        }
                        
                        cols["Q"].UseValue(d.DoanhThuGaGa).UseAlignRight();
                       
                       
                        cols["R"].UseValue(d.DoanhThuBookingTau).UseAlignRight();
                       
                        cols["S"].UseValue("").UseAlignRight();
                       
                        cols["T"].UseValue(d.TongDoanhThu).UseAlignRight();
                        
                        cols["U"].UseValue(d.DHGT_DH).UseAlignRight();
                        cols["V"].UseValue(d.DHGT_SK).UseAlignRight();
                        cols["W"].UseValue(d.DHGT_TienDon).UseAlignRight();
                        cols["X"].UseValue(d.DHGT_KCKT).UseAlignRight();
                        cols["Y"].UseValue(d.DHGT_VanTanKM).UseAlignRight();
                        cols["Z"].UseValue(d.DHGT_DichVuHH).UseAlignRight();
                        cols["AA"].UseValue(d.DHGT_Khac).UseAlignRight();
                       
                        cols["AB"].UseValue(d.DHVT_CuocVC).UseAlignRight();
                       
                        cols["AC"].UseValue(d.TienDauXep).UseAlignRight();
                      
                        cols["AD"].UseValue(d.TienDauDo).UseAlignRight();
                      
                        cols["AE"].UseValue(d.ChiPhiHaiQuan).UseAlignRight();
                       
                        cols["AF"].UseValue(d.TongChi).UseAlignRight();
                       
                        cols["AG"].UseValue(d.ChenhLech).UseAlignRight();
                    });
                    indexRow = indexRow + item.Items.Count();
                    count1++;
                }
                //Duong bo
                worksheet.Cells["A" + indexRow].UseValue("III").UseFontBold().UseAlignCenter();
                worksheet.Cells["B" + indexRow].UseValue("Đường Biển").UseFontBold().UseAlignCenter();

                indexRow++;
                var count2 = 1;
                foreach (var item in data3)
                {
                    worksheet.Cells[string.Format("A{0}:A{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(count2).UseAlignCenter();
                    worksheet.Cells[string.Format("B{0}:B{1}", indexRow, indexRow + item.Items.Count() - 1)].UseMerge().UseValue(item.TenTuyen).UseAlignCenter();

                    worksheet.BindList(item.Items, indexRow, (cols, d, index) =>
                    {
                        if (!string.IsNullOrEmpty(d.MaGaLT))
                        {
                            cols["C"].UseValue(d.MaGaLT).UseAlignCenter();
                        }
                        if (!string.IsNullOrEmpty(d.MaGaGT))
                        {
                            cols["D"].UseValue(d.MaGaGT).UseAlignCenter();
                        }
                        if (!string.IsNullOrEmpty(d.MacTau))
                        {
                            cols["E"].UseValue(d.MacTau).UseAlignCenter();
                        }
                        cols["F"].UseValue("").UseAlignCenter();
                        if (d.SoDoanTau != null)
                        {
                            cols["G"].UseValue(d.SoDoanTau).UseAlignCenter();
                        }
                        if (d.SLToa_Nang != null)
                        {
                            cols["H"].UseValue(d.SLToa_Nang).UseAlignCenter();
                        }
                        if (d.SLToa_Rong != null)
                        {
                            cols["I"].UseValue(d.SLToa_Rong).UseAlignCenter();
                        }
                        if (d.SLCONT_Nang != null)
                        {
                            cols["J"].UseValue(d.SLCONT_Nang).UseAlignCenter();
                        }
                        if (d.SLCONT_Rong != null)
                        {
                            cols["K"].UseValue(d.SLCONT_Rong).UseAlignCenter();
                        }
                        if (d.TanTT != null)
                        {
                            cols["L"].UseValue(d.TanTT).UseAlignRight();
                        }
                        if (d.TuTrongXe != null)
                        {
                            cols["M"].UseValue(d.TuTrongXe).UseAlignRight();
                        }
                        if (d.TanKMHH != null)
                        {
                            cols["N"].UseValue(d.TanKMHH).UseAlignRight();
                        }
                        if (d.TanKMTT != null)
                        {
                            cols["O"].UseValue(d.TanKMTT).UseAlignRight();
                        }
                        if (d.DoanTauKM != null)
                        {
                            cols["P"].UseValue(d.DoanTauKM).UseAlignRight();
                        }
                       
                        cols["Q"].UseValue(d.DoanhThuGaGa).UseAlignRight();
                       
                        cols["R"].UseValue(d.DoanhThuBookingTau).UseAlignRight();
                       
                        cols["S"].UseValue("").UseAlignRight();
                       
                        cols["T"].UseValue(d.TongDoanhThu).UseAlignRight();

                        cols["U"].UseValue(d.DHGT_DH).UseAlignRight();
                        cols["V"].UseValue(d.DHGT_SK).UseAlignRight();
                        cols["W"].UseValue(d.DHGT_TienDon).UseAlignRight();
                        cols["X"].UseValue(d.DHGT_KCKT).UseAlignRight();
                        cols["Y"].UseValue(d.DHGT_VanTanKM).UseAlignRight();
                        cols["Z"].UseValue(d.DHGT_DichVuHH).UseAlignRight();
                        cols["AA"].UseValue(d.DHGT_Khac).UseAlignRight();

                        cols["AB"].UseValue(d.DHVT_CuocVC).UseAlignRight();
                       
                        cols["AC"].UseValue(d.TienDauXep).UseAlignRight();
                       
                        cols["AD"].UseValue(d.TienDauDo).UseAlignRight();
                      
                        cols["AE"].UseValue(d.ChiPhiHaiQuan).UseAlignRight();
                      
                        cols["AF"].UseValue(d.TongChi).UseAlignRight();
                       
                        cols["AG"].UseValue(d.ChenhLech).UseAlignRight();
                    });
                    indexRow = indexRow + item.Items.Count();
                    count2++;
                }
                //Tong cong
                var Tong = report.Tong;
                worksheet.Cells["A" + indexRow].UseValue("IV").UseFontBold().UseAlignCenter();
                worksheet.Cells["B" + indexRow].UseValue("Tổng cộng").UseFontBold().UseAlignCenter();
                if (Tong != null)
                {
                    if (Tong.SoDoanTau != null)
                    {
                        worksheet.Cells["G" + indexRow].UseValue(Tong.SoDoanTau).UseAlignCenter();
                    }
                    if (Tong.SLToa_Nang != null)
                    {
                        worksheet.Cells["H" + indexRow].UseValue(Tong.SLToa_Nang).UseAlignCenter();
                    }
                    if (Tong.SLToa_Rong != null)
                    {
                        worksheet.Cells["I" + indexRow].UseValue(Tong.SLToa_Rong).UseAlignCenter();
                    }
                    if (Tong.SLCONT_Nang != null)
                    {
                        worksheet.Cells["J" + indexRow].UseValue(Tong.SLCONT_Nang).UseAlignCenter();
                    }
                    if (Tong.SLCONT_Rong != null)
                    {
                        worksheet.Cells["K" + indexRow].UseValue(Tong.SLCONT_Rong).UseAlignCenter();
                    }
                    if (Tong.TanTT != null)
                    {
                        worksheet.Cells["L" + indexRow].UseValue(Tong.TanTT).UseAlignRight();
                    }
                    if (Tong.TuTrongXe != null)
                    {
                        worksheet.Cells["M" + indexRow].UseValue(Tong.TuTrongXe).UseAlignRight();
                    }
                    if (Tong.TanKMHH != null)
                    {
                        worksheet.Cells["N" + indexRow].UseValue(Tong.TanKMHH).UseAlignRight();
                    }
                    if (Tong.TanKMTT != null)
                    {
                        worksheet.Cells["O" + indexRow].UseValue(Tong.TanKMTT).UseAlignRight();
                    }
                    if (Tong.DoanTauKM != null)
                    {
                        worksheet.Cells["P" + indexRow].UseValue(Tong.DoanTauKM).UseAlignRight();
                    }
                   
                    worksheet.Cells["Q" + indexRow].UseValue(Tong.DoanhThuGaGa).UseAlignRight();
                   
                    worksheet.Cells["R" + indexRow].UseValue(Tong.DoanhThuBookingTau).UseAlignRight();
                  
                    worksheet.Cells["S" + indexRow].UseValue("").UseAlignRight();
                   
                    worksheet.Cells["T" + indexRow].UseValue(Tong.TongDoanhThu).UseAlignRight();
                   
                    worksheet.Cells["U" + indexRow].UseValue(Tong.DHGT_DH).UseAlignRight();
                    worksheet.Cells["V" + indexRow].UseValue(Tong.DHGT_SK).UseAlignRight();
                    worksheet.Cells["W" + indexRow].UseValue(Tong.DHGT_TienDon).UseAlignRight();
                    worksheet.Cells["X" + indexRow].UseValue(Tong.DHGT_KCKT).UseAlignRight();
                    worksheet.Cells["Y" + indexRow].UseValue(Tong.DHGT_VanTanKM).UseAlignRight();
                    worksheet.Cells["Z" + indexRow].UseValue(Tong.DHGT_DichVuHH).UseAlignRight();
                    worksheet.Cells["AA" + indexRow].UseValue(Tong.DHGT_Khac).UseAlignRight();
                
                    worksheet.Cells["AB" + indexRow].UseValue(Tong.DHVT_CuocVC).UseAlignRight();
                  
                    worksheet.Cells["AC" + indexRow].UseValue(Tong.TienDauXep).UseAlignRight();
                   
                    worksheet.Cells["AD" + indexRow].UseValue(Tong.TienDauDo).UseAlignRight();
                   
                    worksheet.Cells["AE" + indexRow].UseValue(Tong.ChiPhiHaiQuan).UseAlignRight();
                   
                    worksheet.Cells["AF" + indexRow].UseValue(Tong.TongChi).UseAlignRight();
                    
                    worksheet.Cells["AG" + indexRow].UseValue(Tong.ChenhLech).UseAlignRight();
                }
               

                indexRow++;
                // Ghi chu
                worksheet.Cells[string.Format("A{0}", indexRow + 1)].UseValue("Ghi chú (*)").UseAlignLeft().UseFontItalic().UseNoWrapText().UseFontBold();
                worksheet.Cells[string.Format("A{0}", indexRow + 2)].UseValue(" - Báo cáo được lấy số liệu vào lúc {0:dd/MM/yyyy HH:mm}", DateTime.Now).UseAlignLeft().UseFontItalic().UseNoWrapText();

                // fomat number
                string numberRange = string.Format("L{0}:P{1}", 8, indexRow);
                string numberCurrencyRange = string.Format("Q{0}:AG{1}", 8, indexRow);
                worksheet.Cells[numberRange].Style.Numberformat.Format = "#,##0.00";
                worksheet.Cells[numberCurrencyRange].Style.Numberformat.Format = "#,##0";

                // Model table
                string tableRange = string.Format("A{0}:AG{1}", 8, indexRow - 1);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }


        public async Task<IEnumerable<ReportBCQT01ChiTietItem>> ExecuteSP(ReportBCQT01Input input)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"[dbo].[BaoCaoQT_BCQT01_TongHopKetQuaVanTai]";
                var x = new
                {
                    TuNgay = input.Ngay_BatDau,
                    DenNgay = input.Ngay_KetThuc,
                    input.Username,
                    input.MacTau,
                    input.MaNCC
                };
                var res= await conn.QuerySpAsync<ReportBCQT01ChiTietItem>(sp, x);
                return res;
            }
        }

    }
    public class ReportBCQT01Input : IRequest<ReportBCQT01Output>
    {
        public DateTime? Ngay_BatDau { get; set; }
        public DateTime? Ngay_KetThuc { get; set; }
        public string MacTau { get; set; }
        public string MaNCC { get; set; }   
        public string Username { get; set; }

    }
    public class ReportBCQT01Output : BaseReportOutput<ReportBCQT01Input>
    {
        public IEnumerable<ReportBCQT01Item> Data { get; set; }
        public ReportBCQT01ChiTietItem Tong { get; set; }
        public ReportBCQT01Output(ReportBCQT01Input input) : base(input)
        {
        }
    }
    public class ReportBCQT01Item
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public int? LoaiKH { get; set; }
        public string TenLoaiKH { get; set; }
        public IEnumerable<ReportBCQT01ChiTietItem> Items { get; set; }
    }
    public class ReportBCQT01ChiTietItem 
    {
        public int? LoaiKH { get; set; }
        public string MaTuyen { get; set; }
        public string TenLoaiKH{ get; set; }
        public string TenTuyen { get; set; }
        public string TenGaLT { get; set; }
        public string MaGaLT { get; set; }
        public string TenGaGT { get; set; }
        public string MaGaGT { get; set; }
        public string MacTau { get; set; }
        public int? SoDoanTau { get; set; }
        public decimal? CuLy { get; set; }
        public int? SLToa_Nang { get; set; }
        public int? SLToa_Rong { get; set; }
        public int? SLCONT_Nang { get; set; }
        public int? SLCONT_Rong { get; set; }
        public double? TanTT { get; set; }
        public double? TuTrongXe { get; set; }
        public double? TanKMHH { get; set; }
        public double? TanKMTT { get; set; }
        public double? DoanTauKM { get; set; }
        public long DoanhThuBooking { get; set; }
        public long DoanhThuBookingTau { get; set; }
        public long DoanhThuGaGa { get; set; }
        public long ChiPhiHaiQuan { get; set; }
        public long TienDauXep { get; set; }
        public long TienDauDo { get; set; }
        public long DHVT_CuocVC { get; set; }
        public long DHGT_DH { get; set; }
        public long DHGT_SK { get; set; }
        public long DHGT_KCKT { get; set; }
        public long DHGT_VanTanKM { get; set; }
        public long DHGT_DichVuHH { get; set; }
        public long DHGT_TienDon { get; set; }
        public long DHGT_Khac { get; set; }
        public long ChenhLech { get; set; }
        public long TongChi { get; set; }
        public long TongDoanhThu { get; set; }

    }


}
