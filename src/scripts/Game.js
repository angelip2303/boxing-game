class Game {
  constructor() {
    this.player = new Player();
  }

  show() {
    this.player.draw();
  }
}
