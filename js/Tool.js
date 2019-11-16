function addEvents(objs,type,Fn){
	for(var i=0;i<objs.length;i++){
		addEvent(objs[i],type,Fn);
	}
}
function addEvent(obj,type,Fn){
	if(typeof obj.addEventListener != 'undefined'){
		obj.addEventListener(type,Fn,false);
	}else{
		if(!obj.events){
			obj.events={};
		}
		if(!obj.events[type]){
			obj.events[type]=[];
		}else{
			for(var i in obj.events[type]){
				if(obj.events[type][i]==Fn){
					return false;
				}
			}
		}
		obj.events[type][addEvent.num++]=Fn;
		obj['on' + type]=function(){
			for(var i in this.events[type]){
				this.events[type][i].call(this,window.events);
			}
		};
	}
}
addEvent.num=0;
function index(element){
	var children=element.parentNode.children;
	for(var i=0;i<children.length;i++){
		if(element==children[i]){
			return i;
		}
	}
}
function getStyle(element,attr){
	var value=null;
	if(typeof window.getComputedStyle != 'undefined'){
		value = window.getComputedStyle(element,null)[attr];		
	}else if(typeof element.currentStyle != 'undefined'){
		value = element.currentStyle[attr];
	}
	return value;
}







