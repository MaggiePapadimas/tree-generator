// instantiate a loader
var scene = new THREE.Scene();
// var loader = new THREE.OBJLoader();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', function(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	renderer.setSize(w,h);
	camera.aspect = w/h;
	camera.updateProjectionMatrix();

});
var line0 = MakeLine3D(new THREE.Vector3(0,0,0), new THREE.Vector3(0,10,1));
var line1 = MakeLine3D(new THREE.Vector3(0,0,0), new THREE.Vector3(10,1,0));

scene.add( line0 );
scene.add( line1 );
//scene.add(cube);
camera.position.z = 30;
//logic
var update = function(){
	line0.rotation.x += 0.01;
	line0.rotation.y += 0.001;
	line0.rotation.z += 0.0001;

	line1.rotation.y += 0.01;
	line1.rotation.z += 0.001;
	line1.rotation.x += 0.0001;
};
// draws scene
var render = function(){
	renderer.render(scene, camera);
};
// runs GameLoop
var GameLoop = function(){
	requestAnimationFrame(GameLoop);
	update();
	render();
};

GameLoop();
