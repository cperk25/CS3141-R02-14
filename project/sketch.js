function setup() {
  // put setup code here
  createCanvas(1280, 720);
}

function draw() {
  // put drawing code here
   if (mouseIsPressed) {
    fill(0);
    ellipse(mouseX, mouseY, 80, 80);
  } else {
    fill(255);
  }
}
