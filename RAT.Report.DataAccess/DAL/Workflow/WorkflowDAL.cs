using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RAT.Report.Domain.Entities.Workflow;
using TLS.Lib.Net.Log;
using TLS.Lib.Net.Data;
using RAT.Report.Domain.DTO.Workflow;
using TLS.Lib.Net.Json;
using System.Data;
using RAT.Report.Domain.Constants;

namespace RAT.Report.DataAccess.DAL.Workflow
{
    public static class WorkflowDAL
    {
        private static ILogger Logger = Logging.GetLogger(typeof(WorkflowDAL));

        public static async Task<ProcessEntity> GetOneProcess(short processID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Process] where ProcessID = @processID";
                    var param = new
                    {
                        processID
                    };

                    var res = await conn.QueryAsync<ProcessEntity>(sql, param);
                    return res.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneProcess exception with processID={0}", processID);
                throw;
            }
        }
        public static async Task<IEnumerable<ProcessEntity>> GetListProcess(byte? processType = null)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Process] where (@processType is null or ProcessType = @processType)";
                    var param = new
                    {
                        processType
                    };

                    return await conn.QueryAsync<ProcessEntity>(sql, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListProcess exception with processType={0}", processType);
                throw;
            }
        }
        public static async Task<PhanQuyenEntity> GetOnePhanQuyen(int phanQuyenID)
        {
            using (var conn = DataAccess.OpenConnection())
            {
                var sql = "select * from [wfl].[PhanQuyen] where ID = @phanQuyenID";
                var param = new
                {
                    phanQuyenID
                };

                var res = await conn.QueryAsync<PhanQuyenEntity>(sql, param);
                return res.FirstOrDefault();
            }
        }
        public static async Task<PhanQuyenDTO> GetPhanQuyenByID(int phanQuyenID)
        {
            using (var conn = DataAccess.OpenConnection())
            {
                var sql = "[wfl].[UyQuyen_GetPhanQuyenById]";
                var param = new
                {
                    phanQuyenID
                };

                var res = await conn.QuerySpAsync<PhanQuyenDTO>(sql, param);
                return res.FirstOrDefault();
            }
        }

        public static async Task<PhanQuyenEntity> GetPhanQuyenByCanBoXuLy(string username)
        {
            using (var conn = DataAccess.OpenConnection())
            {
                var sql = "select * from [wfl].[PhanQuyen] where CanBoXuLy = @username";
                var param = new
                {
                    username
                };

                var res = await conn.QueryAsync<PhanQuyenEntity>(sql, param);
                return res.FirstOrDefault();
            }
        }
        public static async Task<IEnumerable<PhanQuyenEntity>> GetListPhanQuyen()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[PhanQuyen]";

                    return await conn.QueryAsync<PhanQuyenEntity>(sql, null);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListPhanQuyen Exception ");
                throw;
            }
        }


        public static async Task<IEnumerable<PhanQuyenEntity>> GetListPhanQuyenByProcess(short processID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = "[wfl].[GetListPhanQuyen]";
                    var param = new
                    {
                        processID
                    };

                    return await conn.QuerySpAsync<PhanQuyenEntity>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListPhanQuyen Exception with processID={0}", processID);
                throw;
            }
        }
        public static async Task<IEnumerable<ListPhanQuyenOutput>> GetListPhanQuyenByIdProcess(short processID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = "[wfl].[GetAllPhanQuyen]";
                    var param = new
                    {
                        processID
                    };

                    return await conn.QuerySpAsync<ListPhanQuyenOutput>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListPhanQuyen Exception with processID={0}", processID);
                throw;
            }
        }
        public static async Task<bool> CapNhatPhanQuyen(PhanQuyenEntity phanQuyen)
        {
            if (phanQuyen.ID > 0)
            {
                return await UpdatePhanQuyen(phanQuyen);
            }
            else
            {
                return await InsertPhanQuyen(phanQuyen);
            }
        }
        private static async Task<bool> InsertPhanQuyen(PhanQuyenEntity phanQuyen)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"INSERT INTO [wfl].[PhanQuyen]
                                       ([CreatedBy]
                                       ,[CreatedTime]
                                       ,[ProcessID]
                                       ,[CanBoXuLy]
                                       ,[CapXuLy]
                                       ,[Email]
                                       ,[PhoneNumber]
                                       ,[ApDungTu]
                                       ,[ApDungDen])
                                 VALUES
                                       (@CreatedBy
                                       ,isnull(@CreatedTime, getdate())
                                       ,@ProcessID
                                       ,@CanBoXuLy
                                       ,@CapXuLy
                                       ,@Email
                                       ,@PhoneNumber
                                       ,@ApDungTu
                                       ,@ApDungDen)";

                    var res = await conn.ExecuteAsync(sql, phanQuyen);
                    return res > 0;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "InsertPhanQuyen Exception with phanQuyen={0}", phanQuyen.SerializeObject());
                throw;
            }
        }
        private static async Task<bool> UpdatePhanQuyen(PhanQuyenEntity phanQuyen)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"UPDATE [wfl].[PhanQuyen]
                                   SET [CanBoXuLy] = @CanBoXuLy
                                      ,[CapXuLy] = @CapXuLy
                                      ,[Email] = @Email
                                      ,[PhoneNumber] = @PhoneNumber
                                      ,[ApDungTu] = @ApDungTu
                                      ,[ApDungDen] = @ApDungDen
                                 WHERE ID = @ID";

                    var res = await conn.ExecuteAsync(sql, phanQuyen);
                    return res > 0;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "UpdatePhanQuyen Exception with phanQuyen={0}", phanQuyen.SerializeObject());
                throw;
            }
        }
        public static async Task<ReferenceEntity> GetOneReference(int referenceID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Reference] where ID = @referenceID";
                    var param = new
                    {
                        referenceID
                    };

                    var res = await conn.QueryAsync<ReferenceEntity>(sql, param);
                    return res.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneReference exception with processID={0}", referenceID);
                throw;
            }
        }
        public static async Task<bool> CapNhatUyQuyen(UyQuyenEntity uyQuyen, IEnumerable<DieuKienUyQuyenEntity> dieuKiens)
        {
            // Throw if null of parameter uyQuyen
            if (uyQuyen == null) throw new ArgumentNullException(nameof(uyQuyen));

            // Throw if null of parameter dieuKiens
            if (uyQuyen.CoDieuKien && dieuKiens == null)
            {
                throw new ArgumentNullException(nameof(dieuKiens));
            }

            // Begin insert data
            using (var conn = DataAccess.OpenConnection())
            {
                using (var tran = conn.BeginTransaction())
                {
                    try
                    {

                        // Xoa di truoc khi insert
                        if (uyQuyen.ID > 0)
                        {
                            await DeleteDieuKienUyQuyenByUyQuyenInternal(conn, tran, uyQuyen.ID);
                        }
                        // insert request
                        var res = await CapNhatUyQuyenInternal(conn, tran, uyQuyen);
                        if (!res)
                        {
                            throw new Exception(string.Format("CapNhatUyQuyenInternal fail [uyQuyen={0}]", uyQuyen.SerializeObject()));
                        }

                        // Insert list dieu kien
                        if (uyQuyen.CoDieuKien)
                        {
                            foreach (var dieuKien in dieuKiens)
                            {
                                dieuKien.UyQuyenID = uyQuyen.ID;
                                res = await InsertDieuKienUyQuyenInternal(conn, tran, dieuKien);
                                if (!res)
                                {
                                    throw new Exception(string.Format("CapNhatDieuKienUyQuyenInternal fail [uyQuyen={0}, dieuKien={1}]"
                                        , uyQuyen.SerializeObject()
                                        , dieuKien.SerializeObject()));
                                }
                            }
                        }
                        

                        // Commit to end
                        tran.Commit();

                        return true;
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        Logger.ErrorFormat(ex, "CapNhatUyQuyen exception [uyQuyen={0}, dieuKiens={1}]", uyQuyen.SerializeObject(), uyQuyen.CoDieuKien ? dieuKiens.SerializeObject() : null);
                        return false;
                    }
                }
            }
        }
        private static async Task<bool> CapNhatUyQuyenInternal(IDbConnection conn, IDbTransaction tran, UyQuyenEntity uyQuyen)
        {
            if (uyQuyen.ID > 0)
            {
                return await UpdateUyQuyenInternal(conn, tran, uyQuyen);
            }
            else
            {
                return await InsertUyQuyenInternal(conn, tran, uyQuyen);
            }
        }
        private static async Task<bool> InsertUyQuyenInternal(IDbConnection conn, IDbTransaction tran, UyQuyenEntity uyQuyen)
        {
            var sql = @"INSERT INTO [wfl].[UyQuyen]
                               ([CreatedBy]
                               ,[CreatedTime]
                               ,[PhanQuyenID]
                               ,[CanBoNhanUyQuyen]
                               ,[CoDieuKien]
                               ,[Email]
                               ,[PhoneNumber]
                               ,[Timeout]
                               ,[GhiChu]
                               ,[ApDungTu]
                               ,[ApDungDen])
                         VALUES
                               (@CreatedBy
                               ,isnull(@CreatedTime, getdate())
                               ,@PhanQuyenID
                               ,@CanBoNhanUyQuyen
                               ,@CoDieuKien
                               ,@Email
                               ,@PhoneNumber
                               ,@Timeout
                               ,@GhiChu
                               ,@ApDungTu
                               ,@ApDungDen)";
            var identity = await conn.ExecuteScalarAsync<int>(sql.AppendGetIdentity(), uyQuyen, tran);
            if (identity > 0)
            {
                uyQuyen.ID = identity;
                return true;
            }
            return false;
        }
        private static async Task<bool> UpdateUyQuyenInternal(IDbConnection conn, IDbTransaction tran, UyQuyenEntity uyQuyen)
        {
            var sql = @"UPDATE [wfl].[UyQuyen]
                           SET [PhanQuyenID] = @PhanQuyenID
                              ,[CanBoNhanUyQuyen] = @CanBoNhanUyQuyen
                              ,[CoDieuKien] = @CoDieuKien
                              ,[Email] = @Email
                              ,[PhoneNumber] = @PhoneNumber
                              ,[Timeout] = @Timeout
                              ,[GhiChu] = @GhiChu
                              ,[ApDungTu] = @ApDungTu
                              ,[ApDungDen] = @ApDungDen
                        WHERE ID = @ID";
            var res = await conn.ExecuteAsync(sql, uyQuyen, tran);
            return res > 0;
        }
        private static async Task<bool> InsertDieuKienUyQuyenInternal(IDbConnection conn, IDbTransaction tran, DieuKienUyQuyenEntity dieuKien)
        {
            var sql = @"INSERT INTO [wfl].[DieuKienUyQuyen]
                               ([UyQuyenID]
                               ,[LoaiDieuKien]
                               ,[ReferenceID]
                               ,[DienGiai]
                               ,[DKienStringValue]
                               ,[DKienBoolValue]
                               ,[DKienIntValue]
                               ,[DKienFloatValue]
                               ,[DKienDecimalValue]
                               ,[DKienDateValue]
                               ,[DKienTimeValue])
                         VALUES
                               (@UyQuyenID
                               ,@LoaiDieuKien
                               ,@ReferenceID
                               ,@DienGiai
                               ,@DKienStringValue
                               ,@DKienBoolValue
                               ,@DKienIntValue
                               ,@DKienFloatValue
                               ,@DKienDecimalValue
                               ,@DKienDateValue
                               ,@DKienTimeValue)";
            var res = await conn.ExecuteAsync(sql, dieuKien, tran);
            return res > 0;
        }
        private static async Task<bool> DeleteDieuKienUyQuyenByUyQuyenInternal(IDbConnection conn, IDbTransaction tran, int uyQuyenID)
        {
            var sql = @"DELETE FROM [wfl].[DieuKienUyQuyen] where UyQuyenID = @uyQuyenID";
            var param = new
            {
                uyQuyenID
            };
            var res = await conn.ExecuteAsync(sql, param, tran);
            return res > 0;
        }
        public static async Task<UyQuyenEntity> GetOneUyQuyen(int uyQuyenID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"select * from wfl.UyQuyen where ID = @uyQuyenID";
                    var param = new
                    {
                        uyQuyenID
                    };
                    var res = await conn.QueryAsync<UyQuyenEntity>(sp, param);
                    return res.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneUyQuyen Exception with uyQuyenID={0}", uyQuyenID);
                throw;
            }
        }
        public static async Task<IEnumerable<UyQuyenEntity>> GetListUyQuyen(short processID, int? phanQuyenID = null)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[GetListUyQuyen]";
                    var param = new
                    {
                        processID,
                        phanQuyenID
                    };
                    return await conn.QuerySpAsync<UyQuyenEntity>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListUyQuyen Exception with processID={0}", processID);
                throw;
            }
        }
        public static async Task<IEnumerable<DieuKienUyQuyenInfo>> GetListDieuKienUyQuyen(short processID, int? phanQuyenID = null, int? uyQuyenID = null)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[GetListDieuKienUyQuyen]";
                    var param = new
                    {
                        processID,
                        phanQuyenID,
                        uyQuyenID
                    };
                    return await conn.QuerySpAsync<DieuKienUyQuyenInfo>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListDieuKienUyQuyen Exception with processID={0}", processID);
                throw;
            }
        }
        public static async Task<TaskEntity> GetOneTask(int taskID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Tasks] where ID = @taskID";
                    var param = new
                    {
                        taskID
                    };

                    var res = await conn.QueryAsync<TaskEntity>(sql, param);
                    return res.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneTask Exception with taskID={0}", taskID);
                throw;
            }
        }
        public static async Task<bool> DeletePhanQuyen(int id)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"[wfl].[DeletePhanQuyen]";
                    var param = new
                    {
                        id
                    };

                    await conn.ExecuteSpAsync(sql, param);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneTask Exception with taskID={0}", id);
                throw;
            }
        }
        public static async Task<RequestEntity> GetOneRequest(int requestID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Requests] where ID = @requestID";
                    var param = new
                    {
                        requestID
                    };

                    var res = await conn.QueryAsync<RequestEntity>(sql, param);
                    return res.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneRequest Exception with requestID={0}", requestID);
                throw;
            }
        }
        public static async Task<bool> IsDangTrinhDuyet(short processID, int objectID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"select count(*) as CNT
                                from [wfl].[Requests] r
                                where r.ProcessID = @processID
                                    and r.RequestObjectID = @objectID
                                    and r.[KetQuaXuLy] = @trinhDuyet";
                    var param = new
                    {
                        processID,
                        objectID,
                        trinhDuyet = WFL_KetQuaXuLy.TrinhDuyet
                    };

                    var res = await conn.ExecuteScalarAsync<int>(sql, param);
                    return res > 0;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "IsDangTrinhDuyet exception [processID={0}, objectID={1}]", processID, objectID);
                throw;
            }
        }
        public static async Task<IEnumerable<TaskEntity>> GetListTask(short processID, int objectID, int requestID, bool? isUyQuyen = null, byte? trangThaiThucHien = null)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[GetListTask]";
                    var param = new
                    {
                        processID,
                        objectID,
                        requestID,
                        isUyQuyen,
                        trangThaiThucHien
                    };

                    return await conn.QuerySpAsync<TaskEntity>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListTask exception [processID={0}, objectID={1}, isUyQuyen={3}, trangThaiThucHien={4}]", processID, objectID, isUyQuyen, trangThaiThucHien);
                throw;
            }
        }
        public static async Task<IEnumerable<TaskInfo>> GetTasksByObject(short processID, int objectID, byte? trangThaiThucHien)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[GetTasksByObject]";
                    var param = new
                    {
                        processID,
                        objectID,
                        trangThaiThucHien
                    };

                    return await conn.QuerySpAsync<TaskInfo>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetTasksByObject exception [objectID={0}, trangThaiThucHien={1}]", objectID, trangThaiThucHien);
                throw;
            }
        }
        public static async Task<IEnumerable<TaskEntity>> GetTimeoutTasks()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[GetTimeoutTasks]";

                    return await conn.QuerySpAsync<TaskEntity>(sp);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetTimeoutTasks exception");
                throw;
            }
        }
        public static async Task TrinhDuyet(RequestEntity request, IEnumerable<TaskEntity> phanQuyenTasks, IEnumerable<TaskEntity> uyQuyenTasks)
        {
            // Throw if null of parameter request
            if (request == null) throw new ArgumentNullException(nameof(request));

            // Throw if null of parameter phanQuyenTasks
            if (phanQuyenTasks == null) throw new ArgumentNullException(nameof(phanQuyenTasks));

            // Throw if null of parameter uyQuyenTasks
            if (uyQuyenTasks == null) throw new ArgumentNullException(nameof(uyQuyenTasks));

            // Begin insert data
            using (var conn = DataAccess.OpenConnection())
            {
                using (var tran = conn.BeginTransaction())
                {
                    try
                    {
                        // insert request
                        var res = await InsertRequestsInternal(conn, tran, request);
                        if (!res)
                        {
                            throw new Exception(string.Format("Can not insert work flow request [request={0}]", request.SerializeObject()));
                        }

                        // List task of phan quyen
                        foreach(var phanQuyenTask in phanQuyenTasks)
                        {
                            phanQuyenTask.RequestID = request.ID;
                        }
                        res = await InsertTasksInternal(conn, tran, phanQuyenTasks);
                        if (!res)
                        {
                            throw new Exception(string.Format("Can not insert list tasks of phan quyen [request={0}, phanQuyenTasks={1}]"
                                , request.SerializeObject()
                                , phanQuyenTasks.SerializeObject()));
                        }

                        // List task of uy quyen
                        foreach (var uyQuyenTask in uyQuyenTasks)
                        {
                            var phanQuyenTask = phanQuyenTasks.Single(m => m.PhanQuyenID == uyQuyenTask.PhanQuyenID);
                            uyQuyenTask.UyQuyenByTaskID = phanQuyenTask.ID;
                            uyQuyenTask.RequestID = request.ID;
                        }
                        res = await InsertTasksInternal(conn, tran, uyQuyenTasks);
                        if (!res)
                        {
                            throw new Exception(string.Format("Can not insert list tasks of uy quyen [request={0}, uyQuyenTasks={1}]"
                                , request.SerializeObject()
                                , uyQuyenTasks.SerializeObject()));
                        }

                        // Commit to end
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        Logger.ErrorFormat(ex, "Insert trinh duyet data exception [request={0}, phanQuyenTasks={1}, uyQuyenTasks={2}]", request.SerializeObject(), phanQuyenTasks.SerializeObject(), uyQuyenTasks.SerializeObject());
                        throw;
                    }
                }
            }
        }
        public static async Task UpdateTrangThaiTask(IEnumerable<TaskEntity> tasks, RequestEntity request = null, ProcessEntity process = null, int? objectID = null)
        {
            // Throw if null of parameter tasks
            if (tasks == null) throw new ArgumentNullException(nameof(tasks));

            if (request != null)
            {
                // Throw if null of parameter process
                if (process == null) throw new ArgumentNullException(nameof(process));

                // Throw if null of parameter tasks
                if (!objectID.HasValue || objectID.Value == 0) throw new ArgumentNullException(nameof(objectID));
            }

            // Begin update data
            using (var conn = DataAccess.OpenConnection())
            {
                using (var tran = conn.BeginTransaction())
                {
                    try
                    {
                        // Update details
                        var res = await UpdateTasksInternal(conn, tran, tasks);
                        if (!res)
                        {
                            throw new Exception(string.Format("Can not update work flow task [tasks={0}]", tasks.SerializeObject()));
                        }

                        // Update masters
                        if (request != null)
                        {
                            // Update request
                            res = await UpdateRequestsInternal(conn, tran, request);
                            if (!res)
                            {
                                throw new Exception(string.Format("Can not update work flow request [request={0}]", request.SerializeObject()));
                            }

                            // Update process object as dong y
                            if (request.KetQuaXuLy == WFL_KetQuaXuLy.DongYDuyet && process.ObjectStatusDongY.HasValue)
                            {
                                res = await UpdateProcessObjectInternal(conn, tran, process, objectID.Value, process.ObjectStatusDongY.Value);
                                if (!res)
                                {
                                    throw new Exception(string.Format("Can not update work flow process object as dong y [process={0}, objectID={1}, ObjectStatusDongY={2}]", process.SerializeObject(), objectID, process.ObjectStatusDongY));
                                }
                            }

                            // Update process object as tu choi
                            if (request.KetQuaXuLy == WFL_KetQuaXuLy.TuChoiDuyet && process.ObjectStatusTuChoi.HasValue)
                            {
                                res = await UpdateProcessObjectInternal(conn, tran, process, objectID.Value, process.ObjectStatusTuChoi.Value);
                                if (!res)
                                {
                                    throw new Exception(string.Format("Can not update work flow process object as tu choi [process={0}, objectID={1}, ObjectStatusTuChoi={2}]", process.SerializeObject(), objectID, process.ObjectStatusTuChoi));
                                }
                            }
                        }

                        // Commit to end
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        Logger.ErrorFormat(ex, "Insert trinh duyet data exception [tasks={0}, request={1}]", tasks.SerializeObject(), request != null ? request.SerializeObject() : null);
                        throw;
                    }
                }
            }
        }
        public static async Task<bool> InsertRequests(RequestEntity request)
        {
            // Throw if null of parameter request
            if (request == null) throw new ArgumentNullException(nameof(request));

            // Begin insert
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    return await InsertRequestsInternal(conn, null, request);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "InsertRequests exception [request={0}]", request.SerializeObject());
                throw;
            }
        }
        private static async Task<bool> InsertRequestsInternal(IDbConnection conn, IDbTransaction tran, RequestEntity request)
        {
            var sql = @"INSERT INTO [wfl].[Requests]
                                ([ProcessID]
                                ,[RequestBy]
                                ,[RequestEmail]
                                ,[RequestMobile]
                                ,[RequestTime]
                                ,[RequestObjectID]
                                ,[KetQuaXuLy])
                            VALUES
                                (@ProcessID
                                ,@RequestBy
                                ,@RequestEmail
                                ,@RequestMobile
                                ,isnull(@RequestTime, getdate())
                                ,@RequestObjectID
                                ,@KetQuaXuLy)";
            var identity = await conn.ExecuteScalarAsync<int>(sql.AppendGetIdentity(), request, tran);
            if (identity > 0)
            {
                request.ID = identity;
                return true;
            }
            return false;
        }
        public static async Task<bool> InsertTasks(IEnumerable<TaskEntity> tasks)
        {
            // Throw if null of parameter tasks
            if (tasks == null) throw new ArgumentNullException(nameof(tasks));

            // Begin insert
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    return await InsertTasksInternal(conn, null, tasks);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "InsertTasks exception [tasks={0}]", tasks.SerializeObject());
                throw;
            }
        }
        public static async Task<bool> InsertTasks(TaskEntity task)
        {
            // Throw if null of parameter task
            if (task == null) throw new ArgumentNullException(nameof(task));

            // Begin insert
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    return await InsertTasksInternal(conn, null, task);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "InsertTasks exception [task={0}]", task.SerializeObject());
                throw;
            }
        }
        private static async Task<bool> InsertTasksInternal(IDbConnection conn, IDbTransaction tran, IEnumerable<TaskEntity> tasks)
        {
            foreach (var task in tasks)
            {
                await InsertTasksInternal(conn, tran, task);
            }
            return !tasks.Any(m => m.ID == 0);
        }
        private static async Task<bool> InsertTasksInternal(IDbConnection conn, IDbTransaction tran, TaskEntity task)
        {
            var sql = @"INSERT INTO [wfl].[Tasks]
                                ([ProcessID]
                                ,[ObjectID]
                                ,[RequestID]
                                ,[NguoiTrinh]
                                ,[ThoiDiemTrinh]
                                ,[CanBoXuLy]
                                ,[CapXuLy]
                                ,[ThoiHanXuLy]
                                ,[PhanQuyenID]
                                ,[IsUyQuyen]
                                ,[UyQuyenID]
                                ,[UyQuyenByTaskID]
                                ,[UyQuyenByCanBo]
                                ,[Email]
                                ,[PhoneNumber]
                                ,[TrangThaiThucHien])
                            VALUES
                                (@ProcessID
                                ,@ObjectID
                                ,@RequestID
                                ,@NguoiTrinh
                                ,isnull(@ThoiDiemTrinh, getdate())
                                ,@CanBoXuLy
                                ,@CapXuLy
                                ,@ThoiHanXuLy
                                ,@PhanQuyenID
                                ,@IsUyQuyen
                                ,@UyQuyenID
                                ,@UyQuyenByTaskID
                                ,@UyQuyenByCanBo
                                ,@Email
                                ,@PhoneNumber
                                ,@TrangThaiThucHien)";
            var identity = await conn.ExecuteScalarAsync<int>(sql.AppendGetIdentity(), task, tran);
            if (identity > 0)
            {
                task.ID = identity;
                return true;
            }
            return false;
        }
        public static async Task<bool> UpdateRequests(RequestEntity request)
        {
            // Throw if null of parameter request
            if (request == null) throw new ArgumentNullException(nameof(request));

            // Begin insert
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    return await UpdateRequestsInternal(conn, null, request);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "UpdateRequests exception [request={0}]", request.SerializeObject());
                throw;
            }
        }
        private static async Task<bool> UpdateRequestsInternal(IDbConnection conn, IDbTransaction tran, RequestEntity request)
        {
            var sql = @"UPDATE [wfl].[Requests]
                           SET [KetQuaXuLy] = @KetQuaXuLy
                              ,[ApprovedTime] = isnull(@ApprovedTime, getdate())
                              ,[ApprovedBy] = @ApprovedBy
                              ,[ApprovedNote] = @ApprovedNote
                              ,[RejectedTime] = isnull(@RejectedTime, getdate())
                              ,[RejectedBy] = @RejectedBy
                              ,[RejectedNote] = @RejectedNote
                        WHERE ID = @ID";
            var res = await conn.ExecuteAsync(sql, request, tran);
            return res > 0;
        }
        public static async Task<bool> UpdateTasks(TaskEntity task)
        {
            // Throw if null of parameter task
            if (task == null) throw new ArgumentNullException(nameof(task));

            // Begin insert
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    return await UpdateTasksInternal(conn, null, task);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "UpdateTasks exception [task={0}]", task.SerializeObject());
                throw;
            }
        }
        public static async Task<bool> UpdateTasks(IEnumerable<TaskEntity> tasks)
        {
            // Throw if null of parameter tasks
            if (tasks == null) throw new ArgumentNullException(nameof(tasks));

            // Begin insert
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    return await UpdateTasksInternal(conn, null, tasks);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "UpdateTasks exception [tasks={0}]", tasks.SerializeObject());
                throw;
            }
        }
        private static async Task<bool> UpdateTasksInternal(IDbConnection conn, IDbTransaction tran, IEnumerable<TaskEntity> entities)
        {
            var tasks = new List<Task<bool>>();
            foreach (var entity in entities)
            {
                tasks.Add(UpdateTasksInternal(conn, tran, entity));
            }
            var result = await Task.WhenAll(tasks);
            return result.Where(success => !success).Count() == 0;
        }
        private static async Task<bool> UpdateTasksInternal(IDbConnection conn, IDbTransaction tran, TaskEntity entity)
        {
            var sql = @"UPDATE [wfl].[Tasks]
                           SET [TrangThaiThucHien] = @TrangThaiThucHien
                              ,[ThoiDiemThucHien] = isnull(@ThoiDiemThucHien, getdate())
                              ,[NguoiThucHien] = @NguoiThucHien
                              ,[GhiChuThucHien] = @GhiChuThucHien
                        WHERE ID = @ID";
            var res = await conn.ExecuteAsync(sql, entity, tran);
            return res > 0;
        }

        public static async Task<ProcessObject> GetOneProcessObject(short processID, int objectID)
        {
            var process = await GetOneProcess(processID);
            if (process == null)
            {
                throw new Exception("The process not found with processID = " + processID);
            }

            return await GetOneProcessObject(process, objectID);
        }
        public static async Task<ProcessObject> GetOneProcessObject(ProcessEntity process, int objectID)
        {
            // Throw if null of parameter phanQuyenIDs
            if (process == null) throw new ArgumentNullException(nameof(process));

            // Throw if invalid of parameter objectID
            if (objectID <= 0) throw new ArgumentNullException(nameof(objectID), "The parameter [objectID] must be a positive integer");

            // Begin query
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = string.Format("select * from [{0}].[{1}] where [{2}] = @objectID", 
                        process.ObjectTableSchema,
                        process.ObjectTableName,
                        process.ObjectTableKeyName
                        );
                    var param = new
                    {
                        objectID
                    };

                    var res = await conn.QueryAsync<object>(sql, param);
                    if (res.Count() > 0)
                    {
                        return new ProcessObject(process, res.FirstOrDefault());
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Exception with process={0}, objectID={1}", process.SerializeObject(), objectID);
                throw;
            }
        }

        public static async Task<bool> UpdateProcessObject(ProcessEntity process, int objectID, byte ketQuaXuLy)
        {
            // Throw if null of parameter phanQuyenIDs
            if (process == null) throw new ArgumentNullException(nameof(process));

            // Throw if invalid of parameter objectID
            if (objectID <= 0) throw new ArgumentNullException(nameof(objectID), "The parameter [objectID] must be a positive integer");

            // Begin update
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    return await UpdateProcessObjectInternal(conn, null, process, objectID, ketQuaXuLy);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Exception with process={0}, objectID={1}", process.SerializeObject(), objectID);
                throw;
            }
        }
        private static async Task<bool> UpdateProcessObjectInternal(IDbConnection conn, IDbTransaction tran, ProcessEntity process, int objectID, int objectStatus)
        {
            var sql = string.Format("update [{0}].[{1}] set [{2}] = @objectStatus where [{3}] = @objectID",
                        process.ObjectTableSchema,
                        process.ObjectTableName,
                        process.ObjectStatusFieldName,
                        process.ObjectTableKeyName
                        );
            var param = new
            {
                objectID,
                objectStatus
            };

            var res = await conn.ExecuteAsync(sql, param, tran);
            return res > 0;
        }
        public static async Task<IEnumerable<TaskCanBoOutput>> GetListTaskPheDuyetByUsername(string username)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[GetListTaskPheDuyetByUsername]";
                    var param = new
                    {
                        username
                    };
                    return await conn.QuerySpAsync<TaskCanBoOutput>(sp,param);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetTimeoutTasks exception");
                throw;
            }
        }
         public static async Task<IEnumerable<TaskCanBoOutput>> GetListTaskChoPheDuyetByUsername(string username)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[GetListTaskChoPheDuyetByUsername]";
                    var param = new
                    {
                        username
                    };
                    return await conn.QuerySpAsync<TaskCanBoOutput>(sp,param);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetTimeoutTasks exception");
                throw;
            }
        }

    }
}
