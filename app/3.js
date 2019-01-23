let uints;

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
  document.getElementById('main').innerText = 'running wasm';

  uints = new Uint8ClampedArray(instance.memory.buffer, 0, dimensions * dimensions * 4);

  console.time('wasm');
  for (let i = 0; i < 100000; i++) {
    instance.add();
  }
  console.timeEnd('wasm');

  console.time('js');
  for (let i = 0; i < 1000; i++) {
    add();
  }
  console.timeEnd('js');

  const canvas = document.getElementById('canvasBack');
  const context = canvas.getContext('2d');
  const imageData = new ImageData(uints, dimensions, dimensions);
  context.putImageData(imageData, 0, 0);

  document.getElementById('main').innerText = 'done';
}

function add() {
  for (let y = 0; y < dimensions; y++) {
    for (let x = 0; x < dimensions; x++) {
      setRed(x, y, 127);
      setGreen(x, y, 127);
      setBlue(x, y, 127);
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

start().catch(ex => console.error(ex));
