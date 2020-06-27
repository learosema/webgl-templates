import * as THREE from '../libs/three/three.module.js';
import { vert } from './vert.mjs';
import { frag } from './frag.mjs';

const container = document.querySelector('#container');

let camera, scene, renderer, uniforms, clock;

init();
animate();

function init() {
  clock = new THREE.Clock();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene = new THREE.Scene();

  const geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    time: { type: 'f', value: 1.0 },
    resolution: { type: 'v2', value: new THREE.Vector2() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  onResize();
  window.addEventListener('resize', onResize, false);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.x = renderer.domElement.width;
  uniforms.resolution.value.y = renderer.domElement.height;
}

function animate(timestamp) {
  requestAnimationFrame(animate);
  uniforms.time.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}
