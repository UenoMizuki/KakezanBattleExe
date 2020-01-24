var width = 960,height=560;
var ans=0,trueans=0;
var isDrawable=false;

var data;
var usersdata;
var id;
var timer=0;
var winner="po";
function update(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/update/?id='+id, true);
    request.responseType = 'json';
 
    request.onload = function () {
	  usersdata=this.response;
    };
 
    request.send();
	
}
function getwinner(){
	var request = new XMLHttpRequest();
	
    request.open('GET', '/api/winner', true);
    request.responseType = 'json';
 
    request.onload = function () {
    	winner=this.response.win;
    };
 
    request.send();
}
var sketch = function(p5) {
    p5.setup = function() {
    	p5.size(width,height);
    	p5.frameRate(30);
    	console.log(p5.frameRate);
    	
    };

  	p5.draw = function() {
  		if((timer%60)==0){
  			update();
  			getwinner();
  		}
  		
  		if(usersdata!=undefined){
  			p5.background(0);
  			p5.textAlign(p5.CENTER);
  		    p5.fill(255);
  		    
		    p5.textAlign(p5.LEFT);
		    p5.textSize(18);
			var userindex;
			var te=["","","","","","","","","","","","","",""];

			p5.text("winner:"+winner,width*1/8+20, height/16);
			for(var i=0;i<usersdata.length;i++){
				te[usersdata[i].solved]+=(usersdata[i].name+" ")
			}
			for(var i=0;i<14;i++){
				p5.ellipse(width*1/8, height*14/16-(i-1)*height/16, 30,30);
				p5.text(te[i],width*1/8+20, height*14/16-(i-1)*height/16+8);
			}
		}
	  	keyupdate();
	    timer++;
	
  	};
};

var canvas = document.getElementById("myCanvas");
var processing = new Processing(canvas, sketch);
