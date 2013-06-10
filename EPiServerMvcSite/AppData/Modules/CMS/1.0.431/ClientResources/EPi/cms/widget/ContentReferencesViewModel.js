//>>built
define("epi/cms/widget/ContentReferencesViewModel",["dojo/_base/array","dojo/_base/lang","dojo/_base/declare","dojo/_base/Deferred","dojo/Stateful","epi/dependency","epi/shell/_StatefulGetterSetterMixin"],function(_1,_2,_3,_4,_5,_6,_7){return _3("epi.cms.widget.ContentReferencesViewModel",[_5,_7],{store:null,contentData:null,contentDataType:"page",mode:-1,showToolbar:true,pageReferences:[],blockReferences:[],numberOfReferences:{page:0,block:0,total:0},isLoading:false,constructor:function(_8){_2.mixin(this,_8);if(!this.store){var _9=_6.resolve("epi.storeregistry");this.store=_9.get("epi.cms.contentreferences");}var _a="page",_b=this.contentData.capabilities||this.contentData;if(_b.isBlock){_a="block";}else{if(_b.isFolder){_a="folder";}}this.set("contentDataType",_a);},update:function(){var _c=new _4();this.set("isLoading",true);_4.when(this.store.refresh(this.contentData.contentLink),_2.hitch(this,function(_d){_d=_d||[];var _e=[],_f=[];_1.forEach(_d,function(_10){if(_10&&_10.isPage){_e.push(_10);}else{_f.push(_10);}});this.set("pageReferences",_e);this.set("blockReferences",_f);this.set("numberOfReferences",{page:_e.length,block:_f.length,total:_d.length});this.set("showToolbar",_d.length>0);this.set("isLoading",false);_c.resolve();}));return _c;},_setShowToolbarAttr:function(_11){if(this.showToolbar){this._set("showToolbar",_11);}}});});