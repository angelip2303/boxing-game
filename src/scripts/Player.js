/**
 * Abstract Class Player.
 *
 * @class Player
 */
import UI from "./UI";
import Pose from "./Pose";

export default class Player {
  constructor(x, y, width, height) {
    // We set the attributes of this class for later use
    // ======================================
    this.x = x; // x-position of the camera
    this.y = y; // y-position of the camera
    this.width = width; // width of the camera
    this.height = height; // height of the camera
    this.health = 100; // health of the user; starts at 100%
    this.ui = new UI(x, y, width, this.health);
    this.video = undefined;
    // We start the ml5 poseNet
    // ======================================
    this.poseNet = ml5.poseNet(this.video, { detectionType: "single" }); // poses of the player
    //Every time new poses are detected ==> update the pose
    this.poseNet.on("pose", (results) => this.#updatePose(results));
  }

  draw() {
    this.#drawCamera(); // draw the camera :D
    this.ui.draw(); // draw the User Interface
  }

  takeDamage(dmg) {
    this.health -= dmg;
  }

  #drawCamera() {
    if (this.video == undefined) return;
    // In case the video is defined: draw the element into the canvas
    p5.image(this.video, this.x, this.y, this.width, this.height);
  }

  #updatePose(results) {
    if (results != undefined) this.pose = new Pose(results[0].pose);
  }
}
