// instantiate a loader
var scene = new THREE.Scene();
// var loader = new THREE.OBJLoader();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//logic
var update = function(){

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
