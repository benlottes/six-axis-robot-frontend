function moveToPosition(xTarget, yTarget, zTarget, rollTarget, pitchTarget, yawTarget) {
getCurrentPosition()
}

// DOES NOT WORK
function getCurrentPosition() {
    // Using three.js positions, find the position of the end effector
    let axis6pos = new THREE.Vector3();
    axis6.getWorldPosition(axis6pos);

    let axis1pos = new THREE.Vector3();
    axis1.getWorldPosition(axis1pos);

    positionX = axis6pos.x*10;
    positionY = axis6pos.z*10;
    positionZ = (axis6pos.y + 3)*10;
    document.getElementById("x-current").textContent = positionX.toFixed(2);
    document.getElementById("y-current").textContent = positionY.toFixed(2);
    document.getElementById("z-current").textContent = positionZ.toFixed(2);
}