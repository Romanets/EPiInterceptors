using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;

namespace EPiInterceptors
{
    /// <summary>
    /// Represents the base <see cref="IInitializableModule"/> that can be used to register additional interceptors to EpiServer content data interception pipeline.
    /// <remarks>Attention! Don't forget to add <see cref="InitializableModuleAttribute"/> to derived class.</remarks>
    /// </summary>
    public abstract class InterceptionRegistrationInitModuleBase : IConfigurableModule
    {
        /// <summary>
        /// Configure the IoC container before initialization.
        /// </summary>
        /// <param name="context">The context on which the container can be accessed.</param>
        public virtual void ConfigureContainer(ServiceConfigurationContext context)
        {
        }

        /// <summary>
        /// Initializes this instance.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <remarks>
        /// Gets called as part of the EPiServer Framework initialization sequence. Note that it will be called
        /// only once per AppDomain, unless the method throws an exception. If an exception is thrown, the initialization
        /// method will be called repeatedly for each request reaching the site until the method succeeds.
        /// </remarks>
        public virtual void Initialize(InitializationEngine context)
        {
            RegisterContentDataInterceptors(context.Locate.Advanced.GetInstance<ContentDataInterceptonRegistry>());
        }

        /// <summary>
        /// Performs interceptors registration.
        /// </summary>
        /// <param name="registry">The registry.</param>
        public abstract void RegisterContentDataInterceptors(ContentDataInterceptonRegistry registry);

        /// <summary>
        /// Resets the module into an uninitialized state.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <remarks>
        ///   <para>
        /// This method is usually not called when running under a web application since the web app may be shut down very
        /// abruptly, but your module should still implement it properly since it will make integration and unit testing
        /// much simpler.
        ///   </para>
        ///   <para>
        /// Any work done by <see cref="M:EPiServer.Framework.IInitializableModule.Initialize(EPiServer.Framework.Initialization.InitializationEngine)" /> as well as any code executing on <see cref="E:EPiServer.Framework.Initialization.InitializationEngine.InitComplete" /> should be reversed.
        ///   </para>
        /// </remarks>
        public virtual void Uninitialize(InitializationEngine context)
        {
        }

        /// <summary>
        /// Preloads the module.
        /// </summary>
        /// <param name="parameters">The parameters.</param>
        /// <remarks>
        /// This method is only available to be compatible with "AlwaysRunning" applications in .NET 4 / IIS 7.
        /// It currently serves no purpose.
        /// </remarks>
        public virtual void Preload(string[] parameters)
        {
        }
    }
}