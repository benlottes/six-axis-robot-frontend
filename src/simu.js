// sizes
const width = window.innerWidth / 2;
const height = window.innerHeight / 2;

// camera
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100000);
camera.position.set(25, 25, 25);
camera.lookAt(0,10,0);

// zoom limits
let cameraDistance = camera.position.length();
const minDistance = 20;
const maxDistance = 50;

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0);

// pivot group
const viewingAnglePivot = new THREE.Group();
scene.add(viewingAnglePivot);

// Load the scene from JSON in dramaticLights.js
const loader = new THREE.ObjectLoader();
const loadedScene = loader.parse(json_data.scene);
viewingAnglePivot.add(loadedScene);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(width, height);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.toneMappingExposure = 1;
renderer.physicallyCorrectLights = true;

scene.environmentIntensity = 0.4;
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

let axis = [scene.getObjectByName("Axis1"),
            scene.getObjectByName("Axis2"),
            scene.getObjectByName("Axis3"),
            scene.getObjectByName("Axis4"),
            scene.getObjectByName("Axis5"),
            scene.getObjectByName("Axis6")];
let rotation_axis = ["y","x","x","y","x","y"];
let axis_target_angles = [0, 0, 0, 0, 0, 0];

let current_permutations = {};

// animation loop
function animate() {

    if(axis[0].rotation.y != axis_target_angles[0]){
        axis[0].rotation.y += axis_target_angles[0] * 0.01;
    }

    axis[1].rotation[rotation_axis[1]] = axis_target_angles[1];
    axis[2].rotation[rotation_axis[2]] = axis_target_angles[2];
    
    renderer.render(scene, camera);
}
