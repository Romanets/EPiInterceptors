<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<TaskSettings>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Cms.Shell.UI.Models.Tasks" %>
<%@ Import Namespace="EPiServer.Cms.Shell" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html" %>

<%= Html.ShellValidationSummary() %>

<div class="epi-paddingHorizontal-small epi-formArea">
    <% Html.BeginGadgetForm("Configure"); %>
        <%= Html.AntiForgeryToken() %>
        <fieldset>
            <legend><%= Html.Translate("/shell/cms/mytasks/settingsheading")%></legend>
            <div class="epi-size20">
                <%= Html.LabeledTextBox("GroupNames", Html.Translate("/shell/cms/mytasks/mygroups"), null)%>
            </div>
        </fieldset>
        <div class="epi-buttonContainer-simple">
            <%= Html.AcceptButton()%>
            <%= Html.CancelButton(new { onclick = String.Empty })%>
        </div>
    <% Html.EndForm(); %>
</div>
