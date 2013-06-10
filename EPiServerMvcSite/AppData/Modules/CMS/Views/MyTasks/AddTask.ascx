<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<TaskViewData>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html"%>
<%@ Import Namespace="EPiServer.Cms.Shell.UI.Models.Tasks" %>
<%@ Import Namespace="EPiServer.Cms.Shell" %>

<%= Html.ShellValidationSummary() %>

<% Html.BeginGadgetForm("AddTask"); %>
    <div class="epi-paddingHorizontal-small epi-formArea epi-myTasks">
        <fieldset>
            <legend>
                <%= Html.Translate("/shell/cms/mytasks/legend")%>
            </legend>
            <div class="epi-size10">
                <div>
                    <%= Html.LabeledTextBox("Subject", Html.Translate("/shell/cms/mytasks/subject"), null, new { @class = "epi-size20 required nohtml" }, null)%>
                </div>
                <div>
                    <%= Html.LabeledTextBox("DueDate", Html.Translate("/shell/cms/mytasks/duedate"), Model.DueDate.HasValue ? Model.DueDate.Value.ToShortDateString() : null, new { @class = "epi-size20" }, null)%>
                </div>
                <div>
                    <%= Html.LabeledTextArea("Description", Html.Translate("/shell/cms/mytasks/description"), null, new { @class = "epi-size20 nohtml", style = "min-width: 20em; width: 20em;" }, null)%>
                </div>
                <div>
                    <%= Html.LabeledDropDownList("AssignedTo", Html.Translate("/shell/cms/mytasks/assignedto"), Model.UsersToAssign, new { @class = "epi-size20" }, null)%>
                </div>
                <div>
                    <%= Html.LabeledDropDownList("Status", Html.Translate("/shell/cms/mytasks/status"), Model.TranslatedStatuses, new { @class = "epi-size20" }, null)%>
                </div>
            </div>
        </fieldset>
        <div class="epi-buttonContainer-simple">
            <%= Html.AcceptButton(new { @class = "epi-button-small" })%>
            <%= Html.CancelButton(new { @class = "epi-button-small" })%>
        </div>
    </div>
<% Html.EndForm(); %>
