//>>built
define("epi/packaging/RootContainer",["epi","dojo","dijit","dijit/layout/BorderContainer","epi/packaging/AntiForgeryData","epi/packaging/Toolbar","epi/packaging/NavigationMenu","epi/shell/widget/WidgetSwitcher","dijit/layout/ContentPane"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _2.declare("epi.packaging.RootContainer",[_4],{_antiForgeryData:null,startup:function(){if(this._started){return;}this._antiForgeryData=new _5(this.antiForgeryToken);var _a=new _6();var _b=new _9({region:"top",content:_a});this.addChild(_b);var _c=new _7({antiForgeryData:this._antiForgeryData});var _d=new _9({region:"left",content:_c,style:"width: 17em"});this.addChild(_d);var _e=new _8({componentConstructorArgs:{antiForgeryData:this._antiForgeryData},skipInitialRequest:true,supportedContextTypes:[]});var _f=new _9({region:"center",content:_e});this.addChild(_f);this.inherited(arguments);}});});