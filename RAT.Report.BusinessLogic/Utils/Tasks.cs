using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.BusinessLogic.Utils
{
    public static class Tasks
    {
        public static async Task<IEnumerable<T>> CatchWhenAll<T>(params Func<Task<T>>[] items)
        {
            var tasks = new List<Task<T>>();
            foreach (var item in items)
            {
                tasks.Add(item.Invoke());
            }
            await Task.WhenAll(tasks);

            return tasks.Select(m => m.Result);
        }
        public static async Task<Tuple<T1, T2>> CatchWhenAll<T1, T2>(Func<Task<T1>> items1, Func<Task<T2>> items2)
        {
            var task1 = items1.Invoke();
            var task2 = items2.Invoke();
            await Task.WhenAll(task1, task2);

            return new Tuple<T1, T2>(task1.Result, task2.Result);
        }
        public static async Task<Tuple<T1, T2, T3>> CatchWhenAll<T1, T2, T3>(Func<Task<T1>> items1, Func<Task<T2>> items2, Func<Task<T3>> items3)
        {
            var task1 = items1.Invoke();
            var task2 = items2.Invoke();
            var task3 = items3.Invoke();
            await Task.WhenAll(task1, task2, task3);

            return new Tuple<T1, T2, T3>(task1.Result, task2.Result, task3.Result);
        }
        public static async Task<Tuple<T1, T2, T3, T4>> CatchWhenAll<T1, T2, T3, T4>(Func<Task<T1>> items1, Func<Task<T2>> items2, Func<Task<T3>> items3, Func<Task<T4>> items4)
        {
            var task1 = items1.Invoke();
            var task2 = items2.Invoke();
            var task3 = items3.Invoke();
            var task4 = items4.Invoke();
            await Task.WhenAll(task1, task2, task3, task4);

            return new Tuple<T1, T2, T3, T4>(task1.Result, task2.Result, task3.Result, task4.Result);
        }
        public static async Task<Tuple<T1, T2, T3, T4, T5>> CatchWhenAll<T1, T2, T3, T4, T5>(Func<Task<T1>> items1, Func<Task<T2>> items2, Func<Task<T3>> items3, Func<Task<T4>> items4, Func<Task<T5>> items5)
        {
            var task1 = items1.Invoke();
            var task2 = items2.Invoke();
            var task3 = items3.Invoke();
            var task4 = items4.Invoke();
            var task5 = items5.Invoke();
            await Task.WhenAll(task1, task2, task3, task4, task5);

            return new Tuple<T1, T2, T3, T4, T5>(task1.Result, task2.Result, task3.Result, task4.Result, task5.Result);
        }
        public static async Task<Tuple<T1, T2, T3, T4, T5, T6>> CatchWhenAll<T1, T2, T3, T4, T5, T6>(Func<Task<T1>> items1, Func<Task<T2>> items2, Func<Task<T3>> items3, Func<Task<T4>> items4, Func<Task<T5>> items5, Func<Task<T6>> items6)
        {
            var task1 = items1.Invoke();
            var task2 = items2.Invoke();
            var task3 = items3.Invoke();
            var task4 = items4.Invoke();
            var task5 = items5.Invoke();
            var task6 = items6.Invoke();
            await Task.WhenAll(task1, task2, task3, task4, task5, task6);

            return new Tuple<T1, T2, T3, T4, T5, T6>(task1.Result, task2.Result, task3.Result, task4.Result, task5.Result, task6.Result);
        }
    }
}
