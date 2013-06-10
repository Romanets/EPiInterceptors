using System.Collections.Generic;
using Castle.DynamicProxy;
using EPiServer.ServiceLocation;

namespace EPiInterceptors
{
    /// <summary>
    /// Represents content data interceptors registration component.
    /// </summary>
    public class ContentDataInterceptonRegistry
    {
        public ContentDataInterceptonRegistry()
        {
            AutoPropertyInterceptors = new List<IAutoPropertyInterceptor>();
            CustomInterceptors = new List<IInterceptor>();
        }

        /// <summary>
        /// Provides interceptors that extends standard EpiServer interception pipeline and support only public virtual auto properties that is handled by EpiServer as well.
        /// </summary>
        public IList<IAutoPropertyInterceptor> AutoPropertyInterceptors { get; private set; }

        /// <summary>
        /// Provides the interceptor that extends standard EpiServer interception pipeline can be used to support any custom interception.
        /// </summary>
        public IList<IInterceptor> CustomInterceptors { get; private set; }

        /// <summary>
        /// Adds <see cref="IAutoPropertyInterceptor"/> of the specified type to the data content interception pipeline.
        /// </summary>
        /// <typeparam name="TInterceptor">The type of the interceptor.</typeparam>
        public void InterceptAutoPropertyWith<TInterceptor>()
            where TInterceptor : IAutoPropertyInterceptor
        {
            AutoPropertyInterceptors.Add(ServiceLocator.Current.GetInstance<TInterceptor>());
        }

        /// <summary>
        /// Adds <see cref="IInterceptor"/> of the specified type to the data content interception pipeline.
        /// </summary>
        /// <typeparam name="TInterceptor">The type of the interceptor.</typeparam>
        public void InterceptWith<TInterceptor>()
            where TInterceptor : IInterceptor
        {
            CustomInterceptors.Add(ServiceLocator.Current.GetInstance<TInterceptor>());
        }
    }
}