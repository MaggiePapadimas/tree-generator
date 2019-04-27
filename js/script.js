// sliders and buttons
var iterations;
var initialBranchLength;
var initialThickness;
var rotation;
var split;
var leafSize;
var branches;

var newTreeButton;
var resetButton;


function setup(){
	// set up viewer
	createCanvas(900,100);
	viewer = new Viewer3D();

	// create sliders
	iterations = createSlider(1, 8, 2, 1);
	initialBranchLength = createSlider(2, 100, 20, 0);
	initialThickness = createSlider(0.1, 5, 2, 0);
	split = createSlider(0.01, PI, PI / 2, 0);
	leafSize = createSlider(1, 100, 21, 1);
	branches = createSlider(1, 3, 3, 1);

	iterations.position(100, 0);
	initialBranchLength.position(100, 21);
	initialThickness.position(100, 42);
	split.position(100, 63);
	leafSize.position(100, 84);
	branches.position(400, 84);

	newTreeButton = createButton("New Tree");
	newTreeButton.position(400,20);
	newTreeButton.mouseClicked(NewTree);

	resetButton = createButton("Default");
	resetButton.position(400,50);
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
	branches.value(3);
}
// calls the viewr to update and manages moving around (in/out and pan)
function draw(){

	// update the viewer
	viewer.UpdateFrame();
	text("Iterations", 10,15);
	text("branch Length", 10,35);
	text("Thickness", 10,55);
	text("Split Angle", 10,75);
	text("Leaf Size", 10,95);
	text("Branches Per Split", 275,95);

	text("Controls:", 600,35);
	text("UP / DOWN:		  I / K", 700,35);
	text("LEFT / RIGHT:	J / L", 700,55);
	text("IN / OUT:	         U / O", 700,75);

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
	var	tree = new TreeMaker(iterations.value(),initialBranchLength.value(), initialThickness.value(), branches.value(), split.value(), leafSize.value());
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
