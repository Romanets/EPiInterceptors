using System;
using Castle.DynamicProxy;
using EPiServer.Core;
using EPiServer.DataAbstraction.RuntimeModel;
using EPiServer.ServiceLocation;

namespace EPiInterceptors
{
    /// <summary>
    /// Replaces EPiServer <see cref="ContentDataInterceptor"/> component to provide additional interceptors registration.
    /// </summary>
    public class ContentDataInterceptorExtender : ContentDataInterceptor
    {
        private readonly ContentDataInterceptonRegistry _interceptorsRegistry;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentDataInterceptorExtender"/> class.
        /// </summary>
        public ContentDataInterceptorExtender()
            : this(
            ServiceLocator.Current.GetInstance<ContentDataInterceptorHandler>(),
            ServiceLocator.Current.GetInstance<ContentDataInterceptonRegistry>()
            )
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentDataInterceptorExtender"/> class.
        /// </summary>
        /// <param name="contentDataInterceptorHandler">The content data interceptor handler (The part of EpiServer interception components).</param>
        /// <param name="interceptorsRegistry">The additional interceptors registry.</param>
        public ContentDataInterceptorExtender(ContentDataInterceptorHandler contentDataInterceptorHandler, ContentDataInterceptonRegistry interceptorsRegistry)
            : base(contentDataInterceptorHandler)
        {
            _interceptorsRegistry = interceptorsRegistry;
        }

        /// <summary>
        /// Gets the interceptors registry.
        /// </summary>
        protected ContentDataInterceptonRegistry InterceptorsRegistry
        {
            get { return _interceptorsRegistry; }
        }

        /// <summary>
        /// Overrides base implementation to inject registered additional custom interceptors to EpiServer pipeline.
        /// </summary>
        /// <param name="invocation">The invocation.</param>
        public override void Intercept(IInvocation invocation)
        {
            base.Intercept(invocation);

            if (InterceptorsRegistry != null && InterceptorsRegistry.CustomInterceptors != null)
            {
                foreach (var interceptor in InterceptorsRegistry.CustomInterceptors)
                {
                    interceptor.Intercept(invocation);
                }
            }
        }

        /// <summary>
        /// Overrides base implementation to inject registered in EpiServer pipeline additional interceptors that handles EpiServer supported properties only.
        /// </summary>
        /// <param name="invocation">The invocation.</param>
        /// <param name="propertyData">The property data.</param>
        protected override void HandleGetterAccessor(IInvocation invocation, PropertyData propertyData)
        {
            base.HandleGetterAccessor(invocation, propertyData);

            InvokePropertyInterceptors(i => i.HandlePropertyGetter(invocation, propertyData));
        }

        /// <summary>
        /// Overrides base implementation to inject registered in EpiServer pipeline additional interceptors that handles EpiServer supported properties only.
        /// </summary>
        /// <param name="invocation">The invocation.</param>
        /// <param name="propertyData">The property data.</param>
        protected override void HandleSetterAccessor(IInvocation invocation, PropertyData propertyData)
        {
            base.HandleSetterAccessor(invocation, propertyData);
            InvokePropertyInterceptors(i => i.HandlePropertySetter(invocation, propertyData));
        }

        /// <summary>
        /// Invokes the specified action for all registered property interceptors.
        /// </summary>
        /// <param name="invokeAction">The invoke action.</param>
        private void InvokePropertyInterceptors(Action<IAutoPropertyInterceptor> invokeAction)
        {
            if (InterceptorsRegistry == null || InterceptorsRegistry.AutoPropertyInterceptors == null)
            {
                return;
            }

            foreach (var interceptor in InterceptorsRegistry.AutoPropertyInterceptors)
            {
                invokeAction(interceptor);
            }
        }
    }
}