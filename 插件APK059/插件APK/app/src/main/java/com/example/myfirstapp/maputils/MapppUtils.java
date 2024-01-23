package com.example.myfirstapp.maputils;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Environment;
import android.text.TextUtils;
import android.util.Log;

//import com.ainirobot.base.analytics.utils.Md5Util;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

public class MapppUtils {

    private static final String TAG = "MapppUtils";

    public final static int PASS = 0xFFFFFFFF;
    public final static int BLOCK = 0xFFFF0033;
    public final static int UNDETECT = 0xFF567C79;
    public final static int OBSTACLE = 0xFF1A1A1A;
    public final static int BLOCK_EXPANSION = 0x80FF0033;//禁行线膨胀区域
    public final static int OBSTACLE_EXPANSION = 0x801A1A1A;//障碍物膨胀区域
    private final static String MAP_PGM_NAME = "map.pgm";

    /**
     * 将bitmap转换为本地的图片
     *
     * @param bitmap
     * @return
     */

    public static String bitmap2Path(Bitmap bitmap, String path) {
        try {
            OutputStream os = new FileOutputStream(path);

            bitmap.compress(Bitmap.CompressFormat.PNG, 100, os);

            os.flush();

            os.close();

        } catch (Exception e) {
            Log.e("TAG", "", e);

        }

        return path;

    }

    public static Pose2d pose2PixelByRoverMap(RoverMap costMap, Pose2d pose) {
        Pose2d newPose = new Pose2d(pose.x, pose.y, pose.t, pose.status);
        if (costMap != null) {
            newPose.x -= costMap.x;
            newPose.x /= costMap.res;
            newPose.y -= costMap.y;
            newPose.y /= costMap.res;
            newPose.y = costMap.height - newPose.y;
        }
        return newPose;
    }

    public static RoverMap loadMap(String mapName) {
        Log.d(TAG, "loadMap: mapName=" + mapName);
        String pgmPath = getMapPgmFilePath(mapName);//loadMap
        Log.d(TAG, "loadMap: pgmPath=" + pgmPath);
        FileInputStream fileInputStream = null;
        DataInputStream dataInputStream = null;
        try {
            RoverMap roverMap = new RoverMap();
            roverMap.pgmMd5 = getFileMD5(new File(pgmPath));
            fileInputStream = new FileInputStream(pgmPath);
            dataInputStream = new DataInputStream(fileInputStream);

            String magic = nextNonCommentLine(dataInputStream);
            Log.d(TAG, "loadMap: magic=" + magic);
            if (!magic.equals("P5")) {
                throw new Exception("Unknown magic number: " + magic);
            }

            String widthHeight = nextNonCommentLine(dataInputStream);
            String[] tokens = widthHeight.split(" ");
            int width = Integer.parseInt(tokens[0]);
            int height = Integer.parseInt(tokens[1]);
            int size = width * height;

            nextNonCommentLine(dataInputStream);

            byte[] pixelsByte = new byte[size];
            dataInputStream.read(pixelsByte, 0, size);
            roverMap.extra = new byte[16];
            dataInputStream.read(roverMap.extra, 0, 16);

            int[] pixelsInt = new int[size];
            for (int i = 0; i < size; i++) {
                int p = pixelsByte[i] & 0xff;
                switch (p) {
                    case 0x96:
                        pixelsInt[i] = UNDETECT;//灰色---白色 未探测
                        break;
                    case 0x00:
                        pixelsInt[i] = BLOCK;//黑色---深蓝 禁行线
                        break;
                    case 0xff:
                        pixelsInt[i] = PASS;//白色---浅蓝 可通行
                        break;
                    case 0x05:
                        pixelsInt[i] = OBSTACLE;//障碍物
                        break;
                    default:
                        break;
                }
            }

            roverMap.x = byte2float(roverMap.extra, 8);
            roverMap.y = byte2float(roverMap.extra, 12);
            roverMap.res = bytes2Double(roverMap.extra, 0);
            roverMap.height = height;
            roverMap.width = width;

            roverMap.bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
            roverMap.bitmap.setPixels(pixelsInt, 0, width, 0, 0, width, height);
            Log.d(TAG, "loadMap: Done!");
            return roverMap;
        } catch (Exception e) {
            Log.d(TAG, "loadMap:Exception: " + e.getMessage());
            e.printStackTrace();
        } finally {
            IOUtils.close(dataInputStream);
            IOUtils.close(fileInputStream);
        }
        return null;
    }

    private static final int ZIP_BUFF_SIZE = 1024 * 1024; // 1M Byte

    private static String nextAnyLine(DataInputStream dataInputStream) throws IOException {
        StringBuffer sb = new StringBuffer();
        byte b = 0;
        while (b != 10) // newline
        {
            b = dataInputStream.readByte();
            char c = (char) b;
            sb.append(c);
        }
        return sb.toString().trim();
    }

    private static String nextNonCommentLine(DataInputStream dataInputStream) throws IOException {
        String s = nextAnyLine(dataInputStream);
        while (s.startsWith("#") || s.equals("")) {
            s = nextAnyLine(dataInputStream);
        }
        return s;
    }

    /**
     * 文字生成图片
     *
     * @param text
     * @param textSize
     * @param textColor
     * @param bgColor
     * @param padding
     * @return
     */
    public static Bitmap text2Bitmap(String text, int textSize, String textColor, String bgColor, int padding) {
        Paint paint = new Paint();

        paint.setColor(Color.parseColor(textColor));

        paint.setTextSize(textSize);

        paint.setStyle(Paint.Style.FILL);

        paint.setAntiAlias(true);

        float width = paint.measureText(text, 0, text.length());

        float top = paint.getFontMetrics().top;

        float bottom = paint.getFontMetrics().bottom;

        Bitmap bm = Bitmap.createBitmap((int) (width + padding * 2), (int) ((bottom - top) + padding * 2), Bitmap.Config.ARGB_8888);

        Canvas canvas = new Canvas(bm);

        canvas.drawColor(Color.parseColor(bgColor));

        canvas.drawText(text, padding, -top + padding, paint);

        return bm;

    }

    /**
     * 浮点和double的区别，一个是value类型，一个是字节格个数
     *
     * @param arr
     * @param index
     * @return
     */
    public static float byte2float(byte[] arr, int index) {
        int value = 0;
        for (int i = index; i < index + 4; i++) {
            value |= ((long) (arr[i] & 0xff)) << (8 * (i - index));
        }
        return Float.intBitsToFloat(value);
    }

    public static double bytes2Double(byte[] arr, int index) {
        long value = 0;
        for (int i = index; i < index + 8; i++) {
            value |= ((long) (arr[i] & 0xff)) << (8 * (i - index));
        }
        return Double.longBitsToDouble(value);
    }

    private final static String NAVI_DATA_DIR = "navi_data/";
    public final static String MAP_PGM = "map.pgm";
    public final static String MAP_DIR = "/robot/map";
    private final static String MAP_PGM_ZIP = "pgm.zip";
    public final static String ROBOT_MAP_DIR = Environment.getExternalStorageDirectory() + MAP_DIR;

    public static String getMapPgmFilePath(String mapName) {
        String mapPgmPath = ROBOT_MAP_DIR + File.separator +
                mapName + File.separator + NAVI_DATA_DIR + MAP_PGM;
        if (!new File(mapPgmPath).exists()) {//兼容老版本
            Log.e(TAG, "getMapPgmFilePath: Compatible with older versions");
            String mapPath = ROBOT_MAP_DIR + File.separator + mapName;
            String pgmZip = mapPath + File.separator + MAP_PGM_ZIP;
            File pgmFile = new File(pgmZip);
            if (pgmFile.exists()){
                return pgmZip;
            }
            try {
                unZipFile(new File(pgmZip), mapPath);
                return pgmZip;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Log.d(TAG, "getMapPgmFilePath: path:" + mapPgmPath);
        return mapPgmPath;
    }

    public static String getFileMD5(File file) throws IOException {
        if (!file.isFile()) {
            return null;
        } else {
            MessageDigest digest = null;
            FileInputStream in = null;
            byte[] buffer = new byte[1024];

            Object var6;
            try {
                digest = MessageDigest.getInstance("MD5");
                in = new FileInputStream(file);

                int len;
                while((len = in.read(buffer, 0, 1024)) != -1) {
                    digest.update(buffer, 0, len);
                }

                return toHexString(digest.digest());
            } catch (Exception var10) {
                var6 = null;
            } finally {
                if (null != in) {
                    in.close();
                }

            }

            return (String)var6;
        }
    }

    private static String toHexString(byte[] bytes) {
        if (bytes != null && bytes.length >= 1) {
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02X", b));
            }
            return sb.toString();
        } else {
            return null;
        }
    }

    private static void unZipFile(File zipFile, String folderPath)
            throws IOException {
        File desDir = new File(folderPath);
        if (!desDir.exists()) {
            desDir.mkdirs();
        }
        ZipFile zf = null;
        try {
            zf = new ZipFile(zipFile, Charset.forName("GBK"));
            for (Enumeration<?> entries = zf.entries(); entries.hasMoreElements(); ) {
                InputStream in = null;
                OutputStream out = null;
                try {
                    ZipEntry entry = ((ZipEntry) entries.nextElement());
                    in = zf.getInputStream(entry);
                    String str = folderPath + File.separator + entry.getName();
                    Log.d(TAG, "unZipFile: entry name: " + str);
                    File desFile = new File(str);
                    if (!desFile.exists()) {
                        File fileParentDir = desFile.getParentFile();
                        if (!fileParentDir.exists()) {
                            fileParentDir.mkdirs();
                        }
                        desFile.createNewFile();
                    }
                    out = new FileOutputStream(desFile);
                    byte buffer[] = new byte[ZIP_BUFF_SIZE];
                    int realLength;
                    while ((realLength = in.read(buffer)) > 0) {
                        out.write(buffer, 0, realLength);
                    }
                } finally {
                    IOUtils.close(in);
                    IOUtils.close(out);
                }
            }
        } finally {
            IOUtils.close(zf);
        }
    }
}


