import Player from "./Player";

export default class Game {
  constructor() {
    this.player = new Player();
  }

  show() {
    this.player.draw();
  }
}
