# byffer.ts
~250 line TS library for byte buffer manipulation

find it on npm [here](https://www.npmjs.com/package/byffer.ts).

## install it
use npm:
```shell
npm install byffer.ts
```
or just copy paste the [byffer.ts file](https://github.com/premiering/byffer.ts/blob/main/src/byffer.ts) since it's so small

## using byffer.ts
create a `ByteBuf` instance to store and read manipulate your data.

it can be created empty, or using pre-existing data

example:
```ts
import ByteBuf from 'byffer.ts';

// Create an empty buffer with 128 bytes
let buf: ByteBuf = ByteBuf.emptyBuffer(128);
// or, use an existing ArrayBuffer like class (ArrayBufferLike)
buf = ByteBuf.from(some_buffer);

// You can then write some data
buf.writeInt(1337);
buf.writeByteUnsigned(255);
buf.writeByteString("i'm saying hi, from byffer!");
buf.writeFloat(-999999.3125);

// Then you can take back the data as an ArrayBuffer
let data: ArrayBuffer = buf.bytes();

// Or, read the data
let i = buf.readInt(); // Returns 1337
let b = buf.readByteUnsigned(); // Returns 255
let s = buf.readByteString(); // Returns "i'm saying hi, from byffer!"
let f = buf.readFloat(); // Returns -999999.3125
```

## license
using MIT license, do whatever