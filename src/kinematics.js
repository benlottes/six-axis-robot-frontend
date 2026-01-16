function computeKinematics() {
    x_target = document.getElementById("x-target").value;
    y_target = document.getElementById("y-target").value;
    z_target = document.getElementById("z-target").value;

    yaw_target = document.getElementById("yaw-target").value;
    pitch_target = document.getElementById("pitch-target").value;
    roll_target = document. getElementById("roll-target").value ;
    
    let arm1_length = 8;
    let arm2_length = 8;
    let base_length = 4; // this is from origin to midpoint of second arm

    // Axes 2 and 3
    // Distance from the origin to the target in the YZ plane
    let distance_YZ = Math.sqrt( y_target**2 + z_target**2 );
    
    // Using the law of cosines to compute angle between arm 1 and arm 2
    let theta_arm1_arm2 = Math.acos(
                        (distance_YZ**2 - (arm1_length**2 + arm2_length**2))
                                    /
                        (-2*arm1_length*arm2_length)
                    );

    // Using the law of cosines to compute angle between arm 1 and the origin
    let theta_arm1_base = Math.acos(
                        ((arm1_length**2 - (distance_YZ**2 + arm2_length**2)))
                                    /
                        (-2*arm1_length*distance_YZ)
                    );

    // Angle from horizontal to the target point to compute additional offset for axis 2
    let y_axis_additional_angle = Math.asin(z_target/distance_YZ);
    
    // Axis 1 - add rotation at base
    // Distance from origin to target in the XY plane
    let distance_XY = Math.sqrt( x_target**2 + y_target**2 );

    // Angle between arm and target in XY plane such that a right angle is formed between the arm and a tangent that goes through the target
    let theta_base_target = Math.acos(base_length/distance_XY);

    // Angle between axis x and target position
    let theta_x_target = Math.acos(x_target/distance_XY);

    current_permutations = {};
    // permutation sign NEGATIVE
    let axis1_target_neg_perm = Math.sign(x_target)*Math.sign(y_target)*theta_x_target + theta_base_target; 
    
    if(x_target < 0)
        axis1_target_neg_perm = 2*Math.PI + axis1_target_neg_perm;

    current_permutations[1] = {
        "axis1_target" : axis1_target_neg_perm, 
        "axis2_target" : - ((Math.PI/2) - y_axis_additional_angle - theta_arm1_base),
        "axis3_target" : - (Math.PI - theta_arm1_arm2),
    };
    current_permutations[2] = {
        "axis1_target" :  axis1_target_neg_perm,
        "axis2_target" :  - ((Math.PI/2) - y_axis_additional_angle + theta_arm1_base),
        "axis3_target" :  - (-(Math.PI - theta_arm1_arm2))
    };

    // permutation sign POSITIVE
    let axis1_target_pos_perm = Math.sign(x_target)*Math.sign(y_target)*theta_x_target - theta_base_target; 
    if(x_target < 0)
        axis1_target_pos_perm = 2*Math.PI + axis1_target_pos_perm;

    current_permutations[3] = {
        "axis1_target" : axis1_target_pos_perm, 
        "axis2_target" : (Math.PI/2) - y_axis_additional_angle - theta_arm1_base,
        "axis3_target" : Math.PI - theta_arm1_arm2,
    };
    current_permutations[4] = {
        "axis1_target" :  axis1_target_pos_perm,
        "axis2_target" :  (Math.PI/2) - y_axis_additional_angle + theta_arm1_base,
        "axis3_target" :  -(Math.PI - theta_arm1_arm2)
    };
    updatePresetList();
    showPermutation(1);
}

function showPermutation(permutation_index){
    let permutation = current_permutations[permutation_index];
    axis_target_angles[0] = permutation["axis1_target"];
    axis_target_angles[1] = permutation["axis2_target"];
    axis_target_angles[2] = permutation["axis3_target"];

    console.log("Axis 1: " + axis_target_angles[0]);
    console.log("Axis 2: " + axis_target_angles[1]);
    console.log("Axis 3: " + axis_target_angles[2]);

    let target_threejs_world_position = new THREE.Vector3(); 
    let tcp = scene.getObjectByName("Axis4_Rotation2");
    tcp.getWorldPosition(target_threejs_world_position);
    console.log(target_threejs_world_position)
}