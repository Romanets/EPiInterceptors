using System;
using System.Collections.Generic;
using Castle.DynamicProxy;
using EPiServer.ServiceLocation;

namespace EPiInterceptors
{
    /// <summary>
    /// Represents the minimal interface of content data interceptors registration component.
    /// </summary>
    public interface IContentDataInterceptonRegistry
    {
        /// <summary>
        /// Gets the auto property interceptors.
        /// </summary>
        /// <returns>
        /// Interceptor instances collection.
        /// </returns>
        IEnumerable<IAutoPropertyInterceptor> GetAutoPropertyInterceptors();

        /// <summary>
        /// Gets the custom interceptors.
        /// </summary>
        /// <returns>
        /// Interceptor instances collection.
        /// </returns>
        IEnumerable<IInterceptor> GetCustomInterceptors();
    }

    /// <summary>
    /// Represents content data interceptors registration component.
    /// </summary>
    public class ContentDataInterceptonRegistry : IContentDataInterceptonRegistry
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ContentDataInterceptonRegistry"/> class.
        /// </summary>
        public ContentDataInterceptonRegistry()
        {
            AutoPropertyInterceptorTypes = new InterceptorTypeList<IAutoPropertyInterceptor>();
            CustomInterceptorTypes = new InterceptorTypeList<IInterceptor>();
        }

        /// <summary>
        /// Provides interceptors that extends standard EpiServer interception pipeline and support only public virtual auto properties that is handled by EpiServer as well.
        /// </summary>
        public IList<Type> AutoPropertyInterceptorTypes { get; private set; }

        /// <summary>
        /// Provides the interceptor that extends standard EpiServer interception pipeline can be used to support any custom interception.
        /// </summary>
        public IList<Type> CustomInterceptorTypes { get; private set; }

        /// <summary>
        /// Gets the auto property interceptors.
        /// </summary>
        /// <returns>
        /// Interceptor instances collection.
        /// </returns>
        public IEnumerable<IAutoPropertyInterceptor> GetAutoPropertyInterceptors()
        {
            return GetInstances<IAutoPropertyInterceptor>(AutoPropertyInterceptorTypes);
        }

        /// <summary>
        /// Gets the custom interceptors.
        /// </summary>
        /// <returns>
        /// Interceptor instances collection.
        /// </returns>
        public IEnumerable<IInterceptor> GetCustomInterceptors()
        {
            return GetInstances<IInterceptor>(CustomInterceptorTypes);
        }

        /// <summary>
        /// Adds <see cref="IAutoPropertyInterceptor"/> of the specified type to the data content interception pipeline.
        /// </summary>
        /// <typeparam name="TInterceptor">The type of the interceptor.</typeparam>
        public void InterceptAutoPropertyWith<TInterceptor>()
            where TInterceptor : IAutoPropertyInterceptor
        {
            AutoPropertyInterceptorTypes.Add(typeof(TInterceptor));
        }

        /// <summary>
        /// Adds <see cref="IInterceptor"/> of the specified type to the data content interception pipeline.
        /// </summary>
        /// <typeparam name="TInterceptor">The type of the interceptor.</typeparam>
        public void InterceptWith<TInterceptor>()
            where TInterceptor : IInterceptor
        {
            CustomInterceptorTypes.Add(typeof(TInterceptor));
        }

        /// <summary>
        /// Gets the instances of specified types collection using DI service locator.
        /// </summary>
        /// <typeparam name="TOut">The base output type of items.</typeparam>
        /// <param name="types">The item types.</param>
        /// <returns>
        /// The items collection.
        /// </returns>
        private static IEnumerable<TOut> GetInstances<TOut>(IEnumerable<Type> types)
        {
            Dictionary<Type, TOut> instances = new Dictionary<Type, TOut>();

            foreach (Type type in types)
            {
                if (!instances.ContainsKey(type))
                {
                    instances.Add(type, (TOut)ServiceLocator.Current.GetInstance(type));
                }
            }

            return instances.Values;
        }
    }
}