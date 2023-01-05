import AIPlayer from "./AIPlayer";
import HumanPlayer from "./HumanPlayer";

export default class Game {
  // TODO: create the play loop and check game over
  constructor(state) {
    // TODO: create a MENU where the user can select how to play
    //We create two player for us to start the combat
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

    if(state !== undefined){
      if(state.health1 !== undefined){
        this.player1.setHealth(state.health1);
      }
      if(state.health2 !== undefined){
        this.player2.setHealth(state.health2);
      }
    }
  }

  getState(){
    return {
      health1: this.player1.getHealth(),
      health2: this.player2.getHealth()
    }
  }

  show() {
    this.player1.draw(); // we draw the local player
    this.player2.draw(); // we draw the enemy player
  }

  fight() {
    if (this.player1 == undefined || this.player1.pose == undefined) return;
    if (this.player2 == undefined || this.player2.pose == undefined) return;
    // In case some pose has been detected: check :D
    this.#isPunch(this.player1, this.player2);
    // this.#isPunch(this.player2, this.player1); TODO: make AI not to fight
  }

  #isPunch(wristPlayer, bodyPlayer) {
    // TODO: time between impacts should be delayed
    let wrists = wristPlayer.pose.wrists; // TODO: use the ml5 library for detecting hands
    let body = bodyPlayer.pose.body;
    // For each body part of the player that receives damage, we have to check
    // if any impact has been received. If true, we apply some damage to the
    // player that has received a punch
    
    for (let key in body){
      if (this.#isImpact(wrists, body[key]) ) {
        bodyPlayer.receiveDamage(10); 
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
    return Math.sqrt((wrist.x - body.x)**2 + (wrist.y - body.y)**2) < radius 
    
  }
}
