//>>built
define("epi/shell/widget/SuggestionBox",["dojo/_base/declare","dojo/_base/lang","dojo/dom-attr","dijit/_HasDropDown","dijit/form/_ComboBoxMenu","dijit/form/_AutoCompleterMixin","epi/shell/widget/SearchBox"],function(_1,_2,_3,_4,_5,_6,_7){return _1("epi.shell.widget.SuggestionBox",[_7,_4,_6],{dropDownClass:_5,buildRendering:function(){this.inherited(arguments);_3.set(this.textbox,"autocomplete","off");_3.set(this.textbox,"aria-haspopup","true");},postCreate:function(){this.inherited(arguments);this.connect(this.clearButton,"onclick",_2.hitch(this,function(){this.closeDropDown();}));}});});