using EPiInterceptors;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;

namespace EPiServerMvcSite.Interception.Sample
{
    public abstract class ContentInterceptorRegistrationModuleBase : IInitializableModule
    {
        public virtual void Initialize(InitializationEngine context)
        {
            RegisterInterceptors(ServiceLocator.Current.GetInstance<ContentDataInterceptonRegistry>());
        }

        public abstract void RegisterInterceptors(ContentDataInterceptonRegistry registry);

        public virtual void Uninitialize(InitializationEngine context)
        {
        }

        public virtual void Preload(string[] parameters)
        {
        }
    }
}