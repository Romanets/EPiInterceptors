using EPiInterceptors;
using EPiServer.Framework;

namespace EPiServerMvcSite.Interception.Sample
{
    [InitializableModule]
    public class DefaultInterceptorRegisterModule : InterceptionRegistrationInitModuleBase
    {
        public override void RegisterContentDataInterceptors(ContentDataInterceptonRegistry registry)
        {
           registry.InterceptWith<DefaultPorpertyValueInterceptor>();
        }
    }
}