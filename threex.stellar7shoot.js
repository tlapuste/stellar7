var THREEx	= THREEx	|| {}

THREEx.Stellar7Shoot	= function(){
	// internal render function
	var onRenderFcts= []
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}

	// get the model
	var model	= new THREEx.Stellar7ShootModel()
	this.model	= model

	//////////////////////////////////////////////////////////////////////////////////
	//		physics								//
	//////////////////////////////////////////////////////////////////////////////////
	var velocity	= new THREE.Vector3()
	this.velocity	= velocity
	var tmpVector	= new THREE.Vector3()
	onRenderFcts.push(function(delta, now){
		tmpVector.copy(velocity).multiplyScalar(delta)
		model.object3d.position.add(tmpVector)
	})
}

/**
 * create a shoot as if it were originated by this tank
 */
THREEx.Stellar7Shoot.fromTank	= function(tankModel){
	var shoot	= new THREEx.Stellar7Shoot()
	shoot.model.object3d.position
		.copy(tankModel.object3d.position)
		.add(new THREE.Vector3(0,0.3, 0))

	var velocity	= new THREE.Vector3(0, 0, 20);
	var rotationY	= tankModel.baseMesh.rotation.y + tankModel.cannonMesh.rotation.y
	var matrix	= new THREE.Matrix4().makeRotationY(rotationY);
	velocity.applyMatrix4( matrix );
	shoot.velocity.copy(velocity)

	return shoot
}