//>>built
define("epi/cms/contentediting/AutoSaveButton",["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-style","dojo/string","dijit/_WidgetBase","epi/datetime","epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons.autosave"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){var _b={Saving:0,Offline:1,Saved:2};return _3("epi.cms.contentediting.AutoSaveButton",[_8],{_state:null,button:undefined,lastSaved:undefined,model:null,_currentlySavingClass:"epi-autosave-saving",_errorClass:"epi-autosave-error",_savedClass:"epi-autosave-saved",_hoverClass:"epi-autosave-hover",_modelHandles:null,postMixInProperties:function(){this.inherited(arguments);this._modelHandles=[];},postCreate:function(){this.inherited(arguments);if(!this.button){return;}this.connect(this.button.domNode,"onmouseover",this._addHoverClass);this.connect(this.button.domNode,"onmouseout",this._removeHoverClass);},_setModelAttr:function(_c){_1.forEach(this._modelHandles,function(_d){_d.unwatch();});this._set("model",_c);if(_c){this._modelHandles=[_c.watch("isOnline",_4.hitch(this,"_isOnlineChanged")),_c.watch("lastSaved",_4.hitch(this,"_lastSavedChanged")),_c.watch("isSaved",_4.hitch(this,"_isSavedChanged")),_c.watch("isSaving",_4.hitch(this,"_isSavingChanged")),_c.watch("hasErrors",_4.hitch(this,"_hasErrorsChanged"))];this.set("lastSaved",_c.lastSaved);if(this.lastSaved){this._setVisibility(true);this.updateButton();}else{this._setVisibility(false);}}},_setLastSavedAttr:function(_e){this._set("lastSaved",_e);this.updateLastSaveTime();},_isOnlineChanged:function(_f,_10,_11){if(_11===_10){return;}if(_11){this.revertToLastAutoSaveTime();}else{this.showOfflineStatus();}},_lastSavedChanged:function(_12,_13,_14){this.set("lastSaved",_14);},_isSavedChanged:function(_15,_16,_17){if(_17){this.updateLastSaveTime();}},_isSavingChanged:function(_18,_19,_1a){if(_1a){this.showSavingStatus();}else{if(!this.model.isSaved){this.revertToLastAutoSaveTime();}}},_hasErrorsChanged:function(_1b,_1c,_1d){if(_1c===_1d){return;}if(!_1d){this.revertToLastAutoSaveTime();}else{_2.publish("/epi/cms/action/showerror");}},_animateSaving:function(){_5.replace(this.button.domNode,this._currentlySavingClass,[this._errorClass,this._savedClass]);this._removeHoverClass();},_animateOffline:function(){_5.replace(this.button.domNode,this._errorClass,[this._currentlySavingClass,this._savedClass]);this._removeHoverClass();},_animateSaved:function(){_5.replace(this.button.domNode,this._savedClass,[this._currentlySavingClass,this._errorClass]);this._removeHoverClass();},_addHoverClass:function(){if(this._state==null||this._state==_b.Saving||this._hasDropDownOpen()){return;}if(this._state==_b.Saved){_5.add(this.button.domNode,this._hoverClass);}},_removeHoverClass:function(){if(!this._hasDropDownOpen()){_5.remove(this.button.domNode,this._hoverClass);}},_updateState:function(_1e){this.button.set("label",_1e);this.button.set("disabled",this._state!=_b.Saved);this._setVisibility(true);},_setVisibility:function(_1f){if(this.button){_6.set(this.button.domNode,{visibility:_1f?"visible":"hidden"});}},_hasDropDownOpen:function(){return this.button._popupStateNode?_5.contains(this.button._popupStateNode,"dijitHasDropDownOpen"):false;},revertToLastAutoSaveTime:function(){if(this.lastSaved===undefined){this._setVisibility(false);return;}this.updateLastSaveTime();},updateLastSaveTime:function(){if(!this.lastSaved){return;}if(!this.model.isOnline){return;}setTimeout(_4.hitch(this,function(){if(this.model.isOnline){this.updateButton();this._animateSaved();}}),1000);},showSavingStatus:function(){this._state=_b.Saving;this._updateState(_a.savinglabel);this._animateSaving();},showOfflineStatus:function(){this._state=_b.Offline;this._updateState(_a.offlinelabel);this._animateOffline();},updateButton:function(){if(!this.lastSaved){this._setVisibility(false);return;}this._state=_b.Saved;var _20="<span class=\"dijitReset dijitInline clearfix\">${autosavelabel} ${timestamp}</span>&nbsp;<span class=\"epi-inlineButtonLink\">${undolabel}</span>";var _21={autosavelabel:_a.autosavelabel,undolabel:_a.undolabel,timestamp:_9.toUserFriendlyHtml(this.lastSaved,null,true)};this._updateState(_7.substitute(_20,_21));}});});