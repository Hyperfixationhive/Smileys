let frogs = [];
let direction = 1; // 1 for right, -1 for left

function setup() {
  createCanvas(1000, 1000);
  frogs.push(new Frog(200, 500, 200, 30, 95, 95, 30, 10));
  frogs.push(new Frog(500, 500, 150, 20, 50, 95, 15, 10));
}

function draw() {
  background(230);

  for (let frog of frogs) {
    frog.move();
    frog.display();
  }

  // distance between the mouse and all frogs
  for (let frog of frogs) {
    let distanceToMouse = dist(mouseX, mouseY, frog.x, frog.y);

    // Shake the frog
    if (distanceToMouse < 100) {
      frog.shake();
    }
  }
}

class Frog {
  constructor(x, y, bodySize, eyeSize, eyeDistance, eyeOffsetY, nostrilSize, nostrilOffsetY) {
    this.x = x;
    this.y = y;
    this.bodySize = bodySize;
    this.eyeSize = eyeSize;
    this.eyeDistance = eyeDistance;
    this.eyeOffsetY = eyeOffsetY;
    this.nostrilSize = nostrilSize;
    this.nostrilOffsetY = nostrilOffsetY;
    this.bodyColor = color(106, 255, 77);
    this.eyeColor = color(255, 153, 153);
    this.eyeColor2 = color(0);
    this.shaking = 0;
  }

  display() {
    stroke(this.bodyColor);
    ellipseMode(CENTER);
    rectMode(CENTER);

    fill(this.bodyColor);
    ellipse(this.x + this.shaking, this.y + this.shaking, this.bodySize, this.bodySize);

    fill(this.eyeColor);
    ellipse(this.x - this.eyeDistance + this.shaking, this.y - this.eyeOffsetY + this.shaking, this.bodySize * 0.75, this.bodySize * 0.9, 20, 10);
    ellipse(this.x + this.eyeDistance + this.shaking, this.y - this.eyeOffsetY + this.shaking, this.bodySize * 0.75, this.bodySize * 0.9, 20, 10);

    fill(this.eyeColor2);
    ellipse(this.x - this.eyeDistance + this.shaking, this.y - this.eyeOffsetY + this.shaking, this.eyeSize, this.eyeSize);
    ellipse(this.x + this.eyeDistance + this.shaking, this.y - this.eyeOffsetY + this.shaking, this.eyeSize, this.eyeSize);

    // Nostrils
    ellipse(this.x - (this.eyeDistance * 0.2) + this.shaking, this.y - this.nostrilOffsetY + this.shaking, this.nostrilSize, this.nostrilSize);
    ellipse(this.x + (this.eyeDistance * 0.2) + this.shaking, this.y - this.nostrilOffsetY + this.shaking, this.nostrilSize, this.nostrilSize);
  }

  move() {
    this.x += direction * 2; // speed

    // reaches the right or left edge of the canvas
    if (this.x + this.bodySize / 2 >= width || this.x - this.bodySize / 2 <= 0) {
      direction *= -1; // Reverse the direction
    }
  }

  shake() {
    // Shake position randomly
    this.shaking = random(-5, 5);
  }
}
