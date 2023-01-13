/**
 * AIPlayer.
 *
 * @class AIPlayer
 * @extends {Player}
 */
import Player from "./Player";
import AI from "../assets/boxer.jpg";

export default class AIPlayer extends Player {
  constructor(x, y, width, height, health) {
    super(x, y, width, height, health);
    this.media = p5.loadImage(AI, (img) => {
      // we wait for the image to be loaded so it can be processed
      img.resize(width, height); // resize the image to the width and height
      this.poseNet = ml5.poseNet(() => {
        this.poseNet.on("pose", (poses) => this.updatePose(poses));
        this.poseNet.singlePose(img);
      });
    });
  }
}
