addEvent(window,'load',function(){
	$P('.player .player_center img').opacity(0);
	$P($P('.player .player_center img').get(0)).css('zIndex',2).opacity(100);
	$P($P('.player .player_center ul li').get(0)).css('background','url(images/circle.png) no-repeat');
	var num=1;
	var flag=true;
	var img_timer=setInterval(auto,2500)
	var length=$P('.player .player_center img').get().length;
	function auto(){
		flag=false;
		if(num>=length){
			num=0;
		}
		var pre_img=num==0?length-1:num-1;
		$P($P('.player .player_center img').get(pre_img)).opacity_animate(15,0).css('zIndex',1);
		$P($P('.player .player_center img').get(num)).opacity_animate(15,100).css('zIndex',2);
		$P('.player .player_center').get(0).setAttribute('index',num);
		$P('.player .player_center ul li').css('background','url(images/circle.png) no-repeat 0 -15px');
		$P($P('.player .player_center ul li').get(num)).css('background','url(images/circle.png) no-repeat');
		num++;
	}
	addEvents($P('.player .player_center ul li').get(),'click',function(){
		clearInterval(img_timer);
		var current=$P('.player .player_center').get(0).getAttribute('index');
		if(flag){
			current=0;
			flag=false;
		}
		$P($P('.player .player_center img').get(current)).css('zIndex',1).opacity_animate(1,0);
		$P($P('.player .player_center img').get(index(this))).css('zIndex',2).opacity_animate(15,100);
		$P('.player .player_center').get(0).setAttribute('index',index(this));
		$P('.player .player_center ul li').css('background','url(images/circle.png) no-repeat 0 -15px');
		$P($P('.player .player_center ul li').get(index(this))).css('background','url(images/circle.png) no-repeat');
		num=index(this)+1;
		img_timer=setInterval(auto,2500);
	})
})