class DigitalArt extends HTMLElement {
  constructor() {
    super();
    this.canvas = null;
    this.gl = null;
    this.onResize = this.onResize.bind(this);
    this.loop = this.loop.bind(this);
  }

  static register() {
    customElements.define('digital-art', DigitalArt);
  }

  connectedCallback() {
    if (!this.gl) {
      this.setup();
    }
  }

  disconnectedCallback() {
    this.dispose();
  }

  onResize() {
    const { canvas, gl, program } = this;
    const width = this.clientWidth;
    const height = this.clientHeight;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    const uResolution = gl.getUniformLocation(program, 'resolution');
    gl.uniform2fv(uResolution, [width, height]);
  }

  createShader(type, code) {
    const { gl } = this;
    const sh = gl.createShader(type, code);
    gl.shaderSource(sh, code);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      throw gl.getShaderInfoLog(sh);
    }
    return sh;
  }

  createBuffers() {
    const { gl, program } = this;
    const bufferScripts = [...this.querySelectorAll('[type=buffer]')];
    this.buffers = {};
    let count = -1;
    bufferScripts.forEach((container) => {
      const name = container.getAttribute('name') || 'position';
      const recordSize = parseInt(container.getAttribute('data-size'), 10) || 1;
      const data = new Float32Array(JSON.parse(container.textContent.trim()));
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const attribLoc = gl.getAttribLocation(program, name);
      this.buffers[name] = { buffer, data, attribLoc, recordSize };
      count = Math.max(count, (data.length / recordSize) | 0);
      gl.enableVertexAttribArray(attribLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(attribLoc, recordSize, gl.FLOAT, false, 0, 0);
    });
    this.count = count;
  }

  loop(time = 0) {
    const { gl, program } = this;
    const uTime = gl.getUniformLocation(program, 'time');
    gl.uniform1f(uTime, time);
    gl.drawArrays(gl.TRIANGLES, 0, this.count);
    this.frame = requestAnimationFrame(this.loop);
  }

  createPrograms() {
    const { gl } = this;
    const fragScript = this.querySelector('[type=frag]');
    const vertScript = this.querySelector('[type=vert]');
    const HEADER = 'precision highp float;';
    const DEFAULT_VERT =
      HEADER + 'attribute vec4 position;void main(){gl_Position=position;}';
    const DEFAULT_FRAG = HEADER + 'void main(){gl_FragColor=vec4(1.,0,0,1.);}';

    this.fragCode = fragScript?.textContent || DEFAULT_FRAG;
    this.vertCode = vertScript?.textContent || DEFAULT_VERT;

    const program = gl.createProgram();
    this.program = program;
    this.gl = gl;

    this.fragShader = this.createShader(gl.FRAGMENT_SHADER, this.fragCode);
    this.vertShader = this.createShader(gl.VERTEX_SHADER, this.vertCode);

    gl.attachShader(program, this.fragShader);
    gl.attachShader(program, this.vertShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw gl.getProgramInfoLog(program);
    }
  }

  setup() {
    this.canvas = document.createElement('canvas');
    this.appendChild(this.canvas);
    this.gl =
      this.canvas.getContext('webgl') ||
      this.canvas.getContext('experimental-webgl');
    this.createPrograms();

    const { program, gl } = this;

    gl.useProgram(program);
    this.createBuffers();
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.onResize();
    window.addEventListener('resize', this.onResize, false);
    this.frame = requestAnimationFrame(this.loop);
  }

  dispose() {
    cancelAnimationFrame(this.loop);
    this.frame = -1;
    window.removeEventListener('resize', this.onResize, false);
    Object.entries(this.buffers).forEach(([name, buf]) => {
      this.gl.deleteBuffer(buf.buffer);
    });
    this.gl.deleteProgram(this.program);
    const loseCtx = this.gl.getExtension('WEBGL_lose_context');
    if (loseCtx && typeof loseCtx.loseContext === 'function') {
      loseCtx.loseContext();
    }
    this.removeChild(this.canvas);
    this.gl = null;
    this.canvas = null;
    this.buffers = {};
  }
}

DigitalArt.register();
