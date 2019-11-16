var $P=function(unknown){
	return new Base(unknown);
}
function Base(unknown){
	this.base=[];
	if(typeof unknown=='string'){
		var temp=[];
		var parent=[];
		var split=unknown.split(' ');
		for(var i=0;i<split.length;i++){
			if(parent.length==0){
				parent.push(document);
			}
			switch(split[i].charAt(0)){
				case '#' :
					temp=[];
					temp.push(document.getElementById(split[i].substring(1)));
					parent=temp;
				break;
				case '.' :
					temp=[];
					for(var j=0;j<parent.length;j++){
						var tags=parent[j].getElementsByTagName('*');
						for(var k=0;k<tags.length;k++){
							if((new RegExp('(\\s|^)'+ split[i].substring(1) +'(\\s|$)')).test(tags[k].className)){
								temp.push(tags[k]);							
							}
						}
					}
					parent=temp;
				break;
				default :
					temp=[];
					for(var j=0;j<parent.length;j++){
						var tags=parent[j].getElementsByTagName(split[i]);
						for(var k=0;k<tags.length;k++){
							temp.push(tags[k]);
						}
					}
			}
			this.base=temp;
		}
	}else if(typeof unknown=='object'){
		var temp=[];
		temp.push(unknown);
		this.base=temp;
	}
}
Base.prototype.get=function(num){
	if(arguments.length==0){
		return this.base;
	}else{
		return this.base[num];	
	}
}
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.base.length;i++){
		this.base[i].style[attr]=value;	
	}
	return this;
}
Base.prototype.html=function(innerhtml){
	for(var i=0;i<this.base.length;i++){
		this.base[i].innerHTML=innerhtml;
	}
	return this;
}
Base.prototype.opacity_animate=function(step,target){
	var buffer=step;
	for(var i=0;i<this.base.length;i++){
		var element=this.base[i];
		clearInterval(element.timer);
		element.timer=setInterval(function(){
			step=(target-parseFloat(getStyle(element,'opacity'))*100)/buffer;
			step=step>0?Math.ceil(step):Math.floor(step);
			if(step>=0&&parseFloat(getStyle(element,'opacity'))*100>=target){
				element.style.opacity=target/100;
				element.style.filter='alpha(opacity='+ target +')';
				clearInterval(element.timer)
			}else if(step<=0&&parseFloat(getStyle(element,'opacity'))*100<=target){
				element.style.opacity=target/100;
				element.style.filter='alpha(opacity='+ target +')';
				clearInterval(element.timer)
			}else{
				var temp=parseInt(parseFloat(getStyle(element,'opacity'))*100+step);
				element.style.opacity=(temp)/100;
				element.style.filter='alpha(opacity='+ temp +')';
			}
		},30)
	}
	return this;
}
Base.prototype.left_animate=function(attr,step,alter,target,Fn){
	var buffer=step;
	for(var i=0;i<this.base.length;i++){
		var element=this.base[i];
		if(alter!=0){
			var target=parseInt(getStyle(element,attr))+alter;
		}
		clearInterval(element.timer);
		element.timer=setInterval(function(){
			step=(target-parseInt(getStyle(element,attr)))/buffer;
			step=step>0?Math.ceil(step):Math.floor(step);
			if(step>=0&&parseInt(getStyle(element,attr))>=target){
				element.style[attr]=target+'px';
				clearInterval(element.timer)
				if(Fn){Fn();}
			}else if(step<=0&&parseInt(getStyle(element,attr))<=target){
				element.style[attr]=target+'px';
				clearInterval(element.timer)
			}else{
				element.style[attr]=parseInt(getStyle(element,attr))+step+'px';
			}
		},50)
	}
	return this;
}
Base.prototype.opacity=function(arg){
	for(var i=0;i<this.base.length;i++){
		this.base[i].style.opacity=arg/100;
		this.base[i].style.filter='alpha(opacity='+ arg +')';
	}
	return this;
}
Base.prototype.hide=function(){
	for(var i=0;i<this.base.length;i++){
		this.base[i].style.display='none';
	}
	return this;
}
Base.prototype.show=function(){
	for(var i=0;i<this.base.length;i++){
		this.base[i].style.display='block';
	}
	return this;
}
Base.prototype.change=function(){
	for(var i=0;i<this.base.length;i++){
		(function(element,args){
			var num=0;
			addEvent(element,'click',function(){
				args[num++%args.length].call(this);
			})
		})(this.base[i],arguments);
	}
	return this;
}
Base.prototype.value=function(value)
{
	for(var i=0;i<this.base.length;i++)
	{
		if(!value){return this.base[i].value}
		this.base[i].value=value;
	}
	return this;
}






