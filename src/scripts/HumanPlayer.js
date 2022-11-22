/**
 * HumanPlayer.
 *
 * @class HumanPlayer
 * @extends {Player}
 */
import Player from "./Player";

export default class HumanPlayer extends Player {
  constructor(video, x, y, width, height) {
    super(x, y, width, height);
    this.media = p5.createCapture(video); // we capture the webcam
    this.media.size(width, height); // we fit the video to the width and height
    this.media.hide(); // hide the video element, only show the canvas
    // We load the model from the camera source :D
    this.poseNet = ml5.poseNet(this.media);
    this.poseNet.on("pose", (poses) => {
      this.updatePose(poses);
    });
  }
}
