//>>built
define("epi/shell/command/_CommandConsumerMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang"],function(_1,_2,_3){return _2(null,{providers:null,constructor:function(){this.providers=this.providers||[];},uninitialize:function(){_1.forEach(this.providers,function(_4){_4.watch.unwatch();});},getConsumer:function(){return this;},addProvider:function(_5){var _6=_5.watch("commands",_3.hitch(this,this._commandsChanged));this.providers.push({provider:_5,watch:_6});this.onCommandsChanged("commands",null,_5.commands);return {removeProvider:_3.hitch(this,this.removeProvider,_5)};},removeProvider:function(_7){var _8=this.providers;for(var i=_8.length-1;i>=0;i--){if(_8[i].provider==_7){break;}}if(i>=0){_8.splice(i,1);this.onCommandsChanged("commands",_7.commands,null);}},getCommands:function(){var _9=[];_1.forEach(this.providers,function(_a){_9=_9.concat(_a.provider.commands);});return _9;},onCommandsChanged:function(_b,_c,_d){},_commandsChanged:function(){this.onCommandsChanged.apply(this,arguments);}});});