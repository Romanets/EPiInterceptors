using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly IEnumerable<IAutoPropertyInterceptor> _autoPropertyInterceptors;
        private readonly IEnumerable<IInterceptor> _customInterceptors;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentDataInterceptorExtender"/> class.
        /// </summary>
        public ContentDataInterceptorExtender()
            : this(
            ServiceLocator.Current.GetInstance<ContentDataInterceptorHandler>(),
            ServiceLocator.Current.GetInstance<IContentDataInterceptonRegistry>()
            )
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentDataInterceptorExtender"/> class.
        /// </summary>
        /// <param name="contentDataInterceptorHandler">The content data interceptor handler (The part of EpiServer interception components).</param>
        /// <param name="interceptorsRegistry">The additional interceptors registry.</param>
        public ContentDataInterceptorExtender(ContentDataInterceptorHandler contentDataInterceptorHandler, IContentDataInterceptonRegistry interceptorsRegistry)
            : base(contentDataInterceptorHandler)
        {
            if (interceptorsRegistry != null)
            {
                _customInterceptors = interceptorsRegistry.GetCustomInterceptors();
                _autoPropertyInterceptors = interceptorsRegistry.GetAutoPropertyInterceptors();
            }
            else
            {
                _customInterceptors = Enumerable.Empty<IInterceptor>();
                _autoPropertyInterceptors = Enumerable.Empty<IAutoPropertyInterceptor>();
            }
        }

        /// <summary>
        /// Gets the auto property interceptors.
        /// </summary>
        /// <value>
        /// The auto property interceptors.
        /// </value>
        protected IEnumerable<IAutoPropertyInterceptor> AutoPropertyInterceptors
        {
            get { return _autoPropertyInterceptors; }
        }

        /// <summary>
        /// Gets the custom interceptors.
        /// </summary>
        /// <value>
        /// The custom interceptors.
        /// </value>
        protected IEnumerable<IInterceptor> CustomInterceptors
        {
            get { return _customInterceptors; }
        }

        /// <summary>
        /// Overrides base implementation to inject registered additional custom interceptors to EpiServer pipeline.
        /// </summary>
        /// <param name="invocation">The invocation.</param>
        public override void Intercept(IInvocation invocation)
        {
            base.Intercept(invocation);

            foreach (var interceptor in CustomInterceptors)
            {
                interceptor.Intercept(invocation);
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
            foreach (var interceptor in AutoPropertyInterceptors)
            {
                invokeAction(interceptor);
            }
        }
    }
}