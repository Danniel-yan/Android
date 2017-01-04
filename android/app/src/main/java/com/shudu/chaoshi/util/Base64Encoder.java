package com.shudu.chaoshi.util;

/**
 * Created by ysr on 2016-1-4.
 */

import java.io.IOException;
import java.io.OutputStream;

public class Base64Encoder implements Encoder
{
    protected final byte[] encodingTable = { 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 };
    protected byte padding = 61;
    protected final byte[] decodingTable = new byte[''];

    protected void initialiseDecodingTable()
    {
        for (int i = 0; i < this.encodingTable.length; i++)
            this.decodingTable[this.encodingTable[i]] = (byte)i;
    }

    public Base64Encoder()
    {
        initialiseDecodingTable();
    }

    public int encode(byte[] paramArrayOfByte, int paramInt1, int paramInt2, OutputStream paramOutputStream)
            throws IOException
    {
        int i = paramInt2 % 3;
        int j = paramInt2 - i;
        int i1;
        for ( i1 = paramInt1; i1 < paramInt1 + j; i1 += 3)
        {
            int k = paramArrayOfByte[i1] & 0xFF;
            int m = paramArrayOfByte[(i1 + 1)] & 0xFF;
            int n = paramArrayOfByte[(i1 + 2)] & 0xFF;
            paramOutputStream.write(this.encodingTable[(k >>> 2 & 0x3F)]);
            paramOutputStream.write(this.encodingTable[((k << 4 | m >>> 4) & 0x3F)]);
            paramOutputStream.write(this.encodingTable[((m << 2 | n >>> 6) & 0x3F)]);
            paramOutputStream.write(this.encodingTable[(n & 0x3F)]);
        }
        int i4;
        int i2;
        switch (i)
        {
            case 0:
                break;
            case 1:
                i4 = paramArrayOfByte[(paramInt1 + j)] & 0xFF;
                i1 = i4 >>> 2 & 0x3F;
                i2 = i4 << 4 & 0x3F;
                paramOutputStream.write(this.encodingTable[i1]);
                paramOutputStream.write(this.encodingTable[i2]);
                paramOutputStream.write(this.padding);
                paramOutputStream.write(this.padding);
                break;
            case 2:
                i4 = paramArrayOfByte[(paramInt1 + j)] & 0xFF;
                int i5 = paramArrayOfByte[(paramInt1 + j + 1)] & 0xFF;
                i1 = i4 >>> 2 & 0x3F;
                i2 = (i4 << 4 | i5 >>> 4) & 0x3F;
                int i3 = i5 << 2 & 0x3F;
                paramOutputStream.write(this.encodingTable[i1]);
                paramOutputStream.write(this.encodingTable[i2]);
                paramOutputStream.write(this.encodingTable[i3]);
                paramOutputStream.write(this.padding);
                break;
            default:
                break;
        }
        return j / 3 * 4 + (i == 0 ? 0 : 4);
    }

    private boolean ignore(char paramChar)
    {
        return (paramChar == '\n') || (paramChar == '\r') || (paramChar == '\t') || (paramChar == ' ');
    }



    public int decode(String paramString, OutputStream paramOutputStream)
            throws IOException
    {
        int n = 0;
        int i1 ;
        for ( i1 = paramString.length(); (i1 > 0) && (ignore(paramString.charAt(i1 - 1))); i1--);
        int i2 = 0;
        int i3 = i1 - 4;
        for (i2 = nextI(paramString, i2, i3); i2 < i3; i2 = nextI(paramString, i2, i3))
        {
            int i = this.decodingTable[paramString.charAt(i2++)];
            i2 = nextI(paramString, i2, i3);
            int j = this.decodingTable[paramString.charAt(i2++)];
            i2 = nextI(paramString, i2, i3);
            int k = this.decodingTable[paramString.charAt(i2++)];
            i2 = nextI(paramString, i2, i3);
            int m = this.decodingTable[paramString.charAt(i2++)];
            paramOutputStream.write(i << 2 | j >> 4);
            paramOutputStream.write(j << 4 | k >> 2);
            paramOutputStream.write(k << 6 | m);
            n += 3;
        }
        n += decodeLastBlock(paramOutputStream, paramString.charAt(i1 - 4), paramString.charAt(i1 - 3), paramString.charAt(i1 - 2), paramString.charAt(i1 - 1));
        return n;
    }

    private int decodeLastBlock(OutputStream paramOutputStream, char paramChar1, char paramChar2, char paramChar3, char paramChar4)
            throws IOException
    {
        if (paramChar3 == this.padding)
        {
            int i = this.decodingTable[paramChar1];
            int j = this.decodingTable[paramChar2];
            paramOutputStream.write(i << 2 | j >> 4);
            return 1;
        }
        if (paramChar4 == this.padding)
        {
            int i = this.decodingTable[paramChar1];
            int j = this.decodingTable[paramChar2];
            int k = this.decodingTable[paramChar3];
            paramOutputStream.write(i << 2 | j >> 4);
            paramOutputStream.write(j << 4 | k >> 2);
            return 2;
        }
        int i = this.decodingTable[paramChar1];
        int j = this.decodingTable[paramChar2];
        int k = this.decodingTable[paramChar3];
        int m = this.decodingTable[paramChar4];
        paramOutputStream.write(i << 2 | j >> 4);
        paramOutputStream.write(j << 4 | k >> 2);
        paramOutputStream.write(k << 6 | m);
        return 3;
    }

    private int nextI(String paramString, int paramInt1, int paramInt2)
    {
        while ((paramInt1 < paramInt2) && (ignore(paramString.charAt(paramInt1))))
            paramInt1++;
        return paramInt1;
    }
}