
export class ByteBuf {
    private readerIndex: number = 0;
    private writerIndex: number = 0;
    private data: DataView;

    /**
     * Creates an empty buffer with the specified size
     * @param size Size of the buffer in bytes
     * @returns An empty ByteBuf with the given size
     */
    static emptyBuffer(size: number): ByteBuf {
        return new ByteBuf(new Uint8Array(size));
    }

    /**
     * Creates a ByteBuf containing the data of the buffer given
     * @param {Uint8Array} buffer The existing array for the ByteBuf to use
     * @returns {ByteBuf} A new ByteBuf with the given array
     */
    static from_uint8(buffer: Uint8Array): ByteBuf {
        return new ByteBuf(buffer);
    }

    /**
     * Creates a ByteBuf containing the data of the buffer given
     * @param {ArrayBuffer} buffer The existing array for the ByteBuf to use
     * @returns {ByteBuf} A new ByteBuf with the given array
     */
    static from(buffer: ArrayBufferLike): ByteBuf {
        return new ByteBuf(new Uint8Array(buffer));
    }

    /**
     * Creates a ByteBuf containing the data of the buffer given
     * @param {Uint8Array} buffer The existing array for the ByteBuf to use
     */
    constructor(data: Uint8Array) {
        this.data = new DataView(data.buffer);
    }

    /**
     * Reads in one byte as a boolean
     * @returns Byte in boolean value
     */
    public readBool(): boolean {
        let b: boolean = this.data.getInt8(this.readerIndex) == 1;
        this.readerIndex += 1;
        return b;
    }

    /**
     * Reads in one byte as a int8 (-128 to 127)
     * @returns Byte in number value
     */
    public readByteSigned(): number {
        let i = this.data.getInt8(this.readerIndex);
        this.readerIndex += 1;
        return i;
    }

    /**
     * Reads in one byte as a Uint8 (0 to 255)
     * @returns Byte in number value
     */
    public readByteUnsigned(): number {
        let i = this.data.getInt8(this.readerIndex);
        this.readerIndex += 1;
        return i + 128;
    }

    /**
     * Reads in two bytes as a short
     * @returns Short in number value
     */
    public readShort(): number {
        let i = this.data.getInt16(this.readerIndex);
        this.readerIndex += 2;
        return i;
    }

    /**
     * Reads in 4 bytes as a floating point number
     * @returns 4 byte floating number
     */
    public readFloat(): number {
        let f = this.data.getFloat32(this.readerIndex);
        this.readerIndex += 4;
        return f;
    }

    /**
     * Reads in 4 bytes as an integer
     * @returns 4 byte integer
     */
    public readInt(): number {
        let i = this.data.getInt32(this.readerIndex);
        this.readerIndex += 4;
        return i;
    }

    /**
     * Reads in 8 bytes and converts it to a BigInt
     * @returns 8 byte (big) integer
     */
    public readLong(): bigint {
        let i = this.data.getBigInt64(this.readerIndex);
        this.readerIndex += 8;
        return i;
    }

    /**
     * Reads in a string where each character is represented with one byte
     * This function assumes the string is encoded with a 4 byte integer
     * before it representing the size of the integer
     * It uses this size to read that amount of bytes
     * @returns the read in string
     */
    public readByteString(): string {
        let n = this.readInt();
        let s = "";
        for (let i = 0; i < n; i++) {
            s += String.fromCharCode(this.data.getUint8(this.readerIndex + i));
        }
        this.readerIndex += n;
        
        return s;
    }

    /**
     * Writes a boolean at the current index
     * Uses 1 byte
     * @param b boolean to write
     */
    public writeBool(b: boolean) {
        this.data.setInt8(this.writerIndex, b ? 1 : 0);
        this.writerIndex += 1;
    }

    /**
     * Writes a byte at the current index
     * Reads the given number as a Int8 (-128 to 127)
     * @param b byte to write
     */
    public writeByteSigned(b: number) {
        this.data.setInt8(this.writerIndex, b);
        this.writerIndex += 1;
    }

    /**
     * Writes a byte at the current index
     * Reads the given number as a Uint8 (0 to 255)
     * @param b Uint8 number to write
     */
    public writeByteUnsigned(b: number) {
        this.data.setInt8(this.writerIndex, b - 128);
        this.writerIndex += 1;
    }

    /**
     * Writes a short (2 bytes) at the current index
     * @param b short to write
     */
    public writeShort(s: number) {
        this.data.setInt16(this.writerIndex, s);
        this.writerIndex += 2;
    }

    /**
     * Writes a 4 byte floating point number at the current index
     * @param f float to write
     */
    public writeFloat(f: number) {
        this.data.setFloat32(this.writerIndex, f);
        this.writerIndex += 4;
    }

    /**
     * Writes a 4 byte integer at the current index
     * @param b integer to write
     */
    public writeInt(i: number) {
        this.data.setInt32(this.writerIndex, i);
        this.writerIndex += 4;
    } 

    /**
     * Writes a 8 byte long at the current index
     * @param l long to write
     */
    public writeLong(l: bigint) {
        this.data.setBigInt64(this.writerIndex, l);
        this.writerIndex += 8;
    }

    /**
     * Writes a string at the current index where each character is one byte
     * When writing, the size of the string is first written as a 4 byte integer
     * Then, the bytes of each character are written
     * @param s 
     */
    public writeByteString(s: string) {
        this.writeInt(s.length);
        for (let i = 0; i < s.length; i++) {
            this.writeByteSigned(s.charCodeAt(i));
        }
    }

    /**
     * Sets the reader index to the specified number
     * @param i index of the reader (bytes)
     */
    public setReaderIndex(i: number) {
        this.readerIndex = i;
    }

    /**
     * Sets the writer index to the specified number
     * @param i index of the writer (bytes)
     */
    public setWriterIndex(i: number) {
        this.writerIndex = i;
    }

    /**
     * Skips the reader index by the amount of bytes specified
     * @param s 
     */
    public skipReader(s: number) {
        this.readerIndex += s;
    }

    /**
     * Skips the writer index by the amount of bytes specified
     * @param s 
     */
    public skipWriter(s: number) {
        this.writerIndex += s;
    }

    /**
     * Returns the data in this ByteBuf as an ArrayBuffer 
     * @returns {ArrayBuffer}
     */
    public bytes(): ArrayBuffer {
        return this.data.buffer;
    }
}