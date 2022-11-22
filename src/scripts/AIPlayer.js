/**
 * AIPlayer.
 *
 * @class AIPlayer
 * @extends {Player}
 */
import Player from "./Player";
import AI from "../assets/boxer.jpg";

export default class AIPlayer extends Player {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.media = p5.loadImage(AI); // we capture the webcam
    this.modelReady();
  }
}
