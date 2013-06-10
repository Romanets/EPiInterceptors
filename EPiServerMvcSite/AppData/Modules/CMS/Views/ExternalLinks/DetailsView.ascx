<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IEnumerable<LinkDetailsData>>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Cms.Shell.UI.Models.ExternalLinks" %>
<%@ Import Namespace="EPiServer.Cms.Shell" %>
<table class="epi-simple cms-externalLinks-table">
    <thead>
        <tr>
            <th class="epi-width30" scope="col">
                <%= Html.Translate("/shell/cms/externallinks/details/link")%>
            </th>
            <th class="epi-width15" scope="col">
                <%= Html.Translate("/shell/cms/externallinks/details/page")%>
            </th>
        </tr>
    </thead>
    <% if (Model.Count() > 0)
       { %>
    <tbody>
        <% foreach (var item in Model)
           { %>
        <tr>
            <td>
                <a href="<%= item.Url %>" title="<%= item.Url %>" target="_blank">
                    <%= item.Url %>
                </a>
            </td>
            <td>
                <a href="<%= item.PageLink %>" title="<%= item.PageLink %>" target="_blank">
                    <%= Html.Encode(item.PageName) %>
                </a>
            </td>
        </tr>
        <% } %>
    </tbody>
    <% } %>
</table>
