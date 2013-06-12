using System;
using System.Collections;
using System.Collections.Generic;

namespace EPiInterceptors
{
    internal class InterceptorTypeList<T> : IList<Type>
    {
        private readonly IList<Type> _list = new List<Type>();

        public Type this[int index]
        {
            get { return _list[index]; }
            set
            {
                ValidateItem(value, index);
                _list[index] = value;
            }
        }

        public int Count { get { return _list.Count; } }

        public bool IsReadOnly { get { return _list.IsReadOnly; } }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public IEnumerator<Type> GetEnumerator()
        {
            return _list.GetEnumerator();
        }

        public void Add(Type item)
        {
            ValidateItem(item);
            _list.Add(item);
        }

        public void Clear()
        {
            _list.Clear();
        }

        public bool Contains(Type item)
        {
            return _list.Contains(item);
        }

        public void CopyTo(Type[] array, int arrayIndex)
        {
            _list.CopyTo(array, arrayIndex);
        }

        public bool Remove(Type item)
        {
            return _list.Remove(item);
        }

        public int IndexOf(Type item)
        {
            return _list.IndexOf(item);
        }

        public void Insert(int index, Type item)
        {
            ValidateItem(item);
            _list.Insert(index, item);
        }

        public void RemoveAt(int index)
        {
            _list.RemoveAt(index);
        }

        // ReSharper disable UnusedParameter.Local
        private void ValidateItem(Type item, int replaceIndex = -1)
        // ReSharper restore UnusedParameter.Local
        {
            const string itemParamName = "item";
            if (item == null)
            {
                throw new ArgumentNullException(itemParamName);
            }

            if (!typeof(T).IsAssignableFrom(item))
            {
                throw new ArgumentException("Item type is not supported.", itemParamName);
            }

           /* if (replaceIndex > 0 && _list.IndexOf(item) != replaceIndex)
            {
                throw new ArgumentException("Item duplicate is not allowed.", itemParamName);
            }*/
        }
    }
}
