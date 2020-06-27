const glsl = (x) => x[0].trim();

export const vert = glsl`
varying vec2 vUv;

void main()	{
  vUv = uv;
  gl_Position = vec4( position, 1.0 );
}
`;
