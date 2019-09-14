function generateSpeed(): number {
  const baseSpeed = random(1, 3);
  return Math.random() > 0.5 ? baseSpeed : baseSpeed * -1;
}

function generateWidth(): number {
  return random(10, 20);
}

function generateColor(): [number, number, number] {
  return [random(0, 255), random(0, 255), random(0, 255)];
}

export abstract class Particle {
  /** X position */
  protected posX: number;

  /** Y position */
  protected posY: number;

  /** X velocity */
  protected speedX: number;

  /** Y velocity */
  protected speedY: number;

  /** color of the particle */
  protected color: [number, number, number];

  /** width of the particle */
  protected width: number;

  constructor(originX: number, originY: number) {
    this.posX = originX;
    this.posY = originY;
    this.speedX = generateSpeed();
    this.speedY = generateSpeed();
    console.log(this.speedX);
    console.log(this.speedY);
    this.color = generateColor();
    this.width = generateWidth();
  }

  /** whether the particle is out of the canvas */
  get shouldDestroy(): boolean {
    return this.posX < 0 || this.posX > width || this.posY < 0 || this.posY > height;
  }

  /** update the position on every frame */
  update() {
    this.posX += this.speedX;
    this.posY += this.speedY;
  }

  /** draw the particle on the canvas */
  abstract draw(): void;
}

class Square extends Particle {
  private createdFrame = frameCount;

  private getRotateRadians() {
    return radians(frameCount - this.createdFrame) * 2;
  }

  draw() {
    const rotateRadians = this.getRotateRadians();
    translate(this.posX, this.posY);
    rotate(rotateRadians);
    fill(...this.color);
    rect(0, 0, this.width, this.width);
    rotate(-rotateRadians);
    translate(-this.posX, -this.posY);
  }
}

class Circle extends Particle {
  draw() {
    translate(this.posX, this.posY);
    fill(...this.color);
    ellipse(0, 0, this.width, this.width);
    translate(-this.posX, -this.posY);
  }
}

export default function generateParticle(originX: number, originY: number): Particle {
  console.log('new');
  if (Math.random() > 0.5) {
    return new Circle(originX, originY);
  }
  return new Square(originX, originY);
}
