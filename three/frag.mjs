const glsl = (x) => x[0].trim();

export const frag = glsl`
precision highp float;
uniform float time;
uniform vec2 resolution;

void main() {
  float vmin = min(resolution.y, resolution.x);
  vec2 p = (gl_FragCoord.xy - .5 * resolution) / vmin;
  float r = .5 + .5 * (sin(5. * p.x + time));
  float g = .5 + .5 * (sin(5. * p.y) + sin(time + 2. * p.x));  
  float b = .5 + .5 * (sin(.2 + p.x * p.y * 17.) + sin(time * .4  + 4. * p.y));
  gl_FragColor = vec4(r, g, b, 1.);
}
`;
