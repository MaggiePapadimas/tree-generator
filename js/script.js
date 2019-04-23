var viewer;
function setup(){
	// set up viewer
	viewer = new Viewer3D();

	// make the tree
	var	tree = new TreeMaker(7,20);

	// transfer all branches of the tree to the viewer
	for(var i = 0; i < tree.branches.length; ++i){
		viewer.AddMesh(tree.branches[i]);
	}
}


// calls the viewr to update and manages moving around (in/out and pan)
function draw(){

	// update the viewer
	viewer.UpdateFrame();

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
}
