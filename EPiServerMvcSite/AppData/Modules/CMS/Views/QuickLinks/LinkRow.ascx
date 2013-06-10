<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<PersonalQuickLinkViewModel>" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="EPiServer.Cms.Shell"%>
<%@ Import Namespace="EPiServer.Cms.Shell.QuickLinks"%>
<%
    string prefix = "personalLinks[" + Model.RowIndex + "]";
     %>
<tr>
    <td class="epi-width30 epi-alignTop">
        <input type="text" name="<%=prefix %>.Text" value="<%=Html.Encode(Model.Text) %>" readonly="readonly" class="required nohtml" />
    </td>
    <td class="epi-width65 epi-alignTop">
        <input type="text" name="<%=prefix %>.Url" value="<%=Model.Url %>" readonly="readonly" class="required url" />    
    </td>
    <td class="epi-alignTop">
        <a href="#" onclick="return false;" class="epi-quickLinksDelete epi-iconToolbar-item-link epi-iconToolbar-delete" title="<%=Html.Translate("/shell/cms/quicklinks/deletelink") %>"><span><%=Html.Translate("/shell/cms/quicklinks/deletelink")%></span></a>
        <input type="hidden" name="personalLinks.Index" value="<%=Model.RowIndex %>" />
        <input type="hidden" name="<%=prefix %>.Id" value="<%=Model.Id.ToString() %>" />
        <input type="hidden" name="<%=prefix %>.IsDeleted" value="<%=Model.IsDeleted %>" />
    </td>
</tr>
