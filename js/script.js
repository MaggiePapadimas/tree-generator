// sliders and buttons
var iterations;
var initialBranchLength;
var initialThickness;
var rotation;
var split;
var leafSize;

var newTreeButton;
var resetButton;


function setup(){
	// set up viewer
	viewer = new Viewer3D();

	// create sliders
	iterations = createSlider(1, 8, 6, 1);
	initialBranchLength = createSlider(2, 100, 20, 0);
	initialThickness = createSlider(0.1, 5, 2, 0);
	split = createSlider(0.01, PI, PI / 2, 0);
	leafSize = createSlider(1, 100, 21, 1);

	iterations.position(20, 0);
	initialBranchLength.position(20, 21);
	initialThickness.position(20, 42);
	split.position(20, 63);
	leafSize.position(20, 84);

	newTreeButton = createButton("New Tree");
	newTreeButton.position(200,20);
	newTreeButton.mouseClicked(NewTree);

	resetButton = createButton("Default");
	resetButton.position(200,50);
	resetButton.mouseClicked(DefaultParameters);

	NewTree();
}

// resets the sliders
function DefaultParameters(){
	iterations.value(6);
	initialBranchLength.value(20);
	initialThickness.value(2);
	split.value(PI / 2);
	leafSize.value(21);
}
// calls the viewr to update and manages moving around (in/out and pan)
function draw(){

	// update the viewer
	viewer.UpdateFrame();
	for(var i = 0; i < viewer.meshes.length;++i){

		viewer.meshes[i].rotation.y += 0.01;
	}
	//movement
	if(keyIsDown(79)){
		viewer.camera.position.z++;
	}
	if(keyIsDown(85)){
		viewer.camera.position.z--;
	}
	if(keyIsDown(74)){
		viewer.camera.position.x--;
	}
	if(keyIsDown(76)){
		viewer.camera.position.x++;
	}
	if(keyIsDown(73)){
		viewer.camera.position.y++;
	}
	if(keyIsDown(75)){
		viewer.camera.position.y--;
	}
}

// makes a new tree with the parameters set in the sliders
function NewTree(){
	viewer.ResetCamera();
	// make the tree
	var	tree = new TreeMaker(iterations.value(),initialBranchLength.value(), initialThickness.value(),split.value(), leafSize.value());
	viewer.NewScene();
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
