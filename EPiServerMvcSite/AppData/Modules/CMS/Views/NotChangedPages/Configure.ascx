<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Settings>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html" %>
<%@ Import Namespace="EPiServer.Cms.Shell" %>
<%@ Import Namespace="EPiServer.Cms.Shell.UI.Models.NotChangedPages" %>
<%= Html.ShellValidationSummary() %>
<div class="epi-paddingHorizontal-small epi-formArea">
    <% Func<int, SelectListItem> func = value => new SelectListItem { Text = value.ToString(), Value = value.ToString(), Selected = Model.NumberOfItems == value };
       var list = new[] { func(5), func(10), func(20) };
       Html.BeginGadgetForm("Configure"); %>
       <%= Html.AntiForgeryToken()%>
    <fieldset>
        <legend>
            <%= Html.Translate("/shell/cms/notchangedpages/settingsview/legend")%>
        </legend>
        <div class="epi-size15">
            <div>
                <%= Html.LabeledDropDownList("NumberOfItems", Html.Translate("/shell/cms/notchangedpages/settingsview/numberofitems"), list, new { @class = "epi-size3" }, null)%>
            </div>
            <div>
                <%= Html.LabeledTextBox("MonthsWithoutChanges", Html.Translate("/shell/cms/notchangedpages/settingsview/monthswithoutchanges"), null, new { @class = "epi-size3", maxlength = 2 }, null)%>
            </div>
            <div>
                <%= Html.LabeledCheckBox("InvertSorting", Html.Translate("/shell/cms/notchangedpages/settingsview/invertsorting"), Model.InvertSorting)%>
            </div>
        </div>
    </fieldset>
    <div class="epi-buttonContainer-simple">
        <%= Html.AcceptButton()%>
        <%= Html.CancelButton(new { onclick = String.Empty })%>
    </div>
    <% Html.EndForm(); %>
</div>
