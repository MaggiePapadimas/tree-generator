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

// This function makes a line between start and end
function MakeLine3D(start, end, radius){

  var path = new LineCurve(start, end);
	var sides;
	if(radius > 0.5) sides = 8;
	else if(radius > 0.2) sides = 5;
	else sides = 3;
  var geometry = new THREE.TubeGeometry( path, 1, radius, sides, false );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  return new THREE.Mesh( geometry, material );
}
