using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TLS.Lib.Excel;
using TLS.Lib.Net.IO;
using TLS.Lib.Net.Service;
//using TLS.Lib.OAuth;

namespace RAT.Report.Service.Excel
{
    public abstract class ReportBaseExcelService<TService> : BaseExcelService<TService> where TService : BaseService, IBaseExcelService
    {
        //protected override string UploadPath
        //{
        //    get
        //    {
        //        if (HttpContext.Current != null && HttpContext.Current.User != null)
        //        {
        //            var hisstoryPath = base.UploadPath + Path.DirectorySeparatorChar + HttpContext.Current.User.GetIdentityUserName();
        //            return FileUtils.MakeDir(hisstoryPath);
        //        }
        //        else
        //        {
        //            return base.UploadPath;
        //        }
        //    }
        //}
        public ReportBaseExcelService() : base()
        {

        }
        /*
        public bool SaveUploadedToSuccess(string successDir = "Success")
        {
            string fullSuccessDir = null;
            try
            {
                // Only success if has last uploaded file
                if (!string.IsNullOrEmpty(LastUploadedFile) && !string.IsNullOrEmpty(successDir))
                {
                    // If use success directory as full path
                    if (Directory.Exists(successDir))
                    {
                        fullSuccessDir = successDir;
                    }

                    // Get current user
                    else if (HttpContext.Current != null && HttpContext.Current.User != null)
                    {
                        fullSuccessDir = UploadPath + Path.DirectorySeparatorChar
                            + HttpContext.Current.User.GetIdentityUserName() + Path.DirectorySeparatorChar
                            + successDir.Replace(Path.AltDirectorySeparatorChar, Path.DirectorySeparatorChar).Trim(Path.DirectorySeparatorChar);
                    }

                    // When use consonle app
                    else
                    {
                        fullSuccessDir = UploadPath + Path.DirectorySeparatorChar
                            + successDir.Replace(Path.AltDirectorySeparatorChar, Path.DirectorySeparatorChar).Trim(Path.DirectorySeparatorChar);
                    }

                    // Make directory if not exists
                    if (!Directory.Exists(fullSuccessDir))
                    {
                        fullSuccessDir = FileUtils.MakeDir(fullSuccessDir);
                    }

                    // Copy last uploaded file to success file path
                    var successFilePath = fullSuccessDir + Path.DirectorySeparatorChar + Path.GetFileName(LastUploadedFile);
                    File.Copy(LastUploadedFile, successFilePath);

                    // Only success if copy file success
                    if (File.Exists(successFilePath))
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Can not save last uploaded file ({0}) to directory {1}", LastUploadedFile, fullSuccessDir);
                return false;
            }
        }*/
    }
}
