using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RAT.Report.Domain.DTO.Test;
using TLS.Lib.Excel;
using TLS.Lib.Net.Service;
using OfficeOpenXml.Style;

namespace RAT.Report.Service.Excel.Handlers.Implementors
{
    public class TestExcelService : ReportBaseExcelService<TestExcelService>, ITestExcelService
    {
        public FileInfo ExportItemAsFile(IEnumerable<TestItem> data)
        {
            return ExportExcelTableAsFile(data
                    , m => m.Set("STT", m.Index + 1).UseAlignCenter().UseAlignMiddle()
                    , m => m.Set("ID", m.Item.ID).UseAlignCenter().UseAlignMiddle()
                    , m => m.Set("Tên", m.Item.Name)
                    , m => m.Set("Số lượng", m.Item.Amount)
                    , m => m.Set("Thời gian tạo", m.Item.CreatedTime).UseFormatDateTime()
                );
        }
        public byte[] ExportItem(IEnumerable<TestItem> data)
        {
            return ExportExcelTableAsBuffering(data
                    , m => m.Set("STT", m.Index + 1).UseAlignCenter()
                    , m => m.Set("ID", m.Item.ID).UseAlignCenter()
                    , m => m.Set("Tên", m.Item.Name)
                    , m => m.Set("Số lượng", m.Item.Amount)
                    , m => m.Set("Thời gian tạo", m.Item.CreatedTime).UseFormatDateTime("dd/MM/yyyy HH:mm")
                );
        }
        public byte[] ExportTemplateTestStream(IEnumerable<TestItem> data)
        {
            var template = "TestTemplate.xlsx";
            var reportTime = DateTime.Now;

            // Export excel
            return ExportExcelTemplateAsBuffering(template, (package) => {
                var worksheet = package.Workbook.Worksheets.First();
                var beginRow = 5;

                worksheet.Cells[2, 1].UseValue("Thời gian từ {0} đến {1}", data.Min(m => m.CreatedTime).ToString("dd/MM/yyyy"), data.Max(m => m.CreatedTime).ToString("dd/MM/yyyy"));
                worksheet.BindList(data, beginRow, (cols, item, index) =>
                {
                    cols["A"].UseValue(index + 1).UseAlignCenter();
                    cols["B"].UseValue(item.ID).UseAlignCenter();
                    cols["C"].UseValue(item.Name);
                    cols["D"].UseValue(item.Amount).UseFormatNumberInteger().UseAlignRight();
                    cols["E"].UseValue(item.CreatedTime).UseFormatDateTime();
                });

                worksheet.Cells["A4:E4"].UseAutoFilter();

                // Ghi chu
                var ghiChuRow = beginRow + data.Count();
                var ghiChuText = string.Format("Ghi chú: Báo cáo được xuất dữ liệu lúc {0} ngày {1}", reportTime.ToString("HH:mm"), reportTime.ToString("dd/MM/yyyy"));
                worksheet.Cells[string.Format("A{0}:E{0}", ghiChuRow)].UseMerge().UseValue(ghiChuText).UseAlignLeft().UseFontItalic();
                //worksheet.Cells[ghiChuRow, 1].UseValue(ghiChuText).UseAlignLeft().UseFontItalic();

                // Formula
                var formulaRow = ghiChuRow + 1;
                worksheet.Cells[string.Format("D{0}", formulaRow)].UseFormulaSum("D{0}:D{1}", beginRow, beginRow + data.Count() - 1).UseFormatNumberInteger().UseFontBold().UseAlignRight();

                // Model table
                string tableRange = string.Format("A5:E{0}", formulaRow);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }
        public FileInfo ExportTemplateTestFile(IEnumerable<TestItem> data)
        {
            var template = "TestTemplate.xlsx";
            var reportTime = DateTime.Now;

            // Export excel
            return ExportExcelTemplateAsFile(template, (package) => {
                var worksheet = package.Workbook.Worksheets.First();
                var beginRow = 5;

                worksheet.Cells[2, 1].UseValue("Thời gian từ {0} đến {1}", data.Min(m => m.CreatedTime).ToString("dd/MM/yyyy"), data.Max(m => m.CreatedTime).ToString("dd/MM/yyyy"));
                worksheet.BindList(data, beginRow, (cols, item, index) =>
                {
                    cols["A"].UseValue(index + 1).UseAlignCenter();
                    cols["B"].UseValue(item.ID).UseAlignCenter();
                    cols["C"].UseValue(item.Name);
                    cols["D"].UseValue(item.Amount).UseFormatNumberInteger().UseAlignRight();
                    cols["E"].UseValue(item.CreatedTime).UseFormatDateTime();
                });

                worksheet.Cells["A4:E4"].UseAutoFilter();

                // Ghi chu
                var ghiChuRow = beginRow + data.Count();
                var ghiChuText = string.Format("Ghi chú: Báo cáo được xuất dữ liệu lúc {0} ngày {1}", reportTime.ToString("HH:mm"), reportTime.ToString("dd/MM/yyyy"));
                worksheet.Cells[string.Format("A{0}:E{0}", ghiChuRow)].UseMerge().UseValue(ghiChuText).UseAlignLeft().UseFontItalic();
                //worksheet.Cells[ghiChuRow, 1].UseValue(ghiChuText).UseAlignLeft().UseFontItalic();

                // Formula
                var formulaRow = ghiChuRow + 1;
                worksheet.Cells[string.Format("D{0}", formulaRow)].UseFormulaSum("D{0}:D{1}", beginRow, beginRow + data.Count() - 1).UseFormatNumberInteger().UseFontBold().UseAlignRight();

                // Model table
                string tableRange = string.Format("A5:E{0}", formulaRow);
                worksheet.Cells[tableRange].UseBorderThin();
            });
        }
    }
}
