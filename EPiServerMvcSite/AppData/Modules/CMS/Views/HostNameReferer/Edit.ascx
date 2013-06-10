<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Assembly Name="EPiServer.CMS.Shell.UI" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="EPiServer.Cms.Shell" %>
<%@ Import Namespace="EPiServer.Shell.Web.Mvc.Html" %>

<% 
    string hostNameKey = ViewData["NamingContainer"] + "HostName";
    string matchTypeName = ViewData["NamingContainer"] + "MatchType";
%>

<label> <B>HostName</B></label>
<%= Html.DropDownList(matchTypeName)%>
<input type="text" id='<%=hostNameKey%>' value='<%= ViewData["HostName"] %>' />