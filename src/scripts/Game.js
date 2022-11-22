import Player from "./Player";

export default class Game {
  constructor() {
    // We create two player for us to start the combat
    this.player1 = new Player(
      p5.VIDEO,
      0,
      0,
      p5.windowWidth / 2,
      p5.windowHeight
    ); // local player
    this.player2 = new Player(
      p5.VIDEO,
      p5.windowWidth / 2,
      0,
      p5.windowWidth / 2,
      p5.windowHeight
    ); // enemy player
  }

  show() {
    this.player1.draw(); // we draw the local player
    this.player2.draw(); // we draw the enemy player
  }
}
