import AIPlayer from "./AIPlayer";
import HumanPlayer from "./HumanPlayer";

export default class Game {
  constructor(state) {
    this.player1 = new HumanPlayer(
      p5.VIDEO,
      0,
      0,
      p5.windowWidth / 2,
      p5.windowHeight,
      state === undefined ? 100 : state.healthPlayer1
    ); // leftPlayer

    this.player2 = new AIPlayer(
      p5.windowWidth / 2,
      0,
      p5.windowWidth / 2,
      p5.windowHeight,
      state === undefined ? 100 : state.healthPlayer2
    ); // rightPlayer
  }

  getState() {
    return {
      healthPlayer1: this.player1.health,
      healthPlayer2: this.player2.health,
    };
  }

  isGameOver() {
    return this.player1.health === 0 || this.player2.health === 0;
  }

  loop() {
    if (!this.isGameOver()) {
      this.#show();
      this.#fight();
    }
    // show that the game is over
    else this.#showGameOver();
  }

  #show() {
    this.player1.draw(); // we draw the local player
    this.player2.draw(); // we draw the enemy player
  }

  #showGameOver() {
    p5.fill("rgba(0,0,0, 0.5)");
    p5.rect(0, 0, p5.windowWidth, p5.windowHeight);
    p5.textSize(50);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.fill(255, 255, 255);
    p5.text(
      `Game Over... ${this.player1.health === 0 ? "Computer" : "You"} won!`,
      p5.windowWidth / 2,
      p5.windowHeight / 2
    );
  }

  #fight() {
    if (this.player1 == undefined || this.player1.pose == undefined) return;
    if (this.player2 == undefined || this.player2.pose == undefined) return;
    // In case some pose has been detected: check :D
    this.#isPunch(this.player1, this.player2);
    this.#isPunch(this.player2, this.player1);
  }

  #isPunch(wristPlayer, bodyPlayer) {
    let wrists = wristPlayer.pose.wrists;
    let body = bodyPlayer.pose.body;
    // For each body part of the player that receives damage, we have to check
    // if any impact has been received. If true, we apply some damage to the
    // player that has received a punch

    for (let key in body) {
      if (this.#isImpact(wrists, body[key])) {
        bodyPlayer.takeDamage(10);
      }
    }
  }

  #isImpact(wrists, bodyPart) {
    return (
      this.#isImpactOneWrist(wrists.left, bodyPart) ||
      this.#isImpactOneWrist(wrists.right, bodyPart)
    );
  }

  #isImpactOneWrist(wrist, bodyPart) {
    if (wrist == undefined) return false;
    if (bodyPart == undefined) return false;
    // In case a wrist has been detected || a body part ==> check if is impact
    // we consider that it has been impacted given a certain threshold
    return this.#isImpactWithPrecision(wrist, bodyPart, 200);
  }

  #isImpactWithPrecision(wrist, body, radius) {
    return (
      Math.sqrt((wrist.x - body.x) ** 2 + (wrist.y - body.y) ** 2) < radius
    );
  }
}
