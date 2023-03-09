package com.example.myfirstapp.maputils;

import com.example.myfirstapp.maputils.Pose;
import com.example.myfirstapp.maputils.Pose2d;

public class PoseBean {
    private String name;
    private Pose2d pose;

    public PoseBean() {
    }

    public PoseBean(Pose pose) {
        this.name = pose.getName();
        this.pose = new Pose2d(Float.valueOf(pose.getX()).doubleValue(),
                Float.valueOf(pose.getY()).doubleValue(),
                Float.valueOf(pose.getTheta()).doubleValue());
    }

    public PoseBean(String name, Pose2d pose) {
        this.name = name;
        this.pose = pose;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Pose2d getPose() {
        return pose;
    }

    public void setPose(Pose2d pose) {
        this.pose = pose;
    }

    @Override
    public String toString() {
        return "name = " + name + ", Pose2d = " + pose.toString();
    }
}
