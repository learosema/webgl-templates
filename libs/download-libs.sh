#!/bin/sh
cd `dirname $0`

mkdir -p ./glea
curl -L https://unpkg.com/glea@latest/LICENSE > glea/LICENSE
curl -L https://unpkg.com/glea@latest/dist/glea.min.js > glea/glea.min.js
curl -L https://unpkg.com/glea@latest/dist/glea.d.ts > glea/glea.d.ts

mkdir -p ./phenomenon
curl -L https://unpkg.com/phenomenon@latest/dist/phenomenon.mjs > phenomenon/phenomenon.mjs
curl -L https://unpkg.com/phenomenon@latest/dist/index.d.ts > phenomenon/index.d.ts

mkdir -p ./three
curl -L https://unpkg.com/three@latest/LICENSE > three/LICENSE
curl -L https://unpkg.com/three@latest/build/three.module.js > three/three.module.js

mkdir -p ./regl
curl -L https://unpkg.com/regl@latest/LICENSE > regl/LICENSE
curl -L https://unpkg.com/regl@latest/dist/regl.min.js > regl/regl.min.js
curl -L https://unpkg.com/regl@latest/dist/regl.d.ts > regl/regl.d.ts

mkdir -p ./pixi
curl -L https://unpkg.com/pixi.js@latest/LICENSE > pixi/LICENSE
curl -L https://unpkg.com/pixi.js@latest/dist/pixi.min.js > pixi/pixi.min.js
curl -L https://unpkg.com/pixi.js@latest/pixi.js.d.ts > pixi/pixi.js.d.ts

mkdir -p ./p5
curl -L https://unpkg.com/p5@latest/license.txt > p5/license.txt
curl -L https://unpkg.com/p5@latest/lib/p5.min.js > p5/p5.min.js
curl -L https://unpkg.com/@types/p5@latest/index.d.ts > p5/index.d.ts
curl -L https://unpkg.com/@types/p5@latest/global.d.ts > p5/global.d.ts