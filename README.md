# byffer.ts
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/premiering/byffer.ts/node.js.yml)
![NPM Version](https://img.shields.io/npm/v/byffer.ts)


An easy library to read and manipulate byte buffers in TypeScript.

It is also on `npm` [here](https://www.npmjs.com/package/byffer.ts).

## Installation
Installation is made easy with `npm`
```shell
npm install byffer.ts
```

## Using byffer.ts
You can create a `ByteBuf` instance to store and read manipulate your data.

It can be created empty, or using pre-existing data.

Here's an example of using byffer.ts:
```ts
import ByteBuf from 'byffer.ts';

// Create an empty buffer with 128 bytes
let buf: ByteBuf = ByteBuf.emptyBuffer(128);
// or, use an existing ArrayBuffer like class (ArrayBufferLike)
buf = ByteBuf.from(awesome_buffer);

// You can then write some data
buf.writeInt(1337);
buf.writeByteUnsigned(255);
buf.writeByteString("I'm saying hi, from byffer!");
buf.writeFloat(-999999.3125);

// Then you can take back the data as an ArrayBuffer
let data: ArrayBuffer = buf.bytes();

// Or, read the data
let i = buf.readInt(); // Returns 1337
let b = buf.readByteUnsigned(); // Returns 255
let s = buf.readByteString(); // Returns "I'm saying hi, from byffer!"
let f = buf.readFloat(); // Returns -999999.3125
```

## License
byffer.ts is licensed under the MIT license. You can do pretty much whatever you want to with this code.