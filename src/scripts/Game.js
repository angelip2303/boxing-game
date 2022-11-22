import AIPlayer from "./AIPlayer";
import HumanPlayer from "./HumanPlayer";

export default class Game {
  constructor() {
    // We create two player for us to start the combat
    this.player1 = new HumanPlayer(
      p5.VIDEO,
      0,
      0,
      p5.windowWidth / 2,
      p5.windowHeight
    ); // leftPlayer
    this.player2 = new AIPlayer(
      p5.windowWidth / 2,
      0,
      p5.windowWidth / 2,
      p5.windowHeight
    ); // rightPlayer
  }

  show() {
    this.player1.draw(); // we draw the local player
    this.player2.draw(); // we draw the enemy player
  }

  fight() {
    if (this.player1.pose == undefined) return;
    if (this.player2.pose == undefined) return;
    // In case some pose has been detected: check :D
    this.#isPunch(this.player1, this.player2);
    this.#isPunch(this.player2, this.player1);
  }

  #isPunch(wristPlayer, damagePlayer) {
    let wrists = wristPlayer.pose.wrists;
    let damage = damagePlayer.pose.damage;
    // For each body part of the player that receives damage, we have to check
    // if any impact has been received. If true, we apply some damage to the
    // player that has received a punch
    for (let key in damage)
      if (this.#isImpact(wrists, damage[key])) damagePlayer.takeDamage(10);
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
    return wrist.x === bodyPart.x && wrist.x === bodyPart.y;
  }
}
