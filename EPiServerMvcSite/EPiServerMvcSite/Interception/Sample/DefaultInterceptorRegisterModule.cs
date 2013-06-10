using EPiInterceptors;
using EPiServer.Framework;
using EPiServer.ServiceLocation;
using EPiServerMvcSite.Interception.Sample;

namespace EPiServerMvcSite.Interception
{
    [ModuleDependency(typeof(ServiceContainerInitialization))]
    public class DefaultInterceptorRegisterModule : ContentInterceptorRegistrationModuleBase
    {
        public override void RegisterInterceptors(ContentDataInterceptonRegistry registry)
        {
           registry.InterceptWith<DefaultPorpertyValueInterceptor>();
        }
    }
}