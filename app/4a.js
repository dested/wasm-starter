let uints;
let imageData;
let context;

const dimensions = 100;

async function start() {
  document.getElementById('main').innerText = 'hi';

  const result = await import('../build/optimized.wasm');
  const module = new WebAssembly.Module(result.default);
  const instance = new WebAssembly.Instance(module, {
    env: {
      memory: new WebAssembly.Memory({initial: 8}),
      abort(_msg, _file, line, column) {
        console.error('abort called at index.ts:' + line + ':' + column);
      }
    },
    console: {
      logger(arg) {
        console.log(arg);
      }
    },
    config: {}
  }).exports;
  document.getElementById('main').innerText = 'running js';

  uints = new Uint8ClampedArray(instance.memory.buffer, 0, dimensions * dimensions * 4);

  setInterval(() => {
    add();
  });

  const canvas = document.getElementById('canvasBack');
  context = canvas.getContext('2d');
  imageData = new ImageData(uints, dimensions, dimensions);

  draw();
}

function draw() {
  context.putImageData(imageData, 0, 0);
  requestAnimationFrame(draw);
}

function add() {
  for (let y = 0; y < dimensions; y++) {
    for (let x = 0; x < dimensions; x++) {
      setRed(x, y, getRed(x, y));
      setGreen(x, y, getGreen(x, y));
      setBlue(x, y, getBlue(x, y));
      setAlpha(x, y, 255);
    }
  }
}

function setRed(x, y, value) {
  uints[y * dimensions * 4 + x * 4 + 0] = value;
}
function setGreen(x, y, value) {
  uints[y * dimensions * 4 + x * 4 + 1] = value;
}
function setBlue(x, y, value) {
  uints[y * dimensions * 4 + x * 4 + 2] = value;
}
function setAlpha(x, y, value) {
  uints[y * dimensions * 4 + x * 4 + 3] = value;
}

function getRed(x, y) {
  return (uints[y * dimensions * 4 + x * 4 + 0] + 1) % 255;
}
function getGreen(x, y) {
  return (uints[y * dimensions * 4 + x * 4 + 1] + 2) % 255;
}
function getBlue(x, y) {
  return (uints[y * dimensions * 4 + x * 4 + 2] + 3) * 255;
}

start().catch(ex => console.error(ex));
