let game;

function setup() {
  background(0);
  // allow WEBGL mode for the camera
  createCanvas(640, 480, WEBGL);
  game = new Game();
}

function draw() {
  game.show();
}
