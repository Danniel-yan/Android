package com.shudu.chaoshi.util;

import java.io.BufferedReader;
import java.io.DataInput;
import java.io.DataOutput;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileChannel.MapMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class PackerNg {
    private static final String TAG = PackerNg.class.getSimpleName();
    private static final String EMPTY_STRING = "";
    private static String sCachedMarket;

    public static String getMarket(final Object context) {
        return getMarket(context, EMPTY_STRING);
    }

    public static synchronized String getMarket(final Object context, final String defaultValue) {
        if (sCachedMarket == null) {
            sCachedMarket = getMarketInternal(context, defaultValue).market;
        }
        return sCachedMarket;
    }

    public static MarketInfo getMarketInfo(final Object context) {
        return getMarketInfo(context, EMPTY_STRING);
    }

    public static synchronized MarketInfo getMarketInfo(final Object context, final String defaultValue) {
        return getMarketInternal(context, defaultValue);
    }

    private static MarketInfo getMarketInternal(final Object context, final String defaultValue) {
        String market;
        Exception error;
        try {
            final String sourceDir = Helper.getSourceDir(context);
            market = Helper.readMarket(new File(sourceDir));
            error = null;
        } catch (Exception e) {
            market = null;
            error = e;
        }
        return new MarketInfo(market == null ? defaultValue : market, error);
    }

    public static class MarketInfo {
        public final String market;
        public final Exception error;

        public MarketInfo(final String market, final Exception error) {
            this.market = market;
            this.error = error;
        }

        @Override
        public String toString() {
            return "MarketInfo{" +
                    "market='" + market + '\'' +
                    ", error=" + error +
                    '}';
        }
    }

    public static class Helper {
        static final String UTF_8 = "UTF-8";
        static final int ZIP_COMMENT_MAX_LENGTH = 65535;
        static final int SHORT_LENGTH = 2;
        static final byte[] MAGIC = new byte[]{0x21, 0x5a, 0x58, 0x4b, 0x21}; //!ZXK!

        // for android code
        private static String getSourceDir(final Object context)
                throws ClassNotFoundException,
                InvocationTargetException,
                IllegalAccessException,
                NoSuchFieldException,
                NoSuchMethodException {
            final Class<?> contextClass = Class.forName("android.content.Context");
            final Class<?> applicationInfoClass = Class.forName("android.content.pm.ApplicationInfo");
            final Method getApplicationInfoMethod = contextClass.getMethod("getApplicationInfo");
            final Object appInfo = getApplicationInfoMethod.invoke(context);
            // try ApplicationInfo.publicSourceDir
            final Field publicSourceDirField = applicationInfoClass.getField("publicSourceDir");
            String sourceDir = (String) publicSourceDirField.get(appInfo);
            if (sourceDir == null) {
                // try ApplicationInfo.sourceDir
                final Field sourceDirField = applicationInfoClass.getField("sourceDir");
                sourceDir = (String) sourceDirField.get(appInfo);
            }
            if (sourceDir == null) {
                // try Context.getPackageCodePath()
                final Method getPackageCodePathMethod = contextClass.getMethod("getPackageCodePath");
                sourceDir = (String) getPackageCodePathMethod.invoke(context);
            }
            return sourceDir;

        }

        private static boolean isMagicMatched(byte[] buffer) {
            if (buffer.length != MAGIC.length) {
                return false;
            }
            for (int i = 0; i < MAGIC.length; ++i) {
                if (buffer[i] != MAGIC[i]) {
                    return false;
                }
            }
            return true;
        }

        private static void writeBytes(byte[] data, DataOutput out) throws IOException {
            out.write(data);
        }

        private static void writeShort(int i, DataOutput out) throws IOException {
            ByteBuffer bb = ByteBuffer.allocate(SHORT_LENGTH).order(ByteOrder.LITTLE_ENDIAN);
            bb.putShort((short) i);
            out.write(bb.array());
        }

        private static short readShort(DataInput input) throws IOException {
            byte[] buf = new byte[SHORT_LENGTH];
            input.readFully(buf);
            ByteBuffer bb = ByteBuffer.wrap(buf).order(ByteOrder.LITTLE_ENDIAN);
            return bb.getShort(0);
        }


        public static void writeZipComment(File file, String comment) throws IOException {
            if (hasZipCommentMagic(file)) {
                throw new IllegalStateException("zip comment already exists, ignore.");
            }
            // {@see java.util.zip.ZipOutputStream.writeEND}
            byte[] data = comment.getBytes(UTF_8);
            final RandomAccessFile raf = new RandomAccessFile(file, "rw");
            raf.seek(file.length() - SHORT_LENGTH);
            // write zip comment length
            // (content field length + length field length + magic field length)
            writeShort(data.length + SHORT_LENGTH + MAGIC.length, raf);
            // write content
            writeBytes(data, raf);
            // write content length
            writeShort(data.length, raf);
            // write magic bytes
            writeBytes(MAGIC, raf);
            raf.close();
        }

        public static boolean hasZipCommentMagic(File file) throws IOException {
            RandomAccessFile raf = null;
            try {
                raf = new RandomAccessFile(file, "r");
                long index = raf.length();
                byte[] buffer = new byte[MAGIC.length];
                index -= MAGIC.length;
                // read magic bytes
                raf.seek(index);
                raf.readFully(buffer);
                // check magic bytes matched
                return isMagicMatched(buffer);
            } finally {
                if (raf != null) {
                    raf.close();
                }
            }
        }

        public static String readZipComment(File file) throws IOException {
            RandomAccessFile raf = null;
            try {
                raf = new RandomAccessFile(file, "r");
                long index = raf.length();
                byte[] buffer = new byte[MAGIC.length];
                index -= MAGIC.length;
                // read magic bytes
                raf.seek(index);
                raf.readFully(buffer);
                // if magic bytes matched
                if (isMagicMatched(buffer)) {
                    index -= SHORT_LENGTH;
                    raf.seek(index);
                    // read content length field
                    int length = readShort(raf);
                    if (length > 0) {
                        index -= length;
                        raf.seek(index);
                        // read content bytes
                        byte[] bytesComment = new byte[length];
                        raf.readFully(bytesComment);
                        return new String(bytesComment, UTF_8);
                    } else {
                        throw new IOException("zip comment content not found");
                    }
                } else {
                    throw new IOException("zip comment magic bytes not found");
                }
            } finally {
                if (raf != null) {
                    raf.close();
                }
            }
        }

        private static String readZipCommentMmp(File file) throws IOException {
            final int mappedSize = 10240;
            final long fz = file.length();
            RandomAccessFile raf = null;
            MappedByteBuffer map = null;
            try {
                raf = new RandomAccessFile(file, "r");
                map = raf.getChannel().map(MapMode.READ_ONLY, fz - mappedSize, mappedSize);
                map.order(ByteOrder.LITTLE_ENDIAN);
                int index = mappedSize;
                byte[] buffer = new byte[MAGIC.length];
                index -= MAGIC.length;
                // read magic bytes
                map.position(index);
                map.get(buffer);
                // if magic bytes matched
                if (isMagicMatched(buffer)) {
                    index -= SHORT_LENGTH;
                    map.position(index);
                    // read content length field
                    int length = map.getShort();
                    if (length > 0) {
                        index -= length;
                        map.position(index);
                        // read content bytes
                        byte[] bytesComment = new byte[length];
                        map.get(bytesComment);
                        return new String(bytesComment, UTF_8);
                    }
                }
            } finally {
                if (map != null) {
                    map.clear();
                }
                if (raf != null) {
                    raf.close();
                }
            }
            return null;
        }


        public static void writeMarket(final File file, final String market) throws IOException {
            writeZipComment(file, market);
        }

        public static String readMarket(final File file) throws IOException {
            return readZipComment(file);
        }

        public static boolean verifyMarket(final File file, final String market) throws IOException {
            return market.equals(readMarket(file));
        }

        public static void println(String msg) {
            System.out.println(TAG + ": " + msg);
        }

        public static List<String> parseMarkets(final File file) throws IOException {
            final List<String> markets = new ArrayList<String>();
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String line = null;
            int lineNo = 1;
            while ((line = br.readLine()) != null) {
                String parts[] = line.split("#");
                if (parts.length > 0) {
                    final String market = parts[0].trim();
                    if (market.length() > 0) {
                        markets.add(market);
                    } else {
                        println("skip invalid market line " + lineNo + ":'" + line + "'");
                    }
                } else {
                    println("skip invalid market line" + lineNo + ":'" + line + "'");
                }
                ++lineNo;
            }
            br.close();
            fr.close();
            return markets;
        }

        public static void copyFile(File src, File dest) throws IOException {
            if (!dest.exists()) {
                dest.createNewFile();
            }
            FileChannel source = null;
            FileChannel destination = null;
            try {
                source = new FileInputStream(src).getChannel();
                destination = new FileOutputStream(dest).getChannel();
                destination.transferFrom(source, 0, source.size());
            } finally {
                if (source != null) {
                    source.close();
                }
                if (destination != null) {
                    destination.close();
                }
            }
        }

        public static boolean deleteDir(File dir) {
            File[] files = dir.listFiles();
            if (files == null || files.length == 0) {
                return false;
            }
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDir(file);
                } else {
                    file.delete();
                }
            }
            return true;
        }

        public static String getExtension(final String fileName) {
            int dot = fileName.lastIndexOf(".");
            if (dot > 0) {
                return fileName.substring(dot + 1);
            } else {
                return null;
            }
        }

        public static String getBaseName(final String fileName) {
            int dot = fileName.lastIndexOf(".");
            if (dot > 0) {
                return fileName.substring(0, dot);
            } else {
                return fileName;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            Helper.println("Usage: java -jar packer-ng-x.x.x.jar your_apk_file market_file");
            System.exit(1);
        }
        Helper.println("command args: " + Arrays.toString(args));
        File apkFile = new File(args[0]);
        final File marketFile = new File(args[1]);
        if (!apkFile.exists()) {
            Helper.println("apk file:" + apkFile + " not exists or not readable");
            System.exit(1);
            return;
        }
        if (!marketFile.exists()) {
            Helper.println("markets file:" + marketFile + " not exists or not readable");
            System.exit(1);
            return;
        }
        Helper.println("apk file: " + apkFile);
        Helper.println("market file: " + marketFile);
        List<String> markets = Helper.parseMarkets(marketFile);
        if (markets == null || markets.isEmpty()) {
            Helper.println("not markets found.");
            System.exit(1);
            return;
        }
        Helper.println("markets: " + markets);
        final String baseName = Helper.getBaseName(apkFile.getName());
        final String extName = Helper.getExtension(apkFile.getName());
        final File outputDir = new File("apks");
        if (!outputDir.exists()) {
            outputDir.mkdirs();
        } else {
            Helper.deleteDir(outputDir);
        }
        int processed = 0;
        for (final String market : markets) {
            String apkName = "supermarket_" + market + "." + extName;

            try {
                String apkNameRule = args[2];
                apkName = String.format(apkNameRule, market);
            } catch (Exception exception) {

            }

            File destFile = new File(outputDir, apkName);
            Helper.copyFile(apkFile, destFile);
            Helper.writeMarket(destFile, market);
            if (Helper.verifyMarket(destFile, market)) {
                ++processed;
                Helper.println("processed apk " + destFile.getAbsolutePath() + "/" + apkName);
            } else {
                destFile.delete();
                Helper.println("failed to process " + apkName);
            }
        }
        Helper.println("all " + processed + " processed apks saved to " + outputDir);
    }

}
