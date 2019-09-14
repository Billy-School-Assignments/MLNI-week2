import 'p5';
import generateParticle, { Particle } from './particle';

const particleList: Particle[] = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(0);
  for (let i = particleList.length - 1; i >= 0; i -= 1) {
    const particle = particleList[i];
    if (particle.shouldDestroy) {
      particleList.splice(i, 0);
    }
  }
  if (mouseIsPressed) {
    particleList.push(generateParticle(mouseX, mouseY));
  }
  for (const particle of particleList) {
    particle.update();
    particle.draw();
  }
}

// p5.js requires `setup` and `draw` to be methods of global object
window.setup = setup;
window.draw = draw;
