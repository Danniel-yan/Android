package com.shudu.chaoshi.util;

/**
 * Created by weileek on 2015-8-4.
 */
import java.io.IOException;
import java.io.OutputStream;

public interface Encoder
{
    int encode(byte[] paramArrayOfByte, int paramInt1, int paramInt2, OutputStream paramOutputStream)
            throws IOException;
    int decode(String paramString, OutputStream paramOutputStream)
            throws IOException;
}
