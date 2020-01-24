//画面幅等の設定
var width = 960;
var height = 540;
// ステージを作る
var stage = new PIXI.Stage(0x000000);
// レンダラーを作る
var renderer = PIXI.autoDetectRenderer(width, height);
// レンダラーのviewをDOMに追加する
document.getElementById("pixiview").appendChild(renderer.view);


// 変数の初期化
var isHost=false;
var isSpectator=false;
var time=0;
var starttime=Number.MAX_SAFE_INTEGER;
var roomID="rampro";
var pass="";
var name="";
var id="";
var isReady=false;
var update_stop=false;
var myans=0;
//scene
var scene=0;// 0:settings,1:game standby scene,2:game scene,3:end scene
var sceneCount=0;
var timeflag=true;
var timeComparable=false;
var solved=0;
var winner="";
// Host
var hostUpdateCount=0;
var readyIDs;
//Problem
var problems;
// Get関数
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

function changeData(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator+"&isReady="+isReady, true);
	request.responseType = 'json';
	// console.log('/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator);
	request.onload = function () {
		console.log("dataSend:"+this.response);
	};
	request.send();
}
function getReadyNames(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/getReadyNames', true);
	request.responseType = 'json';
	request.onload = function () {
		readyIDs=this.response;
		//console.log(this.response);
	};
	request.send();
}
function changeScene(scenenum){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/sceneChange/?scene='+scenenum, true);
	request.responseType = 'json';
	// console.log('/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator);
	
	console.log(time);
	request.onload = function () {
		console.log(this.response);
		starttime=this.response;
	};
	request.send();
}
function getDatas(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/getDatas/?id='+id, true);
	request.responseType = 'json';
	// console.log('/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator);
	request.onload = function () {
		console.log(this.response);
		starttime=Number.MAX_SAFE_INTEGER;
		scene=this.response.scene;
	};
	request.send();
}
//個人のデータを取得する
var res;
var userdatas;
function getData(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/getData', true);
	request.responseType = 'json';
	// console.log('/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator);
	request.onload = function () {
		console.log(this.response["com"]);
		userdatas=this.response;
		res=this.response["com"];
		if(res.commands!=null)
			if((res.commands.length>1)&&(res.commands[0]=="winner")){
				winner=res.commands[1];
				scene=3;
			}
		//console.log(id+" : "+this.response[id].name);
		//console.log(this.response);
	};
	request.send();
}
function getProblems(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/getProblems', true);
	request.responseType = 'json';
	// console.log('/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator);
	request.onload = function () {
		//console.log(this.response);
		problems=this.response;
	};
	request.send();
}
function setStartTime(nowtime){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/setStartTime/?nowtime='+nowtime, true);
	request.responseType = 'json';
	// console.log('/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator);
	
	request.onload = function () {
		//console.log(this.response);
		starttime=this.response;
		timeComparable=true;
	};
	request.send();
}
function statusInit(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/setStatus', true);
	request.responseType = 'json';
	// console.log('/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator);
	
	request.send();
}
function solvedp(){
	solved++;
	var request = new XMLHttpRequest();
	if(solved==problems.length){
		scene=3;
		winner=name;
		request.open('GET', '/api/rampro/gameEnd/?id='+id, true);
		request.responseType = 'json';
		request.onload = function () {
		};
	}else{
		request.open('GET', '/api/rampro/solved/?id='+id, true);
		request.responseType = 'json';
	
		request.onload = function () {
			console.log(this.response);
		};
	}
	request.send();
}
function gameOver(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/gameOver/?id='+id, true);
	request.responseType = 'json';
	// console.log('/api/changeData/?name='+name+"&id="+id+"&isHost="+isHost+"&isSpectator="+isSpectator);
	request.onload = function () {
		scene=this.response.scene;
	};
	request.send();
}
// その他の関数
function getRadioStatus(){
	var element = document.getElementById("host") ;
	var radioNodeList = element.host ;
	isHost= radioNodeList.value=="true";
	element = document.getElementById("gamemode") ;
	radioNodeList = element.gamemode ;
	isSpectator= radioNodeList.value=="true";
	changeData();
	hostUpdateCount=0;
}
function setName(){
	var element = document.getElementById("name") ;
	name=element.nametext.value;
	changeData();
}
function makeID(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/makeID', true);
	request.responseType = 'json';
	request.onload = function () {
		id=this.response;
		getRadioStatus();
		setName();
		console.log(this.response);
	};
	request.send();
}
function init(){
	changeScene(0);
	update_stop=false;
	time=0;
	myans=0;
	scene=0;// 0:settings,1:game standby scene,2:game scene,3:end scene
	sceneCount=0;
	timeflag=true;
	timeComparable=false;
	solved=0;
	winner="";
	// Host
	hostUpdateCount=0;
}
// 文,位置,文字寄せ
function drawText(sentence,x,y,ancx=0.5,ancy=0.5,fontSize=60,fontFamily='Snippet',fillColor="white"){
	var text = new PIXI.Text(sentence, { fontSize:fontSize , fontFamily: fontFamily, fill: fillColor});
	text.position.y=y;
	text.position.x=x;
	text.anchor.x=ancx;
	text.anchor.y=ancy;
	stage.addChild(text);
}
// 初期処理
// newProblemsRequest();
makeID();


// update関数を定義する
function update(){
  stage.children.length = 0;
  console.log("update"+scene);
  if(update_stop==false){
	  keyupdate();
	  switch(scene){
		case 0:
			sceneCount++;
			if(sceneCount%60==0){
				getDatas();
			}
			if(isHost)
				hostUpdate();
			if(isSpectator)
				spectatorUpdate();
			else
	  			gameUpdate();
			drawText(name,width/2,height/2,0.5,-0.5);
			break;
		case 1:
			scene2();
			break;
		case 2:
			if(sceneCount%60==0){
				getData();
			}
			if(isHost)
				hostUpdate2();
			if(isSpectator)
				spectatorUpdate2();
			else
	  			gameUpdate2();
			sceneCount++;
			break;
		case 3:
			if(sceneCount%60==0){
				getData();
			}
			gameOver();
			sceneCount++;
			break;
		case 4:
			break;
	  }
  }
  requestAnimationFrame(update); // 次の描画タイミングでupdateを呼び出す
  // logoimg.rotation += 0.01; // スプライトを回転する
  renderer.render(stage);   // 描画する
}
function hostUpdate(){
	drawText('Host',width/2,height/2,0.5,1.5);
	if(readyIDs!=undefined){
		for(var i=0;i<readyIDs.length;i++){
			drawText('id '+i+' : '+readyIDs[i],0,30*i,0,0,30);
		}
	}
	if(hostUpdateCount%60==0){
		getReadyNames();
	}hostUpdateCount++;
	
	if(isPress(32)&&readyIDs.length>0){
		newProblemsRequest();
		changeScene(1);
	}
}
function spectatorUpdate(){
	drawText('Spectator',width/2,height/2);
}
function gameUpdate(){
	drawText('Game',width/2,height/2);
	if(isPress(13)){
		isReady^=true;
		isReady=(isReady==true);
		changeData();
	}
	if(isReady){
		drawText('Ready',width/2,height/2,0.5,2.5);
	}else{
		drawText('in preparation',width/2,height/2,0.5,2.5);
	}
}
function scene2(){

	//drawText('Scene2',width/2,height/2);
	if(timeflag==true){
		timeflag^=true;
		setStartTime((new Date()).getTime());
		getProblems();
	}
	time=(new Date()).getTime();
	if(timeComparable==true){
		drawText('Starts after '+(starttime-time)/1000,width*1/9,height/2,0,1.5);
		drawText("seconds",width*5/7,height/2,0,1.5);
		if(time>=starttime){
			//sceneCount=0;
			scene++;
		}
	}
}
function hostUpdate2(){
	drawText('host',0,0,0,0,30);
}
function spectatorUpdate2(){
}
function gameUpdate2(){
	
	var text=""+problems[solved][0];
	for(var i=1;i<problems[solved].length;i++){
		text+=" × "+problems[solved][i];
	}
	drawText(text,width/2,height/2,0.5,0.5,60);
	for(var i=0;i<10;i++){
		if(isPress(48+i)){
			myans=myans*10+i;
		}
	}
	for (let key in userdatas){
		if(key!="com"&&key!=id){
			drawText(userdatas[key].name,width*4/5,height/15*(14-userdatas[key].solved),0,0,20);
		}
	}
	if(userdatas!=undefined)
		if(userdatas[id]!=undefined)
			drawText(userdatas[id].name,width*4/5,height/15*(14-userdatas[id].solved),0,0,20,'Snippet',"red");
	drawText(myans,width/2,height*4/5);
	if(isPress(13)){
		var ans=1;
		for(var i=0;i<problems[solved].length;i++){
			ans*=problems[solved][i];
		}
		if(ans==myans){
			solvedp();
		}
		myans=0;
	}
	else if(isPress(8)||isPress(46))myans=Math.floor(myans / 10);
}
function gameOver(){
	drawText("winner:"+winner,width/2,height/2,0.5,0.5,60);
	if(isPress(13)){
		statusInit();
		/*
		//init();
		const h = document.host.host;

		h[1].checked = true;
		//makeID();*/
	}
}

// 次のアニメーションフレームでanimate()を呼び出してもらう
requestAnimationFrame(update);


/*
 * 要らないコード類 //画像からスプライトオブジェクトを作る //var texture =
 * PIXI.Texture.fromImage('../../img/logo.png'); //var logoimg = new
 * PIXI.Sprite(texture); //logoimg.position.x = 0; //logoimg.position.y = 0;
 * //スプライトをステージに乗せる //stage.addChild(logoimg); var word = "Hello World!"; var
 * style = {font:'bold 60pt Arial', fill:'white',align : 'center'}; var textobj =
 * new PIXI.Text(word, style);
 */