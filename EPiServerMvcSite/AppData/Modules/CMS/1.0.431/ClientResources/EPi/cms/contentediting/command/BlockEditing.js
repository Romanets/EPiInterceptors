//>>built
define("epi/cms/contentediting/command/BlockEditing",["dojo/_base/declare","dojo/_base/lang","dojo/Stateful","epi","epi/shell/_StatefulGetterSetterMixin","epi/cms/contentediting/command/BlockRemove","epi/cms/contentediting/command/BlockEdit","epi/cms/contentediting/command/BlockMoveUp","epi/cms/contentediting/command/BlockMoveDown"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _1("epi.cms.contentediting.command.BlockEditing",[_3,_5],{model:null,remove:null,edit:null,moveUp:null,moveDown:null,constructor:function(_a){_2.mixin(this,_a);this.remove=this.remove||new _6();this.edit=this.edit||new _7();this.moveUp=this.moveUp||new _8();this.moveDown=this.moveDown||new _9();},_setModelAttr:function(_b){this._set("model",_b);this.remove.set("model",_b);this.edit.set("model",_b);this.moveUp.set("model",_b);this.moveDown.set("model",_b);}});});