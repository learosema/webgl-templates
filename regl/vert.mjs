const glsl = (x) => x[0].trim();

export const vert = glsl`
precision mediump float;
attribute vec2 position;

void main () {
  gl_Position = vec4(position, 0, 1);
}
`;
