//>>built
define("epi/shell/widget/layout/ComponentContainer",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/store/Memory","dojox/layout/GridContainer","dijit/focus","dijit/registry","epi/dependency","epi/shell/widget/_ActionProvider","epi/shell/widget/ComponentSelectorDialog","epi/shell/widget/layout/_ComponentWrapper","epi/shell/widget/layout/ComponentTabContainer","epi/i18n!epi/shell/ui/nls/episerver.shell.ui.resources"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){return _2("epi.shell.widget.layout.ComponentContainer",[_9,_d],{containerUnlocked:false,isAutoOrganized:false,baseClass:"epi-componentContainer",plugInArea:"",numberOfColumns:1,hasResizableColumns:false,_componentSelectorDialog:null,_componentsController:null,componentCategory:null,postMixInProperties:function(){this.inherited(arguments);this.nbZones=this.numberOfColumns;this._componentsController=this._componentsController||_c.resolve("epi.shell.controller.Components");this.profile=this.profile||_c.resolve("epi.shell.Profile");},resizeChildAfterDrop:function(_12,_13,_14){this.inherited(arguments);if(_b.getEnclosingWidget(_13.node)==this){this._onDndDrop();}},_persistComponentSettings:function(){_1.forEach(this.getChildren(),function(_15){var id=_15.componentId,_16=_3.mixin({componentId:id},this.settings.get(id),_15.get("settings"));this.settings.put(_16);},this);this.profile.set(this.componentId,{components:this.settings.data},true);},buildRendering:function(){this.inherited(arguments);this.acceptTypes=[this.id];},postCreate:function(){this.inherited(arguments);this._setupDragManager();var _17=this.profile.get(this.componentId,true);this.settings=new _8({data:_17?_17.components:[],idProperty:"componentId"});this.containerNode.removeAttribute("id");},_setupDragManager:function(){_4.before(this._dragManager,"_searchDragHandle",function(_18){if(_18&&_5.contains(_18,"dojoxDragHandle")){return _18;}});},startup:function(){if(this._started){return;}this.inherited(arguments);this.changeLockButtonState(false);},onShow:function(){if(this._disabled&&this.containerUnlocked){this.enableDnd();}},uninitialize:function(){this.inherited(arguments);if(this._componentSelectorDialog!==null){this._componentSelectorDialog.destroyRecursive();}},layout:function(){if(this.doLayout){_6.setContentSize(this.containerNode,{h:this._contentBox.h-this._border.h});_6.setContentSize(this.domNode,{w:this._contentBox.w-this._border.w});}this.layoutComponents();},layoutComponents:function(){var _19=_6.getContentBox(this.gridContainerDiv);var _1a={w:_19.w/this.numberOfColumns};_1.forEach(this.getChildren(),function(_1b){if(_1b.resize&&_3.isFunction(_1b.resize)){_1b.resize(_1a);}});},_layoutChildren:function(_1c,_1d,_1e){_1c.resize({h:_1d});if(_1e){_1c.set("lastOpenHeight",_1d);this.layoutComponents();this._persistComponentSettings();}},addComponent:function(_1f){this._componentsController.addComponent(this,_1f,true,_3.hitch(this,function(){this.layoutComponents();}));},_selectFocus:function(){var _20=_a.curNode;if(_20===null||_20.parentNode===null){return;}this.inherited(arguments);},addChild:function(_21,_22){var _23,_24=this._componentsController.getComponentDefinition(_21.id),id=_24?_24.id:_21.componentId,_25=this.containerUnlocked,_26={componentId:id,dndType:this.id,isRemovable:_24?_24.settings.isRemovable:_21.params.isRemovable,minHeight:_21.get("minHeight")||200,maxHeight:_21.get("maxHeight")||Infinity,open:_21.get("open")!==false,dragRestriction:!_25,closable:_25,heading:_21.get("heading"),container:this},_27=_3.mixin(_26,this.settings.get(id));if(!_21.isInstanceOf(_f)&&!_21.isInstanceOf(_10)){_23=new _f(_27);_23.addChild(_21);}else{_23=_21;for(var _28 in _27){_23.set(_28,_26[_28]);}}this.connect(_23,"onClosed",_3.hitch(this,this._gadgetClosed,_23));this._connect(_23.on("toggle",_3.hitch(this,function(){this._componentToggle(_23);})));if(_22>=this.numberOfColumns){_22=this.numberOfColumns-1;}var _29=this.inherited(arguments,[_23,_22]);if(_25&&_3.isFunction(_29.disableResize)){_29.disableResize();}this._onCompontentsChanged();return _29;},_componentToggle:function(_2a){_2a.resize();this.layoutComponents();this._persistComponentSettings();},_gadgetClosed:function(_2b){var _2c=_2b.componentId;this._componentsController.removeComponent(_2c);_2b.destroyRecursive();this._onCompontentsChanged();this.settings.remove(_2b.componentId);this._persistComponentSettings();this.layoutComponents();},_onCompontentsChanged:function(){this.layoutComponents();},showComponentSelector:function(){if(this._componentSelectorDialog===null){this._componentSelectorDialog=new _e({plugInArea:this.plugInArea,componentCategory:this.componentCategory});this.connect(this._componentSelectorDialog,"onComponentSelected",this.addComponent);}this._componentSelectorDialog.show();},changeLockButtonState:function(_2d){this.containerUnlocked=_2d;_1.forEach(this.getChildren(),_3.hitch(this,function(_2e){_2e.set("dragRestriction",!_2d);_2e.set("closable",_2d);}));this.containerUnlocked?this.enableDnd():this.disableDnd();},_saveComponentOrder:function(_2f,_30){var _31=_1.map(_2f,function(_32){return {id:_32.componentId,column:_32.get("column")};});this._componentsController.sortComponents(this,_31,_30);},_onDndDrop:function(){var _33=this.getChildren();this._saveComponentOrder(_33);this._onCompontentsChanged();this.layoutComponents();},_reloadGadgets:function(){var _34=this.getChildren();var _35=_34.length;var _36=this;_1.forEach(_34,function(_37){_36.removeChild(_37);_36.addChild(_37,_37.get("column"),_35);});this._onCompontentsChanged();},_reloadContainer:function(_38,_39){this.numberOfColumns=_39;if(_38){this._reloadGadgets();}},setColumns:function(_3a){var _3b=this.getChildren();var _3c=this;if(_3b.length<=0){this._reloadContainer(false,_3a);}else{_1.forEach(_3b,function(_3d){if(_3d.column>=_3a){_3d.set("column",_3a-1);}});this._saveComponentOrder(_3b,_3.hitch(this,function(_3e){this._reloadContainer(_3e,_3a);}));}this.inherited(arguments);this.resize();},_organizeChildrenManually:function(){var _3f=dojox.layout.GridContainerLite.superclass.getChildren.call(this),_40=_3f.length,_41;for(var i=0;i<_40;i++){_41=_3f[i];try{this._insertChild(_41,_41.column);}catch(e){console.error("Unable to insert child in GridContainer",e);}}},_connect:function(_42){this._connects.push(_42);},getActions:function(){var _43=this,_44=this.inherited(arguments),_45={parent:"settings",name:"addGadgets",label:_11.componentselection.addgadgetstitle,type:"menuitem",action:_3.hitch(this,this.showComponentSelector)},_46={parent:"settings",name:"rearrangeGadgets",label:_11.componentselection.rearrangegadgets,type:"checkedmenuitem",action:function(){_3.hitch(this,_43.changeLockButtonState(this.checked));}};_44.splice(_44.length,0,_45);_44.splice(_44.length,0,_46);return _44;}});});