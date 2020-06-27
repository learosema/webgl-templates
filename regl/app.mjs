///<reference path="../libs/regl/regl.d.ts"/>

import { frag } from './frag.mjs';
import { vert } from './vert.mjs';

const regl = createREGL();
const d = document;
const $ = d.querySelector.bind(d);

const $code = (sel) =>
  (document.getElementById(sel) || {}).textContent || 'void main() {}';

const drawFrame = regl({
  frag,
  vert,

  attributes: {
    position: [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ],
  },

  uniforms: {
    color: [1, 0, 0],
    width: (ctx) => ctx.viewportWidth,
    height: (ctx) => ctx.viewportHeight,
    time: (ctx) => ctx.tick * 0.05,
  },

  count: 6,
});

regl.frame((ctx) => {
  regl.clear({
    color: [1, 1, 1, 1],
    depth: 1,
  });
  drawFrame();
});
