new p5();


// this will generate the tree right away
function TreeMaker(iterations, length, thickness, branches, split, leafSize){
	console.log(branches);
	this.branches = branches;
	this.split = split;
	this.rotation = PI / 8;
	this.leafSize = leafSize / iterations;
	this.leafLength = 1;
	this.root = new THREE.Object3D();
	this.Branch(iterations, length, thickness, new THREE.Vector3(0,1,0), new THREE.Vector3(0,-1,0));
}

// this recursive function is what generates the tree
TreeMaker.prototype.Branch = function(ite, len, thickness, dir, start){

// if branch is too small to really see then there is no point making it so make a leaf instead
	if(size < 0.01) {
//		this.leaves.push(MakeLeaf(start,this.leafSize));
		this.root.add(MakeLeaf(start,this.leafSize));
		return;
}
	// the end point of the branch will become the start point of the
	// next set of branches
	var end = new THREE.Vector3(start.x, start.y, start.z);
	end.addScaledVector (dir, len);

	this.root.add(MakeBranch(start, end, thickness));

// if there are still iterations to do
	if(ite > 0){
		len =  len * random(0.67,0.9);
		if(len > this.leafLength)
		{
			ite--;

			var perp = new THREE.Vector3(random(-1,1),random(-1,1),random(-1,1));
			while(perp === dir){
				perp.x = random(-1,1);
				perp.y = random(-1,1);
				perp.z = random(-1,1);
			}

			perp.cross(dir);

			var v0 = new THREE.Vector3(dir.x, dir.y, dir.z);
			var v1 = new THREE.Vector3(dir.x, dir.y, dir.z);

			v0.applyAxisAngle(perp,  random(0, this.split));
			v1.applyAxisAngle(perp,  random(-this.split, 0));

			var r = random(0, this.rotation);
			v0.applyAxisAngle(dir,  r);
			v1.applyAxisAngle(dir,  r);
			if(this.split <= PI / 2 + 0.01){
					v0.y = abs(v0.y);
					v1.y = abs(v1.y);
			}

			v0.normalize();
			v1.normalize();

			this.Branch(ite, len, thickness * 0.67, v0, end );
			if( this.branches > 1 ) this.Branch(ite, len, thickness * 0.67, v1, end );
			if( this.branches > 2 ) this.Branch(ite, len, thickness * 0.8, dir, end );
		}
	}
	else{
		this.root.add(MakeLeaf(end,this.leafSize));
	}
}
