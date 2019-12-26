var width = 960,height=560;
var ans=0,trueans=0;
var isDrawable=false;

var data;
var id;
function newIDrequest(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/makeid', true);
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
var sketch = function(p5) {
    p5.setup = function() {
    	p5.size(width,height);
    	p5.frameRate(30);
    	console.log(p5.frameRate);
    	newrequest()
    	
    };

  	p5.draw = function() {
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
	    if(isPress(13)){
	    	if(ans===trueans){
	    		newrequest();
	    		isDrawable=false;
	    	}
    		ans=0;
	    }
	    if(ans!=0)
	    	p5.text(ans,width/2,height*5/7);
	    
	}
  };
};

var canvas = document.getElementById("myCanvas");
var processing = new Processing(canvas, sketch);
