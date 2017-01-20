package com.shudu.chaoshi.util;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Created by yshr on 17/1/12.
 */

public class SerializableHashMap implements Serializable {
    private HashMap<String,byte[]> map;

    public HashMap<String, byte[]> getMap() {
        return map;
    }

    public void setMap(HashMap<String, byte[]> map) {
        this.map = map;
    }
}
