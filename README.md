# byffer.ts
An easy library to manipulate byte buffers in TypeScript.

## Usage
You can create a `ByteBuf` instance to store and manipulate your data.

It can be created empty, or using pre-existing data.
```ts
// Create an empty buffer with 128 bytes
let buf: ByteBuf = ByteBuf.emptyBuffer(128);
// or, use an existing Uint8Array
buf = ByteBuf.from(awesome_buffer);

// You can then write some data
buf.writeInt(1337);
buf.writeByteUnsigned(255);
buf.writeByteString("I'm saying hi, from byffer!");

// Then you can take back the data as an ArrayBuffer
let data: ArrayBuffer = buf.bytes();

// Or, read the data
let i = buf.readInt(); // Returns 1337
let b = buf.readByteUnsigned(); // Returns 255
let s = buf.readByteString(); // Returns "I'm saying hi, from byffer!"
```

## License
byffer.ts is licensed under the MIT license. You can do pretty much whatever you want to with this code.