
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var framerate=1000/60;
var width=canvas.width;
var height=canvas.height;

var count=0;

//XMLHttpRequestオブジェクトの作成
var request = new XMLHttpRequest();

// URLを開く
request.open('GET', "/api/newkakezan", true);

// レスポンスが返ってきた時の処理を記述 
request.onload = function () {
  console.log(request);
}

// リクエストをURLに送信
request.send();

var https=require('https');
var url = '/api/newkakezan/?range=10&num=5';

https.get(url, function (res) { 
	console.log(res);
});



function update(){
    ctx.clearRect(0, 0, width, height);
	ctx.fillStyle="black";
	ctx.font = "italic 100px Arial";
	//ctx.fillText("hello"+count++,100,100);
}
setInterval(update, framerate);