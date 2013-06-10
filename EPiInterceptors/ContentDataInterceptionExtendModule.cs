using EPiServer.DataAbstraction.RuntimeModel;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;

namespace EPiInterceptors
{
    /// <summary>
    /// Configures EPiServer's DI container to inject extension components of data content interception pipeline.
    /// </summary>
    [ModuleDependency(typeof(ServiceContainerInitialization))]
    public class ContentDataInterceptionExtendModule : IConfigurableModule
    {
        #region Ignored methods
        
        public void Initialize(InitializationEngine context)
        {
        }

       
        public void Uninitialize(InitializationEngine context)
        {
        }

        public void Preload(string[] parameters)
        {
        }

        #endregion

        /// <summary>
        /// Configure the IoC container before initialization.
        /// </summary>
        /// <param name="context">The context on which the container can be accessed.</param>
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.Container.Configure(config =>
                {
                    config.For<ContentDataInterceptonRegistry>().Singleton().Use<ContentDataInterceptonRegistry>();
                    config.For<ContentDataInterceptor>().Use<ContentDataInterceptorExtender>();
                });
        }
    }
}