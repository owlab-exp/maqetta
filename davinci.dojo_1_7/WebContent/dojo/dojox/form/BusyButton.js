/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define(["dojo","dijit","dojox","dijit/form/Button","dijit/form/DropDownButton","dijit/form/ComboButton","dojo/i18n","dijit/nls/loading"],function(_1,_2,_3){
_1.getObject("dojox.form.BusyButton",1);
_1.requireLocalization("dijit","loading");
_1.declare("dojox.form._BusyButtonMixin",null,{isBusy:false,busyLabel:"",timeout:null,useIcon:true,postMixInProperties:function(){
this.inherited(arguments);
if(!this.busyLabel){
this.busyLabel=_1.i18n.getLocalization("dijit","loading",this.lang).loadingState;
}
},postCreate:function(){
this.inherited(arguments);
this._label=this.containerNode.innerHTML;
this._initTimeout=this.timeout;
if(this.isBusy){
this.makeBusy();
}
},makeBusy:function(){
this.isBusy=true;
this.set("disabled",true);
this.setLabel(this.busyLabel,this.timeout);
},cancel:function(){
this.set("disabled",false);
this.isBusy=false;
this.setLabel(this._label);
if(this._timeout){
clearTimeout(this._timeout);
}
this.timeout=this._initTimeout;
},resetTimeout:function(_4){
if(this._timeout){
clearTimeout(this._timeout);
}
if(_4){
this._timeout=setTimeout(_1.hitch(this,function(){
this.cancel();
}),_4);
}else{
if(_4==undefined||_4===0){
this.cancel();
}
}
},setLabel:function(_5,_6){
this.label=_5;
while(this.containerNode.firstChild){
this.containerNode.removeChild(this.containerNode.firstChild);
}
this.containerNode.innerHTML=this.label;
if(this.showLabel==false&&!(_1.attr(this.domNode,"title"))){
this.titleNode.title=_1.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
if(_6){
this.resetTimeout(_6);
}else{
this.timeout=null;
}
if(this.useIcon&&this.isBusy){
var _7=new Image();
_7.src=this._blankGif;
_1.attr(_7,"id",this.id+"_icon");
_1.addClass(_7,"dojoxBusyButtonIcon");
this.containerNode.appendChild(_7);
}
},_onClick:function(e){
if(!this.isBusy){
this.makeBusy();
}
}});
_1.declare("dojox.form.BusyButton",[_2.form.Button,_3.form._BusyButtonMixin],{});
_1.declare("dojox.form.BusyComboButton",[_2.form.ComboButton,_3.form._BusyButtonMixin],{});
_1.declare("dojox.form.BusyDropDownButton",[_2.form.DropDownButton,_3.form._BusyButtonMixin],{});
return _1.getObject("dojox.form.BusyButton");
});
require(["dojox/form/BusyButton"]);
