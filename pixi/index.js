///<reference path="../libs/pixi/pixi.js.d.ts"/>

// Get the screen width and height
let width = window.innerWidth;
let height = window.innerHeight;

const app = new PIXI.Application({
  width,
  height,
  autoResize: true,
  resizeTo: window,
});

document.body.appendChild(app.view);

// PIXI provides a default vertex shader:
// https://github.com/pixijs/pixi.js/wiki/v5-Creating-filters#default-vertex-shader

const glsl = (x) => x[0].trim();

const frag = glsl`
precision highp float;
uniform vec4 outputFrame;
uniform float time;

void main() {
  vec2 resolution = outputFrame.zw;
  vec2 coord = gl_FragCoord.xy / resolution - .5;
  gl_FragColor = vec4(1.0, sin(coord.x + time * 1e-3), 0., 1.0);
}

`;

const filter = new PIXI.Filter(null, frag, { time: 0 });

const rect = new PIXI.Graphics().drawRect(0, 0, width, height);

rect.filters = [filter];
app.stage.addChild(rect);

function animate(time = 0) {
  requestAnimationFrame(animate);
  filter.uniforms.time = time;
  app.renderer.render(app.stage);
}
animate();

function onResize() {
  width = rect.width = innerWidth;
  height = rect.height = innerHeight;
}

window.addEventListener('resize', onResize, false);
