<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<QuickLinkSection>>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Cms.Shell"%>
<%@ Import Namespace="EPiServer.Cms.Shell.QuickLinks"%>
<%@ Import Namespace="EPiServer.Shell" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html"%>

<div class="epi-padding">
    <%foreach(var section in Model) { %>
        <div class="epi-quickLinks">
            <h3 class="epi-collapsiblePanel-header"><a href="#"><%= section.Name %></a></h3>
            <ul class="epi-collapsiblePanel-content">
                <%foreach (QuickLink link in section.Links){%>
                <li><%= Html.QuickLink(link) %></li>
                <%}%>
            </ul>
        </div>
    <% } %>

    <% if (Model.Count == 0){ %>
        <%= Html.ViewLinkButton(Html.Translate("/shell/cms/quicklinks/managelinks"), Html.Translate("/shell/cms/quicklinks/managelinks"), "Configure", "epi-button-small", null)%>
    <% } %>
</div>
