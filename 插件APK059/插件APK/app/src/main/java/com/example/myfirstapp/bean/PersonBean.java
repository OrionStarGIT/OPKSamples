package com.example.myfirstapp.bean;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class PersonBean {

    @SerializedName("age")
    private int age;
    @SerializedName("angle")
    private int angle;
    @SerializedName("angleInView")
    private double angleInView;
    @SerializedName("avatar_url")
    private String avatarUrl;
    @SerializedName("bodyX")
    private int bodyX;
    @SerializedName("bodyY")
    private int bodyY;
    @SerializedName("bodyheight")
    private int bodyheight;
    @SerializedName("bodywidth")
    private int bodywidth;
    @SerializedName("distance")
    private double distance;
    @SerializedName("faceAngleX")
    private double faceAngleX;
    @SerializedName("faceAngleY")
    private double faceAngleY;
    @SerializedName("faceRegisterTime")
    private String faceRegisterTime;
    @SerializedName("faceX")
    private int faceX;
    @SerializedName("faceY")
    private int faceY;
    @SerializedName("faceheight")
    private int faceheight;
    @SerializedName("facewidth")
    private int facewidth;
    @SerializedName("fake_face")
    private boolean fakeFace;
    @SerializedName("gender")
    private String gender;
    @SerializedName("glasses")
    private int glasses;
    @SerializedName("headSpeed")
    private int headSpeed;
    @SerializedName("id")
    private int id;
    @SerializedName("isNewUser")
    private boolean isNewUser;
    @SerializedName("isStaff")
    private boolean isStaff;
    @SerializedName("latency")
    private int latency;
    @SerializedName("mWelcomeActions")
    private List<MWelcomeActionsBean> mWelcomeActions;
    @SerializedName("mouthmove_score")
    private double mouthmoveScore;
    @SerializedName("mouthstate")
    private int mouthstate;
    @SerializedName("name")
    private String name;
    @SerializedName("other_face")
    private boolean otherFace;
    @SerializedName("quality")
    private String quality;
    @SerializedName("remoteFaceId")
    private String remoteFaceId;
    @SerializedName("remoteReqId")
    private String remoteReqId;
    @SerializedName("remoteWakeupId")
    private String remoteWakeupId;
    @SerializedName("role")
    private String role;
    @SerializedName("role_id")
    private int roleId;
    @SerializedName("staff_dept")
    private String staffDept;
    @SerializedName("staff_job")
    private String staffJob;
    @SerializedName("staff_mobile")
    private String staffMobile;
    @SerializedName("timestamp")
    private Long timestamp;
    @SerializedName("ukfBodyOmega")
    private double ukfBodyOmega;
    @SerializedName("ukfBodyVel")
    private double ukfBodyVel;
    @SerializedName("userId")
    private String userId;
    @SerializedName("with_body")
    private boolean withBody;
    @SerializedName("with_face")
    private boolean withFace;

    public static class MWelcomeActionsBean {
        @SerializedName("action")
        private String action;
        @SerializedName("isConfirm")
        private int isConfirm;
        @SerializedName("recommend")
        private String recommend;
        @SerializedName("value")
        private String value;
    }

    public String getName() {
        return name;
    }

    public double getDistance() {
        return distance;
    }
}
