class Player {
  constructor() {
    this.video = createCapture(VIDEO);
    this.poseNet = ml5.poseNet(this.video); // poses of the player
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    this.poseNet.on("pose", (results) => (this.poses = results));
    this.video.hide(); // hide the video element, only show the canvas
  }

  draw() {
    image(this.video, 0, 0, width, height); // show the image :D
    this.#drawKeypoints(); // show the keypoints :D
    this.#drawSkeleton(); // draw the skeleton :D
  }

  // A function to draw ellipses over the detected keypoints
  #drawKeypoints() {
    if (this.poses == undefined) return;
    // Loop through all the poses detected
    this.poses.forEach((pose) => {
      // Loop through all the keypoints of the given pose
      if (pose.keypoints != undefined)
        // in case some keyponts have been detected
        pose.keypoints.forEach((keypoint) => {
          // Draw an ellipse if the pose probability is higher than 0.2
          if (keypoint.score > 0.2) {
            fill(255, 0, 0);
            noStroke();
            ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
          }
        });
    });
  }

  // A function to draw the skeletons
  #drawSkeleton() {
    if (this.poses == undefined) return;
    // Loop through all the skeletons detected
    this.poses.forEach((pose) => {
      // Loop through all the skeleton of the given pose
      if (pose.skeleton != undefined)
        // in case an skeleton has been detected
        pose.skeleton.forEach((skeleton) => {
          let partA = skeleton[0];
          let partB = skeleton[1];
          stroke(255, 0, 0);
          line(
            partA.position.x,
            partA.position.y,
            partB.position.x,
            partB.position.y
          );
        });
    });
  }
}
