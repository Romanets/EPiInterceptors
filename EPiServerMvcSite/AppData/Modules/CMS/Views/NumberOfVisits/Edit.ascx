<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="EPiServer.Cms.Shell" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html" %>

<% 
    string thresoldId = ViewData["NamingContainer"] + "threshold";
    string comparisonId = ViewData["NamingContainer"] + "comparison";
%>

<%= Html.DropDownList(comparisonId, (IEnumerable<SelectListItem>)ViewData["Comparison"])%>
<input type="text" id='<%= thresoldId %>' value='<%= ViewData["Threshold"] %>' />


