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

  console.time('wasm');
  for (let i = 0; i < 30000000; i++) {
    instance.add(10, 10);
  }
  console.timeEnd('wasm');

  document.getElementById('main').innerText = 'running js';

  console.time('js');
  for (let i = 0; i < 30000000; i++) {
    add(10, 10);
  }
  console.timeEnd('js');

  document.getElementById('main').innerText = 'done';
}

function add(left, right) {
  return left + right;
}

start().catch(ex => console.error(ex));
