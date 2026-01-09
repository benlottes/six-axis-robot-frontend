let axis1 = scene.getObjectByName("Axis1");
let axis2 = scene.getObjectByName("Axis2");
let axis3 = scene.getObjectByName("Axis3");
let axis4 = scene.getObjectByName("Axis4");
let axis5 = scene.getObjectByName("Axis5");
let axis6 = scene.getObjectByName("Axis6");

let rotator;

function manualModeStart(axis, direction) {
    switch(axis) {
        case 1:
            rotator = setInterval(function() {
                axis1.rotation.y += 0.01 * direction;
                }, 8);
            break;
        case 2:
            rotator = setInterval(function() {
                axis2.rotation.x += 0.01 * direction;
                }, 8);
            break;                  
        case 3:
            rotator = setInterval(function() {
                axis3.rotation.x += 0.01 * direction;
                }, 8);
            break;          
        case 4:
            rotator = setInterval(function() {
                axis4.rotation.y += 0.01 * direction;
                }, 8);
            break;             
        case 5:
            rotator = setInterval(function() {
                axis5.rotation.x += 0.01 * direction;
                }, 8);
            break;            
        case 6:  
            rotator = setInterval(function() {
                axis6.rotation.y += 0.01 * direction;
                }, 8);
            break;        
    }
}

function setRotationAngleInDegrees(axis) {
    let angle = 0;
    switch(axis) {
        case 1:
            angle = THREE.MathUtils.radToDeg(axis1.rotation.y);
            document.getElementById("axis1-angle").textContent = angle.toFixed(2);
            break;  
        case 2:
            angle = THREE.MathUtils.radToDeg(axis2.rotation.x);
            document.getElementById("axis2-angle").textContent = angle.toFixed(2);
            break;  
        case 3:
            angle = THREE.MathUtils.radToDeg(axis3.rotation.x);
            document.getElementById("axis3-angle").textContent = angle.toFixed(2);
            break;  
        case 4:
            angle = THREE.MathUtils.radToDeg(axis4.rotation.y);
            document.getElementById("axis4-angle").textContent = angle.toFixed(2);
            break;  
        case 5:
            angle = THREE.MathUtils.radToDeg(axis5.rotation.x);
            document.getElementById("axis5-angle").textContent = angle.toFixed(2);
            break;  
        case 6:
            angle = THREE.MathUtils.radToDeg(axis6.rotation.y);
            document.getElementById("axis6-angle").textContent = angle.toFixed(2);
            break;
    }
    return angle;
}

function manualModeEnd() {
    clearInterval(rotator)
    setRotationAngleInDegrees(1);
    setRotationAngleInDegrees(2);
    setRotationAngleInDegrees(3);
    setRotationAngleInDegrees(4);
    setRotationAngleInDegrees(5);
    setRotationAngleInDegrees(6);
}

function moveToPosition() {
    let xTarget = document.getElementById("x-target").value;
    let yTarget = document.getElementById("y-target").value;
    let zTarget = document.getElementById("z-target").value;
    let rollTarget = document.getElementById("roll-target").value;
    let pitchTarget = document.getElementById("pitch-target").value;
    let yawTarget = document.getElementById("yaw-target").value;


    let transformResult = computeKinematics(xTarget, yTarget, zTarget, rollTarget, pitchTarget, yawTarget);
}