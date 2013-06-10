using EPiInterceptors;
using EPiServer.Framework;
using EPiServer.ServiceLocation;

namespace EPiServerMvcSite.Interception.Sample
{
    [InitializableModule]
    public class DefaultInterceptorRegisterModule : InterceptionRegistrationModule
    {
        public override void RegisterInterceptors(ContentDataInterceptonRegistry registry)
        {
           registry.InterceptWith<DefaultPorpertyValueInterceptor>();
        }
    }
}