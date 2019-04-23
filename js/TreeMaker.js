new p5();

var perp = new THREE.Vector3(0,0,1);

// this will generate the tree right away
function TreeMaker(iterations, length){
	this.leafLength = 1;
	this.branches = [];
	this.Branch(length, new THREE.Vector3(0,1,0), 3.141592/2, new THREE.Vector3(0,-1,0), 2, iterations);

}

// this recursive function is what generates the tree
TreeMaker.prototype.Branch = function(len, dir, rotation, start, size, num){

// if branch is too small to really see then there is no point making it
	if(size < 0.01) return;

	// the end point of the branch will become the start point of the
	// next set of branches
	var end = new THREE.Vector3(start.x, start.y, start.z);
	end.addScaledVector (dir, len);
	var index = this.branches.length;
	this.branches.push(MakeLine3D(start, end, size));

// if there are still iterations to do
	if(num > 0){
		len =  len * random(0.67,0.9);
		if(len > this.leafLength)
		{
			num--;
			var v0 = new THREE.Vector3(dir.x, dir.y, dir.z);
			var v1 = new THREE.Vector3(dir.x, dir.y, dir.z);

			v0.applyAxisAngle(perp,  random(-rotation, rotation));
			v1.applyAxisAngle(perp,  random(-rotation, rotation));

			var r = random(0, PI / 8);
			v0.applyAxisAngle(dir,  r);
			v1.applyAxisAngle(dir,  r);

			v0.normalize();
			v1.normalize();

			this.Branch(len, v0, rotation, end, size * 0.67, num);
			this.Branch(len, v1, rotation, end, size * 0.67, num);

			this.Branch(len, dir, rotation, end, size * 0.8 , num);
		}
	}
}
