


// --------------------
// Drag rotation — horizontal rotates, vertical moves camera up/down (inverted)
// --------------------
let isDragging = false;
let prevMouse = { x: 0, y: 0 };

renderer.domElement.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevMouse.x = e.clientX;
  prevMouse.y = e.clientY;
});
window.addEventListener('mouseup', () => {
  isDragging = false;
});
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - prevMouse.x;
  const deltaY = e.clientY - prevMouse.y;

  const rotationSpeed = 0.005;
  const verticalSpeed = 0.05;
  const minHeight = 1;   // camera will not go below this (floor)
  const maxHeight = 80;

  // rotate scene around world Y (no tilt)
  viewingAnglePivot.rotation.y += deltaX * rotationSpeed;

  // inverted vertical: dragging up (negative deltaY) moves camera down
  camera.position.y += deltaY * verticalSpeed;
  camera.position.y = Math.max(minHeight, Math.min(maxHeight, camera.position.y));

  // keep zoom-distance in sync (approx)
  cameraDistance = camera.position.length();

  camera.lookAt(0, 10, 0);

  prevMouse.x = e.clientX;
  prevMouse.y = e.clientY;
});

// --------------------
// Scroll zoom
// --------------------
renderer.domElement.addEventListener('wheel', (e) => {
  e.preventDefault();

  const zoomSpeed = 0.001;
  cameraDistance += e.deltaY * zoomSpeed;

  cameraDistance = Math.max(minDistance, Math.min(maxDistance, cameraDistance));

  // move camera along its forward direction
  const direction = camera.position.clone().normalize();
  camera.position.copy(direction.multiplyScalar(cameraDistance));
  camera.lookAt(0, 10, 0);
}, { passive: false });
