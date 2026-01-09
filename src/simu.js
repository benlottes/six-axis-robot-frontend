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

// animation loop
function animate() {
    renderer.render(scene, camera);
}
