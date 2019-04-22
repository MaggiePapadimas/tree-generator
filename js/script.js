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
var perp = new THREE.Vector3(0,0,1);
camera.position.z = 50;
camera.position.y = 20;
var lines = []


function Branch(len, dir, rotation, start, num){
	var end = new THREE.Vector3(start.x, start.y, start.z);
	end.addScaledVector (dir, len);
	lines.push(MakeLine3D(start, end, 0.15));;
	if(num > 0){
		len *= 0.67;
		num--;
		var v0 = new THREE.Vector3(dir.x, dir.y, dir.z);
		var v1 = new THREE.Vector3(dir.x, dir.y, dir.z);

		v0.applyAxisAngle(perp, rotation);
		v1.applyAxisAngle(perp, -rotation);
		v0.normalize();
		v1.normalize();

		Branch(len, v0, rotation, end, num);
		Branch(len, v1, rotation, end, num);
	}
}

Branch(20, new THREE.Vector3(0,1,0), 3.141592/3, new THREE.Vector3(0,-1,0), 8);


for(var i = 0; i < lines.length; ++i){

	scene.add( lines[i] );

}
//logic
var update = function(){
	for(var i = 0; i < lines.length; ++i){

		lines[i].rotation.y += 0.01;
	}

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
