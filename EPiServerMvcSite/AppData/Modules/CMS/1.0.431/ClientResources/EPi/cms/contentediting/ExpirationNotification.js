//>>built
define("epi/cms/contentediting/ExpirationNotification",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/Stateful","dojo/string","epi/datetime","epi/dependency","epi/i18n!epi/cms/nls/episerver.cms.widget.expirationeditor","epi/i18n!epi/cms/nls/episerver.cms.contentediting.versionstatus"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _2([_4],{command:null,postscript:function(){this.inherited(arguments);if(!this.command){var _a=_7.resolve("epi.cms.contentEditing.command.Editing");this.command=_a.manageExpiration;}this._setupWatchForCommand(this.command);},update:function(_b){var _c=_b.contentData.properties.iversionable_expire;this._setNotification(_c);},_setNotification:function(_d){var _e=_d?_d.stopPublish:null,_f=new Date(_e);if(_e&&_6.isDateValid(_f)){var _10=new Date(_e)<new Date()?_9.expired:_5.substitute(_8.expiretimetext,[_6.timeToGo(_f)]);this.set("notification",{content:_10,commands:[this.command]});}else{this.set("notification",null);}},_setupWatchForCommand:function(_11){if(this._commandWatchHandle){this._commandWatchHandle.unwatch();}this._commandWatchHandle=_11.watch("viewModel",_3.hitch(this,function(_12,_13,_14){_14.watch("value",_3.hitch(this,function(_15,_16,_17){this._setNotification(_17);}));}));}});});