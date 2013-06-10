//>>built
define("epi/cms/contentediting/command/RevertToPublished",["dojo/_base/declare","dojo/_base/lang","epi/cms/contentediting/command/_ContentCommandBase","epi/cms/contentediting/ContentActionSupport","epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons"],function(_1,_2,_3,_4,_5){return _1("epi.cms.contentediting.command.RevertToPublished",[_3],{name:"reverttopublished",tooltip:_5.reverttopublished.title,label:_5.reverttopublished.label,iconClass:"epi-iconRevert",_hasPendingChangeWatch:null,_execute:function(){this.model.revertToPublished();},_onModelChange:function(){this.inherited(arguments);var _6=this.model.contentData,_7=_6.status,_8=_4.versionStatus;var _9=(_7===_8.CheckedOut)||(_7===_8.Rejected)||((_7===_8.Published||_7===_8.Expired)&&_6.isCommonDraft);this.set("isAvailable",_9);if(this._hasPendingChangeWatch){this._hasPendingChangeWatch.unwatch();}this._hasPendingChangeWatch=this.model.watch("hasPendingChanges",_2.hitch(this,function(_a,_b,_c){var _d=this._getCanExecute(_6,_8);this.set("canExecute",!_c&&_d);}));this.set("canExecute",_9&&this._getCanExecute(_6,_8));},_getCanExecute:function(_e,_f){return _e.publishedBy!==null&&_e.publishedBy!==undefined&&_e.status!==_f.Published&&_e.status!==_f.Expired&&this.model.canChangeContent();}});});