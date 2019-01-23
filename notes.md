Setup webpack normally

npm install arraybuffer-loader --save-dev

add rule 

      rules: [
        {
          type: 'javascript/auto',
          test: /\.wasm/,
          loaders: ['arraybuffer-loader']
        }
      ]

`npm install --save-dev AssemblyScript/assemblyscript`
`npx asinit .`

This creates an assembly folder, a build output folder, an index.js (we wont use it) and updates our package.json to contain some new scripts

We're gonna add  --importMemory to the scripts and delete index.js

`npm run asbuild`

that produces .wat's (human readable), .wasm (binary), and the sourcemap

so how do we call this

new WebAssembly.Memory({initial: 1}) 64KiB



```  const result = await import('../build/optimized.wasm');
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
     document.getElementById('main').innerText = instance.add(10, 10);```