/**
 * Application entry point
 */
import "../styles/style.css";
import Game from "./Game";
import p5 from "p5";
import ml5 from "ml5";

const sketch = (p5) => {
  let game;

  // make library globally available
  window.p5 = p5;
  window.ml5 = ml5;

  // Setup function
  // ======================================
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    game = new Game();
  };

  // Draw function
  // ======================================
  p5.draw = () => {
    game.show();
  };

  // Draw function
  // ======================================
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

new p5(sketch);

export default sketch;
