<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<PageItemData>>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Cms.Shell.UI.Models.NotChangedPages" %>
<%@ Import Namespace="EPiServer.Cms.Shell" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html" %>
<%@ Import Namespace="EPiServer.Shell.Web" %>

<table class="epi-simple cms-NotChangedPages-Table">
    <thead>
        <tr>
            <th scope="col" class="epi-width30">
                <%= Html.Translate("/shell/cms/notchangedpages/indexview/name")%>
            </th>
            <th scope="col" class="epi-width30">
                <%= Html.Translate("/shell/cms/notchangedpages/indexview/modified")%>
            </th>
            <th scope="col" class="epi-width15">
                <%= Html.Translate("/shell/cms/notchangedpages/indexview/changedby")%>
            </th>
            <th scope="col">
                <%= Html.Translate("/shell/cms/notchangedpages/indexview/status")%>
            </th>
        </tr>
    </thead>
    <% foreach (PageItemData itemData in Model)
       { %>
    <tr>
        <td>
            <a class="epi-resourceIcon epi-resourceIcon-page" href="<%= itemData.Url %>">
                <%= Html.Encode(itemData.Name)%></a>
            <% Html.RenderToolTip(itemData.ToolTip); %>
        </td>
        <td>
            <%= itemData.Changed.ToFriendlyDateTimeString()%>
        </td>
        <td>
            <%= itemData.ChangedBy%>
        </td>
        <td>
            <%= itemData.Status%>
        </td>
    </tr>
    <% } %>
    </tbody>
</table>
