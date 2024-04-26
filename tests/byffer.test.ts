import { ByteBuf } from "../src/byffer"

describe("Test byffer for reading and writing", () => {
    test('strings', () => {
        let buf = ByteBuf.emptyBuffer(128);
        let s = "This is a test string, let's hope it come back fine...!!!!!_"
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
        let buf = ByteBuf.emptyBuffer(128);
        let num = BigInt(-3484939373654123439);
        buf.writeLong(num);

        expect(buf.readLong()).toBe(num);
    });
    test('floats', () => {
        let buf = ByteBuf.emptyBuffer(128);
        let num = -999999.3125;
        buf.writeFloat(num);

        expect(buf.readFloat()).toBe(num);
    });
    test('ints', () => {
        let buf = ByteBuf.emptyBuffer(128);
        let num = 949493737;
        buf.writeInt(num);

        expect(buf.readInt()).toBe(num);
    });
    test('bytes', () => {
        let buf = ByteBuf.emptyBuffer(128);
        buf.writeByteSigned(-128);
        buf.writeByteSigned(127);
        buf.writeByteUnsigned(255);

        expect(buf.readByteSigned()).toBe(-128);
        expect(buf.readByteSigned()).toBe(127);
        expect(buf.readByteUnsigned()).toBe(255);
    });
    test('bools', () => {
        let buf = ByteBuf.emptyBuffer(128);
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
        let buf: ByteBuf = ByteBuf.emptyBuffer(128);

        // You can then write some data
        buf.writeInt(1337);
        buf.writeByteUnsigned(255);
        buf.writeByteString("I'm saying hi, from byffer!");
        buf.writeFloat(-999999.3125);

        // Or, read the data
        let i = buf.readInt(); // Returns 1337
        let b = buf.readByteUnsigned(); // Returns 255
        let s = buf.readByteString(); // Returns "I'm saying hi, from byffer!"
        let f = buf.readFloat();

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

        let data = buf.bytes();

        buf = ByteBuf.from(data);

        let i = buf.readInt();
        let b = buf.readByteUnsigned();
        let s = buf.readByteString();
        let f = buf.readFloat();

        expect(i).toBe(1337);
        expect(b).toBe(255);
        expect(s).toBe("I'm saying hi, from byffer!");
        expect(f).toBe(-999999.3125);
    });
});