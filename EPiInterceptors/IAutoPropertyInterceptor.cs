using Castle.DynamicProxy;
using EPiServer.Core;

namespace EPiInterceptors
{
    /// <summary>
    /// The interface of interceptor that can be included in native EpiServer interception pipeline for data content objects.
    /// It handles get and set methods only public virtual auto properties that is handled standard EpiServer interception as well.
    /// It's called after native interception.
    /// </summary>
    public interface IAutoPropertyInterceptor
    {
        /// <summary>
        /// Handles the property getter.
        /// </summary>
        /// <param name="invocation">The invocation instance.</param>
        /// <param name="propertyData">The property data.</param>
        void HandlePropertyGetter(IInvocation invocation, PropertyData propertyData);

        /// <summary>
        /// Handles the property setter.
        /// </summary>
        /// <param name="invocation">The invocation.</param>
        /// <param name="propertyData">The property data.</param>
        void HandlePropertySetter(IInvocation invocation, PropertyData propertyData);
    }
}