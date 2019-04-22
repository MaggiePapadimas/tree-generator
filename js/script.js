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


var geom = new THREE.BoxGeometry(1,1,1);
var mat = new THREE.MeshBasicMaterial( {color : 0xFFFFFF, wireframe : false});
var cube = new THREE.Mesh(geom, mat);
scene.add(cube);
camera.position.z = 3;
//logic
var update = function(){
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.001;
	cube.rotation.z += 0.0001;
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
