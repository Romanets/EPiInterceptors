//>>built
define("epi/cms/component/CreateLanguageBranch",["dojo","dojo/i18n","dojo/dom-attr","dojo/_base/lang","dijit","epi/dependency","epi/cms/component/CreateContent","epi/i18n!epi/cms/nls/episerver.cms.components.createpage"],function(_1,_2,_3,_4,_5,_6,_7,_8){return _1.declare("epi.cms.component.CreateLanguageBranch",[_7],{contentTypeStore:null,contentData:null,postMixInProperties:function(){this.inherited(arguments);if(!this.contentTypeStore){var _9=_6.resolve("epi.storeregistry");this.contentTypeStore=_9.get("epi.cms.contenttype");}},postCreate:function(){this.skipContentTypeSelection=true;_1.style(this.selectTypeNode,"display","none");this.inherited(arguments);},updateView:function(_a){this.set("res",_8);this.inherited(arguments);_1.when(this.contentDataStore.get(this.contentData.parentLink),_1.hitch(this,function(_b){this.set("parent",_b);_1.when(this.contentTypeStore.get(this.contentData.contentTypeID),_1.hitch(this,function(_c){this.selectedContentType=_c;this._tryCreateContent(this.contentData.name,_c);}));}));},_saveContentChanges:function(_d){var _e={masterLanguageVersionId:this.contentData.contentLink};_4.mixin(_d,_e);this.inherited(arguments,[_d]);},getContentName:function(){return this.contentData.name;},_isPropertyRequired:function(_f){return this.inherited(arguments)&&_f.settings&&_f.settings.isLanguageSpecific;}});});