<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<EPiServer.Shell.Web.Mvc.BootstrapperViewModel>"
    MasterPageFile="Sleek.Master" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<%@ Import Namespace="EPiServer.Framework.Web.Mvc.Html"%>
<%@ Import Namespace="EPiServer.Framework.Web.Resources"%>
<%@ Import Namespace="EPiServer.Framework.Serialization" %>
<%@ Import Namespace="EPiServer.Shell" %>
<%@ Import Namespace="EPiServer.Shell.Navigation" %>
<%@ Import Namespace="EPiServer.Shell.ViewComposition" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html" %>

<asp:Content ContentPlaceHolderID="TitleContent" runat="server"><%: Model.ViewTitle %></asp:Content>
<asp:Content ContentPlaceHolderID="HeaderContent" runat="server">
    <%=Page.ClientResources("navigation", new[] { ClientResourceType.Style })%>
</asp:Content>
<asp:Content ContentPlaceHolderID="ScriptContent" runat="server">


    <script type="text/javascript">
        require(["epi/shell/Bootstrapper"], function(Bootstrapper) {

            var settings = <%= Html.SerializeObject(Model.Modules, KnownContentTypes.Json).Replace("<", "&lt;").Replace(">", "&gt;") %>;
            var bootStrapper = new Bootstrapper(settings);
            bootStrapper.initializeApplication("<%: Model.ViewName  %>", "<%: Model.ModuleName %>").then(function() {
                require([
                    "dojo/_base/connect",
                    "dojo/parser",
                    "dijit/registry",
                    "dijit/layout/BorderContainer",
                    "dijit/layout/ContentPane",
                    "epi/shell/widget/GlobalMenu",
                    "epi/shell/widget/Application",
                    "dojo/domReady!"], 
                function (connect, parser, registry) {
                    parser.parse();
                    
                    // Trigger layout when the global navigation changes its layout.
                    connect.subscribe("/epi/shell/globalnavigation/layoutchange", null,  function() { 
                        registry.byId("rootContainer").layout(); 
                    });
                });
            });
        });
    </script>
    <%=Page.ClientResources("navigation", new[] { ClientResourceType.Script })%>
</asp:Content>
<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <% if (Model.ViewName.Equals("/episerver/cms/home", StringComparison.OrdinalIgnoreCase)) { %>
    <div id="globalMenuContainer" class="epi-navigation-container" data-dojo-type="epi.shell.widget.GlobalMenu">
        <%= Html.GlobalMenu()%>
    </div>
    <div data-dojo-type="dijit.layout.BorderContainer" id="rootContainer" gutters="false" style="padding: 0px;height: 100%; width: 100%;">
        <div id="applicationContainer" data-dojo-type="epi.shell.widget.Application" region="center"></div>
    </div>
    <% } else { %>
    <div data-dojo-type="dijit.layout.BorderContainer" id="rootContainer" gutters="false" style="padding: 0px; height: 100%; width: 100%;">
        <div data-dojo-type="dijit.layout.ContentPane" region="top" style="border:0; overflow:visible; z-index:900">
            <%-- /* z-index to make menu drop-downs appear above view content */ --%>
            <%= Html.GlobalMenu()%>
        </div>
        <div id="applicationContainer" data-dojo-type="epi.shell.widget.Application" region="center"></div>
    </div>
    <% } %>
</asp:Content>
