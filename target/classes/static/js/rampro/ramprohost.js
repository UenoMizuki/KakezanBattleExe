//画面幅等の設定
var width = 960;
var height = 540;
// ステージを作る
var stage = new PIXI.Stage(0x000000);
// レンダラーを作る
var renderer = PIXI.autoDetectRenderer(width, height);
// レンダラーのviewをDOMに追加する
document.getElementById("pixiview").appendChild(renderer.view);

//変数の初期化
var isHost=false;
var isSpectator=false;
var time=0;
var roomID="rampro";
var pass="";
var name="";

var text = new PIXI.Text('This is Center', { font: '60px Snippet', fill: 'white'});
text.position.y=height/2;
text.position.x=width/2;
text.anchor.set(0.5);
stage.addChild(text);

//その他の関数
function newProblemsRequest(){
	if(isHost){
		var request = new XMLHttpRequest();
		request.open('GET', '/api/make', true);
		request.responseType = 'json';
		request.onload = function () {
			console.log(this.response);
		};
		request.send();
	}
}
function getRadioStatus(){
	var element = document.getElementById("host") ;
	var radioNodeList = element.host ;
	isHost= radioNodeList.value;
	element = document.getElementById("gamemode") ;
	radioNodeList = element.gamemode ;
	isSpectator= radioNodeList.value;
	console.log("host "+isHost);
	console.log("spec "+isSpectator);
}
function setName(){
	var element = document.getElementById("name") ;
	name=element.nametext.value;
	console.log(name);
}
function makeID(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/makeID', true);
	request.responseType = 'json';
	request.onload = function () {
		console.log(this.response);
	};
	request.send();
}
//初期処理
//newProblemsRequest();
makeID();
getRadioStatus();
setName();


// update関数を定義する
function update(){
  keyupdate();
  if(isHost){
	  hostUpdate()
  }
  if(isSpectator){
	  spectatorUpdate();
  }else{
	  gameUpdate();
  }
  requestAnimationFrame(update); // 次の描画タイミングでanimateを呼び出す
  //logoimg.rotation += 0.01; // スプライトを回転する
  renderer.render(stage);   // 描画する
}
function hostUpdate(){
	
}
function spectatorUpdate(){
	
}
function gameUpdate(){
	
}
// 次のアニメーションフレームでanimate()を呼び出してもらう
requestAnimationFrame(update);


/*要らないコード類
//画像からスプライトオブジェクトを作る
//var texture = PIXI.Texture.fromImage('../../img/logo.png');
//var logoimg = new PIXI.Sprite(texture);
//logoimg.position.x = 0;
//logoimg.position.y = 0;
//スプライトをステージに乗せる
//stage.addChild(logoimg);
var word = "Hello World!";
var style = {font:'bold 60pt Arial', fill:'white',align : 'center'};
var textobj = new PIXI.Text(word, style);*/