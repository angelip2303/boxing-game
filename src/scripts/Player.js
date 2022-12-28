/**
 * Abstract Class Player.
 *
 * @class Player
 */
import HealthBar from "./HealthBar";
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
    this.healthBar = new HealthBar(x, y, width);
  }

  draw() {
    this.#drawCamera(); // draw the camera :D
    this.#drawBodyParts(); // draw the detected body parts
    this.healthBar.draw(this.health); // draw the User Interface
  }

  setHealth(arg){
    this.health = arg;
  }

  getHealth(){
    return this.health;
  }

  updatePose(poses) {
    if (poses[0] != undefined) {
      // we retrieve the first pose from the results
      this.pose = new Pose(poses[0].pose);
    }
  }

  receiveDamage(damage) {
    if (this.health - damage < 0) {
      this.health = 0; // we set the minimum possible value :D
      return;
    }
    this.health -= damage; // we subtract the damage received
  }

  #drawCamera() {
    if (this.media == undefined) return;
    // In case the video is defined: draw the element into the canvas
    p5.image(this.media, this.x, this.y, this.width, this.height);
  }

  #drawBodyParts() {
    if (this.pose == undefined) return;
    // In case any pose has been detected: draw it!
    let body = this.pose.body;
    let wrists = this.pose.wrists;
    for (let key in body) {
      let bodyPart = body[key];
      if (bodyPart != undefined)
        this.#drawPoint(bodyPart.x, bodyPart.y, "#FFFFFF");
    }
    for (let key in wrists) {
      let bodyPart = wrists[key];
      if (bodyPart != undefined)
        this.#drawPoint(bodyPart.x, bodyPart.y, "#FF0000");
    }
  }

  #drawPoint(x, y, color) {
    p5.fill(color);
    p5.noStroke();
    p5.ellipse(this.x + x, this.y + y, 10, 10);
  }
}
