//>>built
define("epi/cms/contentediting/command/Translate",["dojo/_base/declare","epi/cms/command/_TranslateContent"],function(_1,_2){return _1([_2],{_execute:function(){this._executeCommand(this.model.contentData);},_onModelChange:function(){this._canExecute(this.model.contentData,this.model.contentData.capabilities,this.model.languageContext);}});});