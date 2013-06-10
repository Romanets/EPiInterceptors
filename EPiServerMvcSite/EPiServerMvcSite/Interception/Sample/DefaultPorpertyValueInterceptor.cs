using System;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using Castle.DynamicProxy;

namespace EPiServerMvcSite.Interception
{
    public class DefaultPorpertyValueInterceptor : IInterceptor
    {
        private const string PropertyGetMethodPefix = "get_";

        public void Intercept(IInvocation invocation)
        {
            string methodName = invocation.Method.Name;

            // target method is property getter and return value
            if (!methodName.StartsWith(PropertyGetMethodPefix) || invocation.ReturnValue != null)
            {
                return;
            }

            // logic here for illustration purpose only and should be moved to separate service.
            if (methodName.StartsWith(PropertyGetMethodPefix))
            {
                object value = null;
                string propertyName = methodName.Substring(PropertyGetMethodPefix.Count());

                PropertyInfo propertyInfo = invocation.TargetType.GetProperty(propertyName);
                var defaultValueAttr = (DefaultValueAttribute)Attribute.GetCustomAttribute(propertyInfo, typeof(DefaultValueAttribute));
                if (defaultValueAttr != null)
                {
                    var defaultValue = defaultValueAttr.Value;
                    if (defaultValue != null && invocation.Method.ReturnType.IsInstanceOfType(defaultValue))
                    {
                        value = defaultValue;
                    }
                }

                invocation.ReturnValue = value;
            }
        }
    }
}