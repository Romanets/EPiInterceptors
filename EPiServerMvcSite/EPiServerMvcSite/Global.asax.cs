using System;
using System.Web.Mvc;

namespace EPiServerMvcSite
{
    public class Global : EPiServer.Global
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
        }
    }
}