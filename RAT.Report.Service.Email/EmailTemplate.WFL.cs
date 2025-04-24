using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Service.Email
{
    public static partial class EmailTemplate
    {
        public static class WFL
        {
            /// <summary>
            /// WFL_TrinhDuyetToPhanQuyen: Email thông báo gửi yêu cầu trình duyệt tới cán bộ phân quyền
            /// </summary>
            public static string TrinhDuyetToPhanQuyen
            {
                get
                {
                    return ConfigValue.WFL_TrinhDuyetToPhanQuyen.ToString();
                }
            }

            /// <summary>
            /// WFL_TrinhDuyetToUyQuyen: Email thông báo gửi yêu cầu trình duyệt tới cán bộ ủy quyền
            /// </summary>
            public static string TrinhDuyetToUyQuyen
            {
                get
                {
                    return ConfigValue.WFL_TrinhDuyetToUyQuyen.ToString();
                }
            }

            /// <summary>
            /// WFL_TrinhDuyetToCapTren: Email thông báo gửi yêu cầu trình duyệt đến cán bộ phân quyền khi các cán bộ cấp dưới bất đồng phê duyệt
            /// </summary>
            public static string TrinhDuyetToCapTren
            {
                get
                {
                    return ConfigValue.WFL_TrinhDuyetToCapTren.ToString();
                }
            }

            /// <summary>
            /// WFL_DongYPheDuyet: Email thông báo đã đồng ý phê duyệt
            /// </summary>
            public static string DongYPheDuyet
            {
                get
                {
                    return ConfigValue.WFL_DongYPheDuyet.ToString();
                }
            }

            /// <summary>
            /// WFL_TuChoiPheDuyet: Email thông báo bị từ chối phê duyệt
            /// </summary>
            public static string TuChoiPheDuyet
            {
                get
                {
                    return ConfigValue.WFL_TuChoiPheDuyet.ToString();
                }
            }

            /// <summary>
            /// Enum config
            /// </summary>
            private enum ConfigValue
            {
                WFL_TrinhDuyetToPhanQuyen,
                WFL_TrinhDuyetToUyQuyen,
                WFL_TrinhDuyetToCapTren,
                WFL_DongYPheDuyet,
                WFL_TuChoiPheDuyet
            }
        }
    }
}
