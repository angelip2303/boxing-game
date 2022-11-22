export default class UI {
  constructor(x, y, width, health) {
    // for each element we provide a gap
    //   1. horizontal-gap: 10
    //   2. vertical-gap: 10
    //   3. width-gap: 2*horizontal-gap = 20
    this.x = x + 10; // x-position of the bar
    this.y = y + 10; // y-position of the bar
    this.width = width - 20; // width of the bar :D
    this.height = 20; // height of the health bar
    this.health = health; // health value
  }

  draw() {
    // Outer border
    p5.stroke(0);
    p5.strokeWeight(4);
    p5.noFill();
    p5.rect(this.x, this.y, this.width, this.height);
    // Inner health bar
    p5.noStroke();
    p5.fill(255, 0, 0); // fill RED
    p5.rect(
      this.x,
      this.y,
      p5.map(this.health, 0, 100, 0, this.width),
      this.height
    );
  }
}
