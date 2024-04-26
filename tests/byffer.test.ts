import { ByteBuf } from "../src/byffer"

describe("Test byffer for reading and writing", () => {
    test('strings', () => {
        const buf = ByteBuf.emptyBuffer(128);
        const s = "This is a test string, const's hope it come back fine...!!!!!_"
        // Write extra data before
        buf.writeByteSigned(1);
        // Write our string
        buf.writeByteString(s);
        // Write some extra data after
        buf.writeInt(99999);
    
        buf.readByteSigned();
    
        expect(buf.readByteString()).toBe(s);
    });
    test('longs', () => {
        const buf = ByteBuf.emptyBuffer(128);
        const num = BigInt(-3484939373654123439);
        buf.writeLong(num);

        expect(buf.readLong()).toBe(num);
    });
    test('floats', () => {
        const buf = ByteBuf.emptyBuffer(128);
        const num = -999999.3125;
        buf.writeFloat(num);

        expect(buf.readFloat()).toBe(num);
    });
    test('ints', () => {
        const buf = ByteBuf.emptyBuffer(128);
        const num = 949493737;
        buf.writeInt(num);

        expect(buf.readInt()).toBe(num);
    });
    test('shorts', () => {
        const buf = ByteBuf.emptyBuffer(128);
        buf.writeShort(-23433);
        buf.writeShort(4545);
        buf.writeShort(0);

        expect(buf.readShort()).toBe(-23433);
        expect(buf.readShort()).toBe(4545);
        expect(buf.readShort()).toBe(0);
    });
    test('bytes', () => {
        const buf = ByteBuf.emptyBuffer(128);
        buf.writeByteSigned(-128);
        buf.writeByteSigned(127);
        buf.writeByteUnsigned(255);

        expect(buf.readByteSigned()).toBe(-128);
        expect(buf.readByteSigned()).toBe(127);
        expect(buf.readByteUnsigned()).toBe(255);
    });
    test('bools', () => {
        const buf = ByteBuf.emptyBuffer(128);
        buf.writeBool(true);
        buf.writeBool(false);
        buf.writeBool(true);

        expect(buf.readBool()).toBe(true);
        expect(buf.readBool()).toBe(false);
        expect(buf.readBool()).toBe(true);
    });
});
describe("Miscellaneous tests", () => {
    test('README usage example', () => {
        // Create an empty buffer with 128 bytes
        const buf: ByteBuf = ByteBuf.emptyBuffer(128);

        // You can then write some data
        buf.writeInt(1337);
        buf.writeByteUnsigned(255);
        buf.writeByteString("I'm saying hi, from byffer!");
        buf.writeFloat(-999999.3125);

        // Or, read the data
        const i = buf.readInt(); // Returns 1337
        const b = buf.readByteUnsigned(); // Returns 255
        const s = buf.readByteString(); // Returns "I'm saying hi, from byffer!"
        const f = buf.readFloat();

        expect(i).toBe(1337);
        expect(b).toBe(255);
        expect(s).toBe("I'm saying hi, from byffer!");
        expect(f).toBe(-999999.3125);
    });
    test('ArrayBuffer conversion test', () => {
        // We'll use the example data

        let buf: ByteBuf = ByteBuf.emptyBuffer(128);

        buf.writeInt(1337);
        buf.writeByteUnsigned(255);
        buf.writeByteString("I'm saying hi, from byffer!");
        buf.writeFloat(-999999.3125);

        const data = buf.bytes();

        buf = ByteBuf.from(data);

        const i = buf.readInt();
        const b = buf.readByteUnsigned();
        const s = buf.readByteString();
        const f = buf.readFloat();

        expect(i).toBe(1337);
        expect(b).toBe(255);
        expect(s).toBe("I'm saying hi, from byffer!");
        expect(f).toBe(-999999.3125);
    });
    test('Reader and writer skipping', () => {
        const buf: ByteBuf = ByteBuf.emptyBuffer(128);
        buf.writeInt(21343);
        buf.writeShort(555);
        //6 bytes total

        buf.skipReader(4);
        expect(buf.readShort()).toBe(555);

        buf.skipWriter(4);
        buf.writeByteString("Hello, hello, hello!");
        buf.skipReader(4);
        expect(buf.readByteString()).toBe("Hello, hello, hello!");
    });
});