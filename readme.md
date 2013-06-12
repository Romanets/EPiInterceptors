EPiInterceptors
===============

The goal of project is provide an easy way to extend EpiServer's content data object's interception pipeline. You can register you own interceptor using "EPiInterceptors.ContentDataInterceptonRegistry" instance provided by EpiSercervers ServiceLocator component, see the following example:

```c#
...
var registry = ServiceLocator.Current.GetInstance<ContentDataInterceptonRegistry>()
...

```

and use it for instance in the following way:

```c#
...
registry.InterceptWith<DefaultPorpertyValueInterceptor>();
...

```

Also you can use abstract class "EPiInterceptors.InterceptionRegistrationModule" to implement you own initializable module for interceptors registration purpose:

```c#

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

```