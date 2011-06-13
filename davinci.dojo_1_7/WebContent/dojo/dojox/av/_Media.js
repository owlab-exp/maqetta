/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define(["dojo"],function(_1){
_1.getObject("dojox.av",true);
_1.experimental("dojox.av.FLVideo");
_1.declare("dojox.av._Media",null,{mediaUrl:"",initialVolume:1,autoPlay:false,bufferTime:2000,minBufferTime:300,updateTime:100,id:"",isDebug:false,percentDownloaded:0,_flashObject:null,flashMedia:null,allowScriptAccess:"always",allowNetworking:"all",wmode:"transparent",allowFullScreen:true,_initStatus:function(){
this.status="ready";
this._positionHandle=_1.connect(this,"onPosition",this,"_figureStatus");
},getTime:function(){
return this.flashMedia.getTime();
},onLoad:function(_2){
},onDownloaded:function(_3){
},onClick:function(_4){
},onSwfSized:function(_5){
},onMetaData:function(_6,_7){
this.duration=_6.duration;
},onPosition:function(_8){
},onStart:function(_9){
},onPlay:function(_a){
},onPause:function(_b){
},onEnd:function(_c){
},onStop:function(){
},onBuffer:function(_d){
this.isBuffering=_d;
},onError:function(_e,_f){
console.warn("ERROR-"+_e.type.toUpperCase()+":",_e.info.code," - URL:",_f);
},onStatus:function(_10){
},onPlayerStatus:function(_11){
},onResize:function(){
},_figureStatus:function(){
var pos=this.getTime();
if(this.status=="stopping"){
this.status="stopped";
this.onStop(this._eventFactory());
}else{
if(this.status=="ending"&&pos==this._prevPos){
this.status="ended";
this.onEnd(this._eventFactory());
}else{
if(this.duration&&pos>this.duration-0.5){
this.status="ending";
}else{
if(pos===0){
if(this.status=="ready"){
}else{
this.status="stopped";
if(this._prevStatus!="stopped"){
this.onStop(this._eventFactory());
}
}
}else{
if(this.status=="ready"){
this.status="started";
this.onStart(this._eventFactory());
this.onPlay(this._eventFactory());
}else{
if(this.isBuffering){
this.status="buffering";
}else{
if(this.status=="started"||(this.status=="playing"&&pos!=this._prevPos)){
this.status="playing";
}else{
if(!this.isStopped&&this.status=="playing"&&pos==this._prevPos){
this.status="paused";
console.warn("pause",pos,this._prevPos);
if(this.status!=this._prevStatus){
this.onPause(this._eventFactory());
}
}else{
if((this.status=="paused"||this.status=="stopped")&&pos!=this._prevPos){
this.status="started";
this.onPlay(this._eventFactory());
}
}
}
}
}
}
}
}
}
this._prevPos=pos;
this._prevStatus=this.status;
this.onStatus(this.status);
},_eventFactory:function(){
var evt={status:this.status};
return evt;
},_sub:function(_12,_13){
_1.subscribe(this.id+"/"+_12,this,_13);
},_normalizeVolume:function(vol){
if(vol>1){
while(vol>1){
vol*=0.1;
}
}
return vol;
},_normalizeUrl:function(_14){
if(_14&&(_14.toLowerCase().indexOf("http")<0||_14.indexOf("/")==0)){
var loc=window.location.href.split("/");
loc.pop();
loc=loc.join("/")+"/";
_14=loc+_14;
}
return _14;
},destroy:function(){
if(!this.flashMedia){
this._cons.push(_1.connect(this,"onLoad",this,"destroy"));
return;
}
_1.forEach(this._subs,function(s){
_1.unsubscribe(s);
});
_1.forEach(this._cons,function(c){
_1.disconnect(c);
});
this._flashObject.destroy();
}});
return dojox.av._Media;
});
