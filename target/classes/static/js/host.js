var width = 960,height=560;
var ans=0,trueans=0;
var isDrawable=false;

var data;
var usersdata;
var id;
var timer=0;
var username = window.prompt("名前を入力して下さい");
function newIDrequest(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/makeid/?username='+username, true);
    request.responseType = 'json';
 
    request.onload = function () {
      id=this.response.id;
      console.log(this.response);
    };
    request.send();
}
newIDrequest();
function newrequest(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/newkakezan/?range=13&num=4', true);
    request.responseType = 'json';
 
    request.onload = function () {
      data = this.response;
      console.log(data);
      trueans=1;
      for(var i=0;i<data.num;i++){
    	  trueans*=data.value[i];
      }
      isDrawable=true;
    };
 
    request.send();
	
}
function update(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/update/?id='+id, true);
    request.responseType = 'json';
 
    request.onload = function () {
	  usersdata=this.response;
    };
 
    request.send();
	
}
function reset(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/reset/?id='+id, true);
    request.responseType = 'json';
 
    request.onload = function () {
      //console.log(this.response);
    };
 
    request.send();
	
}
function allreset(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/allreset/?id='+id, true);
    request.responseType = 'json';
 
    request.onload = function () {
      //console.log(this.response);
    };
 
    request.send();
	
}
function solved(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/solved/?id='+id, true);
    request.responseType = 'json';
 
    request.onload = function () {
      console.log(this.response);
    };
 
    request.send();
	
}
var sketch = function(p5) {
    p5.setup = function() {
    	p5.size(width,height);
    	p5.frameRate(30);
    	console.log(p5.frameRate);
    	newrequest()
    	
    };

  	p5.draw = function() {
  		if(timer>15){
  			timer=0;
  		}if(timer==0){
  			update();
  		}
	  	keyupdate();
	    for(var i=0;i<10;i++){
	    	if(isPress(i+48)){
	    		ans=ans*10+i;
	    	}
	    }
	    if(isPress(8)){
	    	ans=Math.floor(ans/10);
	    }
	  	if(isDrawable){
		  p5.background(0);
		  
	    //console.log(data);
	    /*p5.stroke(0, 255, 0);
	    p5.fill(0);
	    for (var i = 0; i < p5.width; i += 3) {
	      p5.rect(i, p5.noise(i / 50, p5.frameCount / 50) * p5.height, 10, 10);
	    }*/
	    p5.textAlign(p5.CENTER);
	    p5.fill(255);
	    var text=data.value[0];
	    
	    for(var i=1;i<data.num;i++){
	    	text+=" × "+data.value[i];
	    }
	    p5.textSize(64);
		p5.text(text,width/2,height*3/7);

		p5.rect(width*7/8-5, height/15, 10, height*13/15);
		if(usersdata!=undefined){

		    p5.textAlign(p5.LEFT);
		    p5.textSize(18);
			var userindex;
			for(var i=0;i<usersdata.length;i++){
				if(usersdata[i].ID==id){
					if(usersdata[i].reset){
						reset();
						newrequest();
					}
					userindex=i;
				}else if(i==usersdata.length-1){
					var c = p5.color(255,255,255);
					p5.fill(c);
					p5.ellipse(width*7/8, height*14/15-usersdata[i].solved*height/15, 30,30);
					p5.text(usersdata[i].name,width*7/8+20, height*14/15-usersdata[i].solved*height/15);
				}else{
					var c = p5.color(128,128,128);
					p5.fill(c);
					p5.ellipse(width*7/8, height*14/15-usersdata[i].solved*height/15, 25,25);
					p5.text(usersdata[i].name,width*7/8+20, height*14/15-usersdata[i].solved*height/15);
				}
			}

			var c = p5.color(255,0,0);
			p5.fill(c);
			p5.ellipse(width*7/8, height*14/15-usersdata[userindex].solved*height/15, 25,25);
			p5.text(usersdata[userindex].name,width*7/8+20, height*14/15-usersdata[userindex].solved*height/15);

			var c = p5.color(255,255,255);
			p5.fill(c);
		}
	    p5.textSize(64);
	    if(isPress(13)){
	    	if(ans===trueans){
	    		newrequest();
	    		isDrawable=false;
	    		solved();
	  			update();
	    	}
    		ans=0;
    		
	    }
	    if(isPress(32)){
	    	allreset();
    		ans=0;
	    }
	    if(ans!=0)
	    	p5.text(ans,width/2,height*5/7);
	    timer++;
	}
  };
};

var canvas = document.getElementById("myCanvas");
var processing = new Processing(canvas, sketch);
