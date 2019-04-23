var viewer;
function setup(){
	// set up viewer
	viewer = new Viewer3D();

	// make the tree
	var	tree = new TreeMaker(6,20);
	viewer.AddMesh(tree.root);

	var light = new THREE.AmbientLight( 0x909090 ); //white light
	// White directional
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7);
	directionalLight.position.x = 1;
	directionalLight.position.y = 1;
	directionalLight.position.z = 1;

	viewer.scene.add( directionalLight );
	viewer.scene.add( light );

	var floorMat = new THREE.MeshBasicMaterial( { color: new THREE.Color("rgb(52, 120, 36)")  } );
	var floorGeom = new THREE.BoxGeometry( 2000, 30, 2000);
	var floorMesh = new THREE.Mesh(floorGeom, floorMat);
	floorMesh.position.y = -15
	viewer.AddMesh( floorMesh );
}


// calls the viewr to update and manages moving around (in/out and pan)
function draw(){

	// update the viewer
	viewer.UpdateFrame();
	viewer.meshes[0].rotation.y += 0.01;

	//movement
	if(keyIsDown(83)){
		viewer.camera.position.z++;
	}
	if(keyIsDown(87)){
		viewer.camera.position.z--;
	}
	if(keyIsDown(65)){
		viewer.camera.position.x--;
	}
	if(keyIsDown(68)){
		viewer.camera.position.x++;
	}
	if(keyIsDown(32)){
		viewer.camera.position.y++;
	}
	if(keyIsDown(16)){
		viewer.camera.position.y--;
	}
}
