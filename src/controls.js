let rotator;

function manualModeStart(i, direction) {
    rotator = setInterval(function() {
        axis[i].rotation[rotation_axis[i]] += 0.01 * direction;
        }, 8);
}

function setRotationAngleInDegrees(i) {
    let angle = THREE.MathUtils.radToDeg(axis[i].rotation[rotation_axis[i]]);
    document.getElementById("axis" + (i+1) + "-angle").textContent = angle.toFixed(2);
}

function updateDegreesDisplay() {
    setRotationAngleInDegrees(0);
    setRotationAngleInDegrees(1);
    setRotationAngleInDegrees(2);
    setRotationAngleInDegrees(3);
    setRotationAngleInDegrees(4);
    setRotationAngleInDegrees(5);
}

function manualModeEnd() {
    clearInterval(rotator)
}

function updatePresetList() {
    const select = document.getElementById("permutations-list");
    select.innerHTML = '<option value="">-- Select Preset --</option>';
    Object.keys(current_permutations).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
}