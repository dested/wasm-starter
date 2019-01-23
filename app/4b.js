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
  document.getElementById('main').innerText = 'running wasm';

  uints = new Uint8ClampedArray(instance.memory.buffer, 0, dimensions * dimensions * 4);

  setInterval(() => {
    instance.add();
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

start().catch(ex => console.error(ex));
