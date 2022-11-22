export default class Pose {
  constructor(pose) {
    // Parts of the body of the player that can cause damage
    this.wrists = {
      left: this.#checkConfidence(pose.leftWrist),
      right: this.#checkConfidence(pose.rightWrist),
    };
    // Parts of the body of the player that can be damaged
    this.body = {
      nose: this.#checkConfidence(pose.nose),
      leftEye: this.#checkConfidence(pose.leftEye),
      rightEye: this.#checkConfidence(pose.rightEye),
    };
  }

  #checkConfidence(bodyPart) {
    return bodyPart.confidence > 0.2
      ? { x: bodyPart.x, y: bodyPart.y }
      : undefined;
  }
}
