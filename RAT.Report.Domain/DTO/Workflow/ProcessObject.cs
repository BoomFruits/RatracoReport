using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.Workflow
{
    public class ProcessObject : ProcessObject<int>
    {
        public ProcessObject(ProcessEntity process, object objectEntity) : base(process, objectEntity)
        {
        }
    }
    public class ProcessObject<TPrimaryKey>
    {
        private ProcessEntity _process { get; set; }
        private IDictionary<string, object> _data { get; set; }
        public string TableSchema
        {
            get
            {
                return _process.ObjectTableSchema;
            }
        }
        public string TableName
        {
            get
            {
                return _process.ObjectTableName;
            }
        }
        public string TableKeyName
        {
            get
            {
                return _process.ObjectTableKeyName;
            }
        }
        public TPrimaryKey PrimaryKey
        {
            get
            {
                if (_data.ContainsKey(TableKeyName))
                {
                    return (TPrimaryKey)_data[TableKeyName];
                }
                return default(TPrimaryKey);
            }
        }
        public TPrimaryKey ObjectKey
        {
            get
            {
                if (_data.ContainsKey(TableKeyName))
                {
                    return (TPrimaryKey)_data[TableKeyName];
                }
                return default(TPrimaryKey);
            }
        }
        public int? ObjectStatus
        {
            get
            {
                if (ContainsKey(_process.ObjectStatusFieldName))
                {
                    return GetValue<int>(_process.ObjectStatusFieldName);
                }
                return null;
            }
        }
        public string ObjectDisplay
        {
            get
            {
                if (!string.IsNullOrEmpty(_process.ObjectDisplayFieldName) && ContainsKey(_process.ObjectDisplayFieldName))
                {
                    var obj = GetValue<object>(_process.ObjectDisplayFieldName);
                    return (obj != null) ? obj.ToString() : null;
                }
                return null;
            }
        }
        public ProcessObject(ProcessEntity process, object objectEntity)
        {
            _process = process;
            _data = objectEntity as IDictionary<string, object>;
        }
        public bool ContainsKey(string name)
        {
            return _data.ContainsKey(name);
        }
        public object GetValue(string name)
        {
            if (ContainsKey(name))
            {
                return _data[name];
            }
            return null;
        }
        public T GetValue<T>(string name)
        {
            if (ContainsKey(name))
            {
                return (T)_data[name];
            }
            return default(T);
        }
    }
}
