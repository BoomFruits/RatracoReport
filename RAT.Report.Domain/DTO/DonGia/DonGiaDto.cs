using RAT.Report.Domain.Entities.DanhMuc;
using RAT.Report.Domain.Entities.DieuHanh;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc
{
    public class DonGiaVCBookingInput
    {
        public string MaKH {get;set;}
	    public string DonViTinh {get;set;}
	    public decimal? SoLuong { get; set; }
        public string ThoiGian { get; set; }
        public string Username {get;set;}
	    public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
        public long? PhuongDongID { get; set; }
        public long? PhuongTraID { get; set; }
        public string MaKhuCNDong {get;set;}
	    public string MaKhuCNTra {get;set;}
	    public string MaDichVu {get;set;}
        //LoaiKH xac dinh la them chi phi dau xep, dau do, hay van chuyen truc
	    public int? LoaiKH {get;set;}
        //xac dinh dich vu la duong ngan, tai ga hay van chuyen truc
	    public int? IsTaiGa {get;set;}
    }
    public class DonGiaItem:DonGiaEntity
    {
        
    }
}
