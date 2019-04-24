// viewer class contains all parts for viewing in 3D
function Viewer3D(){
  this.meshes = [];
  this.scene = new THREE.Scene();

  var w = window.innerWidth;
  var h = window.innerHeight - 110;

  this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1 , 1000);
  this.renderer = new THREE.WebGLRenderer( {alpha : true});
  this.renderer.setSize ( w, h );
  this.renderer.setClearColor( new THREE.Color(0x87CEEB) , 1);

  document.body.appendChild(this.renderer.domElement);

    // if the window is resized, this function is called to rescale the viewport so that the image isnt streched
  //  window.addEventListener('resize', function(){
  //  	var w = window.innerWidth -  - 20;
  //  	var h = window.innerHeight;
  //  	this.renderer.setSize(w,h);
  //  	this.camera.aspect = w/h;
  //  	this.camera.updateProjectionMatrix();
  //  });

  this.ResetCamera();
}

// this rotates the meshes and updates the frame
Viewer3D.prototype.UpdateFrame = function () {
  this.renderer.render(this.scene, this.camera);
};

// add a mesh to the scene
Viewer3D.prototype.AddMesh = function(mesh){
  this.meshes.push(mesh);
  this.scene.add(this.meshes[this.meshes.length - 1]);
}

// add a mesh to the scene
Viewer3D.prototype.NewScene = function(){
  this.scene = new THREE.Scene();
  this.mesehes = [];
}


Viewer3D.prototype.ResetCamera = function(){
  // start with the camera slighlty back so that the origin can be viewed
    this.camera.position.z = 100;
    this.camera.position.y = 30;

}
