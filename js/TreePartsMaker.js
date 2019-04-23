// this class will generate the points between the start and end point for the 3D Line to use
function LineCurve( start, end ) {

	THREE.Curve.call( this );
  this.start = start;
  this.end = end;
}

// need to extend the curve type
LineCurve.prototype = Object.create( THREE.Curve.prototype );
LineCurve.prototype.constructor = LineCurve;

// returns a point (100 * t)% between start and end
LineCurve.prototype.getPoint = function ( t ) {
  var vec = new THREE.Vector3( this.start.x, this.start.y, this.start.z );
  vec.lerp(this.end, t);
  return vec;
};

var woodMat = new THREE.MeshLambertMaterial( { color: new THREE.Color("rgb(110, 58, 36)")  } );
var leafMat = new THREE.MeshLambertMaterial( { color: new THREE.Color("rgb(58, 95, 11)")  } );

// This function makes a branch part
function MakeBranch(start, end, radius){

  var path = new LineCurve(start, end);
	var sides;
	if(radius > 0.5) sides = 8;
	else if(radius > 0.2) sides = 5;
	else sides = 3;
  var geometry = new THREE.TubeGeometry( path, 1, radius, sides, false );
  return new THREE.Mesh( geometry, woodMat );
}

// this funciton makes a leaf part
function MakeLeaf(pos, size){

	//var geometry = new THREE.BoxGeometry( size, size, size);
	var geometry = new THREE.IcosahedronGeometry(size);


	var mesh = new THREE.Mesh(geometry, leafMat);
	mesh.position.x = pos.x;
	mesh.position.y = pos.y;
	mesh.position.z = pos.z;
	return mesh;
}
