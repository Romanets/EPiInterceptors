<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Dictionary<string, List<TaskViewData>>>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html"%>
<%@ Import Namespace="EPiServer.Cms.Shell.UI.Models.Tasks" %>
<%@ Import Namespace="EPiServer.Cms.Shell.UI.Controllers" %>
<%@ Import Namespace="EPiServer.Core" %>
<%@ Import Namespace="EPiServer.Personalization" %>
<%@ Import Namespace="EPiServer.Cms.Shell" %>
<div>
    <table class="epi-simpleWrapped">
        <thead>
            <tr>
                <th scope="col">
                    <%=Html.Translate("/shell/cms/mytasks/subject")%>
                </th>
                <th scope="col" class="epi-width30">
                    <%=Html.Translate("/shell/cms/mytasks/status")%>
                </th>
                <th scope="col" class="epi-width30">
                    <%=Html.Translate("/shell/cms/mytasks/duedate")%>
                </th>
            </tr>
        </thead>
        <tbody>
            <%foreach (var valuePair in this.ViewData.Model)
              { %>
            <tr>
                <th colspan="3">
                    <%=valuePair.Key%>
                </th>
            </tr>
            <%foreach (var task in valuePair.Value.OrderByDescending(a => a.CreationDate))
              { %>
            <tr>
                <td>
                    <a href="<%=task.Url%>" class="<%=task.IconCssClass %>">
                        <%=Html.Encode(task.Subject)%></a>
                    <% Html.RenderToolTip(task.ToolTipElements); %>
                </td>
                <td>
                    <%=Html.Encode(task.Description)%>
                </td>
                <td class="epi-alignRight">
                    <%if (task.DueDate.HasValue && task.DueDate.Value != DateTime.MaxValue && task.DueDate.Value != DateTime.MinValue)
                      { %>
                    <%=task.DueDate.Value.ToShortDateString()%>
                    <%} %>
                </td>
            </tr>
            <%} %>
            <%} %>
        </tbody>
    </table>
    <div class="epi-buttonContainer">
        <%= Html.ShellLinkButton(EPiServer.UriSupport.ResolveUrlFromUIBySettings("edit/default.aspx?plugin=" + Task.DefaultEditTaskPlugInID), null, Html.Translate("/shell/cms/mytasks/createnewtasktitle"), Html.Translate("/shell/cms/mytasks/createnewtask"), "epi-button-small") %>
        <%= Html.ShellLinkButton("#AddTask", string.Empty, Html.Translate("/shell/cms/mytasks/quickaddtitle"), Html.Translate("/shell/cms/mytasks/quickadd"), "epi-button-small")%>
    </div>
</div>
