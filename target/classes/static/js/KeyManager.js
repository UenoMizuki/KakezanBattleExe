var keyPre = Array.apply(null, Array(256)).map(function () {return false });
var keyNow = Array.apply(null, Array(256)).map(function () {return false });
var keyNext = Array.apply(null, Array(256)).map(function () {return false });

function keyupdate(){
	for(var i=0;i<256;i++){

		keyPre[i]=keyNow[i];
		keyNow[i]=keyNext[i];
	}
}

function isPressed(keycode) {
    return keyNow[keycode];
}
function isPress(keycode) {
    return keyNow[keycode]&&!keyPre[keycode];
}
function onPressed(keycode) {
    return keyPre[keycode]&&keyNow[keycode];
}
function onReleased(keycode) {
    return keyPre[keycode]&&!keyNow[keycode];
}

document.addEventListener('keydown', (event) => {
    keyNext[event.keyCode]=true;
    //console.log("press:"+event.keyCode);
    console.log(event.keyCode);
});
 
document.addEventListener('keyup', (event) => {
    keyNext[event.keyCode]=false;
    //console.log("up:"+event.keyCode);
});

/*
public static boolean isPressed(int keys[]){
	boolean result = true;
	for(int key : keys){
		result = result && keyNow[key];
		if(!result) break;
	}

	return result;
}*/