package com.shudu.chaoshi.util;

/**
 * Created by ysr on 2017-1-4.
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
