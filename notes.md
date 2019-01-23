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





https://en.wikipedia.org/wiki/Wireworld

https://www.quinapalus.com/wi-index.html