///<reference path="../libs/p5/global.d.ts"/>

// Click within the image to toggle
// the shader used by the quad shape
// Note: for an alternative approach to the same example,
// involving changing uniforms please refer to:
// https://p5js.org/reference/#/p5.Shader/setUniform

let redGreen;
let orangeBlue;
let showRedGreen = false;

function preload() {
  // note that we are using two instances
  // of the same vertex and fragment shaders
  redGreen = loadShader('assets/shader.vert', 'assets/shader.frag');
  orangeBlue = loadShader('assets/shader.vert', 'assets/shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // initialize the colors for redGreen shader
  shader(redGreen);
  redGreen.setUniform('colorCenter', [1.0, 0.0, 0.0]);
  redGreen.setUniform('colorBackground', [0.0, 1.0, 0.0]);

  // initialize the colors for orangeBlue shader
  shader(orangeBlue);
  orangeBlue.setUniform('colorCenter', [1.0, 0.5, 0.0]);
  orangeBlue.setUniform('colorBackground', [0.226, 0.0, 0.615]);

  noStroke();
}

function draw() {
  // update the offset values for each shader,
  // moving orangeBlue in vertical and redGreen
  // in horizontal direction
  orangeBlue.setUniform('offset', [0, sin(millis() / 2000) + 1]);
  redGreen.setUniform('offset', [sin(millis() / 2000), 1]);

  if (showRedGreen === true) {
    shader(redGreen);
  } else {
    shader(orangeBlue);
  }
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function mouseClicked() {
  showRedGreen = !showRedGreen;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
