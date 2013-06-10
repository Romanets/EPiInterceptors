//>>built
define("epi/cms/widget/FolderTreeStoreModel",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Deferred","dojo/aspect","epi/dependency","epi/cms/contentediting/ContentActionSupport","epi/cms/widget/sharedContentDialogHandler","epi/cms/widget/ContentTreeStoreModel"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _1("epi.cms.widget.FolderTreeStoreModel",_9,{typeIdentifiers:["epi.cms.folder"],_dataStore:null,childrenChangedTopic:"/epi/cms/blocktree/childrenchanged",constructor:function(){var _a=_6.resolve("epi.storeregistry");this._dataStore=_a.get("epi.cms.contentdata");this._subscribeHandle=dojo.subscribe(this.childrenChangedTopic,_2.hitch(this,this._childrenChanged));},destroy:function(){this.inherited(arguments);if(this._subscribeHandle){this._subscribeHandle.remove();}},_childrenChanged:function(_b,_c){var _d=this.inherited(arguments);_d.then(_2.hitch(this,function(){if(_c){this._select(_c);}}));return _d;},add:function(_e){this._dataStore.add(_e).then(_2.hitch(this,this.onAdd));},rename:function(id,_f){var _10={id:id,properties:_f};var def=new _4();_4.when(this._dataStore.patch(_10,{id:_10.id}),_2.hitch(this,function(_11){_4.when(this._dataStore.patchCache({contentLink:_10.id,properties:_10.properties,capabilities:{supportsVersions:false}}),function(){def.resolve(_11);},function(){def.cancel();});}),function(){def.cancel();});return def;},getRoot:function(_12,_13){if(!this.root){_4.when(this.store.query({typeIdentifiers:this.typeIdentifiers}),_2.hitch(this,function(_14){this.root={children:_14,isRoot:true,label:"Folder root",id:"folder ID"};_12(this.root);}),_13);}else{_12(this.root);}},getChildren:function(_15,_16){if(_15===this.root){if(this.root.children){_16(this.root.children);}else{_4.when(this.store.query({typeIdentifiers:this.typeIdentifiers}),_2.hitch(this,function(_17){this.root.children=_17;_16(_17);}));}}else{this.inherited(arguments);}},_getAncestors:function(_18){var _19=_3.some(_18,_2.hitch(this,function(_1a){if(!this.root){return false;}return _3.some(this.root.children,function(_1b){return _1b.contentLink===_1a.contentLink;});}));if(_19){_18.unshift(this.root);return this.inherited(arguments);}return this.inherited(arguments);},getIdentity:function(_1c){return (_1c===this.root)?this.root:this.inherited(arguments);},getLabel:function(_1d){return (_1d===this.root)?this.root.label:this.inherited(arguments);},canPaste:function(_1e,_1f,_20){var _21=_7.hasAccess(_1f.accessMask,_7.accessLevel.Create);if(!_21||_20){return _21;}if(this._isParent(_1e,_1f)){return false;}return _4.when(this.isAncestor(_1e,_1f),function(_22){return !_22;});},copy:function(_23,_24){return _4.when(this.inherited(arguments),_2.hitch(this,function(_25){this._childrenChanged(_24,_24.contentLink);return _25;}));},move:function(_26,_27){return _4.when(this.inherited(arguments),_2.hitch(this,function(_28){this._childrenChanged(_27,_27.contentLink);return _28;}));},onAdd:function(){},select:function(_29){},_select:function(_2a){if(_2a){_4.when(this.store.get(_2a),_2.hitch(this,function(_2b){this.select(_2b);}));}},onDeleted:function(_2c){if(_2c&&_2c.parentLink){this._select(_2c.parentLink);}},_isParent:function(_2d,_2e){if(!_2d.parentLink){return false;}return (_2d.parentLink==_2e.contentLink);}});});