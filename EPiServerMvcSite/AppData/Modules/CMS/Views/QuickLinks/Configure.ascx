<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<QuickLinksViewModel>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Cms.Shell"%>
<%@ Import Namespace="EPiServer.Cms.Shell.QuickLinks"%>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html" %>

<div class="epi-formArea epi-paddingHorizontal-small">
    <%Html.BeginForm("Save", "QuickLinks", FormMethod.Post);%>
    <%= Html.AntiForgeryToken() %>
    <fieldset>
        <legend><%= Html.Translate("/EPiServer/Shell/Resources/Texts/Settings")%></legend>
    <%
        int j = 0;
        foreach (var section in Model.SystemLinks)
    {%>
        <div class="epi-quickLinks">
            <h3 class="epi-collapsiblePanel-header"><a href="#"><%= section.Name %></a></h3>
            <ul class="epi-collapsiblePanel-content">
                <%foreach (QuickLink link in section.Links)
                  {
                      string prefix = "systemLinks[" + j + "]";
                      %>
                <li>
                    <%=Html.CheckBox(prefix + ".IsEnabled", link.IsEnabled, new { id = prefix + "_ID" })%> <label for="<%=prefix%>_ID" title="<%= link.Url%>" ><%= link.Text%></label>
                    <input type="hidden" name="<%=prefix %>.Url" value="<%=link.Url %>" />
                    <input type="hidden" name="systemLinks.Index" value="<%=j++ %>" />
                </li>
                <%}%>
            </ul>
        </div>
    <%}%>
    
        <div class="epi-quickLinksEdit">
            <h3><%=Html.Translate("/shell/cms/quicklinks/mylinkscategoryname")%></h3>
            <table>
                <thead>
                    <tr>
                        <th scope="col"><%=Html.Translate("/shell/cms/quicklinks/linktitle")%></th>
                        <th scope="col"><%=Html.Translate("/shell/cms/quicklinks/linkurl")%></th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <%
                        int i = 0;
                        foreach (PersonalQuickLinkViewModel link in this.Model.PersonalLinks)
                        {
                            string prefix = "personalLinks[" + i + "]";
                            link.RowIndex = i;
                    %>
                    <%Html.RenderPartial("LinkRow", link); %>
                    <%i++;
                  }%>
                </tbody>
            </table>
            <%= Html.ShellLinkButton("#", null, null, Html.Translate("/shell/cms/quicklinks/addlink"), "epi-button-small epi-quickLinks-add")%>
 
            <input type="hidden" class="nextLinkIndex" value="<%= i %>" />
        </div>
    </fieldset>
    
    <div class="epi-buttonContainer-simple">
        <%= Html.AcceptButton() %>        
        <%= Html.CancelButton() %>
    </div>
    <% Html.EndForm(); %>
</div>
