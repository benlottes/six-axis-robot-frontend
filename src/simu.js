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
const loader = new THREE.ObjectLoader();
const scene = loader.parse(robot_model.scene);
scene.background = new THREE.Color(0);

const cameraPivot = new THREE.Object3D();
scene.add(cameraPivot);
cameraPivot.add(camera);

// Create Orothographic camera
const ortho_camera = new THREE.OrthographicCamera( width / - 16, width / 16, height / 16 , height / - 16, 0.1, 1000 );
scene.add(ortho_camera);

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

let current_camera = camera;

function switch_view(side){
    switch(side){
        case "top":
            ortho_camera.position.x = 0;
            ortho_camera.position.y = 30;
            ortho_camera.position.z = 0;
            ortho_camera.rotation.x = -Math.PI/2;
            ortho_camera.rotation.y = 0;
            ortho_camera.rotation.z = Math.PI;
            current_camera = ortho_camera;
            break;
        case "front":
            ortho_camera.position.x = 0;
            ortho_camera.position.y = 5;
            ortho_camera.position.z = 15;
            ortho_camera.rotation.x = 0;
            ortho_camera.rotation.y = 0;
            ortho_camera.rotation.z = 0;
            current_camera = ortho_camera;
            break;
        case "right": // from the front, so around the vertical axis to the right while looking at the front
            ortho_camera.position.x = 15;
            ortho_camera.position.y = 5;
            ortho_camera.position.z = 0;
            ortho_camera.rotation.x = 0;
            ortho_camera.rotation.y = Math.PI/2;
            ortho_camera.rotation.z = 0;
            current_camera = ortho_camera;
            break;
        case "left": // from the front, so around the vertical axis to the left while looking at the front
            ortho_camera.position.x = -15;
            ortho_camera.position.y = 5;
            ortho_camera.position.z = 0;
            ortho_camera.rotation.x = 0;
            ortho_camera.rotation.y = -Math.PI/2;
            ortho_camera.rotation.z = 0;
            current_camera = ortho_camera;
            break;
        case "back":
            ortho_camera.position.x = 0;
            ortho_camera.position.y = 5;
            ortho_camera.position.z = -15;
            ortho_camera.rotation.x = 0;
            ortho_camera.rotation.y = Math.PI;
            ortho_camera.rotation.z = 0;
            current_camera = ortho_camera;
            break;
        case "perspective":
            current_camera = camera;
            break;
    }
}

// animation loop
function animate() {
    renderer.render(scene, current_camera);
}
