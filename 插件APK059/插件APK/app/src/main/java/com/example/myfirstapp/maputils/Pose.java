package com.example.myfirstapp.maputils;


import org.json.JSONException;
import org.json.JSONObject;

public class Pose {
    private float px;
    private float py;
    private float theta;
    private final long time = System.currentTimeMillis();
    private String name;
    private int status;
    private float distance;

    public Pose() {
    }

    public float getX() {
        return this.px;
    }

    public float getY() {
        return this.py;
    }

    public float getTheta() {
        return this.theta;
    }

    public long getTime() {
        return this.time;
    }

    public void setX(float x) {
        this.px = x;
    }

    public void setY(float y) {
        this.py = y;
    }

    public void setTheta(float theta) {
        this.theta = theta;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public float getDistance() {
        return this.distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public String toString() {
        return "x=" + this.px + "  y=" + this.py + " theta=" + this.theta + " name=" + this.name;
    }

    public boolean equals(Object obj) {
        if (!(obj instanceof Pose)) {
            return false;
        } else {
            Pose pose = (Pose)obj;
            return this.px == pose.getX() && this.py == pose.getY() && this.theta == pose.getTheta();
        }
    }

    public int hashCode() {
        int code = 0;
        code = code + 31 * Float.valueOf(this.px).hashCode() * 10;
        code += 31 * Float.valueOf(this.py).hashCode() * 100;
        code += 31 * Float.valueOf(this.theta).hashCode() * 1000;
        return code;
    }

    public double getDistance(Pose pose) {
        if (pose == null) {
            return 1.7976931348623157E308D;
        } else {
            double destX = (double)this.getX();
            double destY = (double)this.getY();
            double x = (double)pose.getX();
            double y = (double)pose.getY();
            return Math.sqrt(Math.pow(x - destX, 2.0D) + Math.pow(y - destY, 2.0D));
        }
    }

    public String toJson() {
        return this.toJsonObject().toString();
    }

    public JSONObject toJsonObject() {
        JSONObject object = new JSONObject();

        try {
            object.put("px", (double)this.px);
            object.put("py", (double)this.py);
            object.put("theta", (double)this.theta);
            object.put("name", this.name);
        } catch (JSONException var3) {
            var3.printStackTrace();
        }

        return object;
    }
}
