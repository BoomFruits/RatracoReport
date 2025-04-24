using RAT.Report.Domain.Entities.DanhMuc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc
{
    public class TimKiemNhanVienInput
    {
        public string Search { get; set; }
        public string Username { get; set; }
        public string MaDV { get; set; }
        public short? PageNumber { get; set; }
        public short? PageSize { get; set; }
    }
    public class TimKiemNhanVienOutput
    {
        public int? TotalCount { get; set; }
        public IEnumerable<DMNhanVien> data { get; set; }
    }
    public class CreateNhanVienInput
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string MaDV { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string MaNCC { get; set; }
        public string ChucVu { get; set; }
        public int isActive { get; set; }
        public List<MaGroup> MaGroup { get; set; }
    }
    public class UpdateTaiKhoanInput
    {
        public int? TaiKhoanID { get; set; }
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string MaDV { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string ChucVu { get; set; }
        public int isActive { get; set; }
        public List<MaGroup> MaGroup { get; set; }
    }
    public class MaGroup
    {
        public string icon { get; set; }
        public int maker { get; set; }
        public string name { get; set; }
        public Boolean ticked { get; set; }
    }
    public class UpdateUserLog
    {
        public int Status { get; set; }
        public int UserId { get; set; }
    }
    public class UserInput
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Boolean IsDisabled { get; set; }
        public List<int> GroupIDs { get; set; }
    }
    /// <summary>
    /// SSO
    /// </summary>
    public class DMGroup
    {
        public int Id { get; set; }
        public string ParentId { get; set; }
        public string ParentName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
        public int stt { get; set; }
        public int TotalMembers { get; set; }
    }

    public class UserOutput
    {
        public UserSSO User { get; set; }
    }

    public class UserSSO
    {
        public int Id { get; set; }
        public Boolean IsDisabled { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public Boolean HasPassword { get; set; }
        public string Email { get; set; }
        public Boolean EmailConfirmed { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public Boolean PhoneNumberConfirmed { get; set; }
        public Boolean LockoutEnabled { get; set; }
        public DateTime LockoutEndDateUtc { get; set; }
        public int AccessFailedCount { get; set; }
        public Boolean TwoFactorEnabled { get; set; }
        public string TwoFactorPSK { get; set; }
        public int TwoFactorMethod { get; set; }
        public List<UserGroups> UserGroups { get; set; }
    }
    /// <summary>
    /// SSO
    /// </summary>
    public class UserGroups
    {
        public int Id { get; set; }
        public string ParentId { get; set; }
        public string ParentName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TotalMembers { get; set; }
    }
    public class ChucVuItem
    {
        public string sValue { get; set; }
        public string sText { get; set; }
    }
    public class GetOneNhanVienOutPut
    {
        public DMNhanVien NhanVien { get; set; }
        public UserOutput ssouser { get; set; }
    }
    public class ResetPwdOutput
    {
        public bool Success { get; set; }
    }
    public class ResetPwdInput
    {
        public string OwnerUserName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string LoginName { get; set; }
    }
    public class CheckUserInput
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
    }

    public class CheckUserOutput
    {
        /// <summary>
        /// 0: Success
        /// 1: Password khong dung
        /// 2: UserName da ton tai
        /// 3: Email da ton tai
        /// 4: PhoneNumber da ton tai
        /// 9: Loi khac
        /// </summary>
        public int Status { get; set; }
    }
}
