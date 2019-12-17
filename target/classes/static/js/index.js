window.addEventListener("DOMContentLoaded", init);

function init() {
	const width = 960;
	const height = 540;

	// レンダラーを作成
	const renderer = new THREE.WebGLRenderer({
		canvas : document.querySelector("#myCanvas")
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);

	// シーンを作成
	const scene = new THREE.Scene();

	// カメラを作成
	const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	camera.position.set(0, 0, +1000);

	// 箱を作成
	const geometry = new THREE.BoxGeometry(500, 500, 500);
	const material = new THREE.MeshStandardMaterial({
		color : 0x0000ff
	});
	const box = new THREE.Mesh(geometry, material);
	scene.add(box);

	var textBoardObject = new TextBoardObject({
		fontSize : 80, // [%]
		textColor : {
			r : 1,
			g : 1,
			b : 1,
			a : 1
		},// 文字色
		backgroundColor : {
			r : 1,
			g : 1,
			b : 1,
			a : 0.1
		},// 背景色（RGBA値を0から１で指定）
		boardWidth : 100, // マッピング対象平面オブジェクトの横幅
		boardHeight : 100, // マッピング対象平面オブジェクトの縦幅

		fontName : "Times New Roman"
	});
	textBoardObject.addTextLine("Hello", 1, 1);
	scene.add(textBoardObject);

	// 平行光源
	const light = new THREE.DirectionalLight(0xffffff);
	light.intensity = 2; // 光の強さを倍に
	light.position.set(0, 0, 10);
	// シーンに追加
	scene.add(light);

	var color = 0;
	// 初回実行
	tick();
	function tick() {
		requestAnimationFrame(tick);
		color = (++color) % 600;

		if (color < 100) {
			material.color.r = 1;
			material.color.g = color / 100;
			material.color.b = 0;
		} else if (color < 200) {
			material.color.r = 1-(color%100)/100;
			material.color.g = 1;
			material.color.b = 0;
		} else if (color < 300) {
			material.color.r = 0;
			material.color.g = 1;
			material.color.b = (color%100)/100;
		} else if (color < 400) {
			material.color.r = 0;
			material.color.g = 1-(color%100) / 100;
			material.color.b = 1;
		} else if (color < 500) {
			material.color.r = (color%100)/100;
			material.color.g = 0;
			material.color.b = 1;
		} else {
			material.color.r = 1;
			material.color.g = 0;
			material.color.b = 1-(color%100)/100;
		}

		// 箱を回転させる
		box.rotation.x += 0.01;
		box.rotation.y += 0.01;
		box.rotation.z += 0.005;

		// レンダリング
		renderer.render(scene, camera);
	}
}