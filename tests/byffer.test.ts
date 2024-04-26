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