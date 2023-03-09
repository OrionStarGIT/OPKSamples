package com.example.myfirstapp.maputils;

import android.content.Context;

public class ProductUtils {

    private static final String TAG = ProductUtils.class.getSimpleName();
    //private static final String mProductModel = RobotSettings.getProductModel();

    /**
     * 是否是递送（招财豹）机器人
     */
    public static boolean isDeliveryProductModel() {
        //return ProductInfo.isDeliveryProduct();
        return true;
    }


    public static int getNavigatorPointStringId(Constant.NavigatorPoint navigatorPoint) {
//        switch (navigatorPoint) {
//            case POINT1:
//                if (isDeliveryProductModel()) {
//                    return R.string.stand_by_spot;
//                }
//                return R.string.reception_point;
//            case POINT2:
//                if (isDeliveryProductModel()) {
//                    return R.string.positioning_spot;
//                }
//                return RobotApi.getInstance().isChargePileExits()
//                        ? R.string.positioning_spot : R.string.charging_pole;
//            default:
//                return 0;
//        }
        return 0;

    }

    public static String getPointUnchangeableText(Constant.NavigatorPoint navigatorPoint) {
        switch (navigatorPoint) {
            case POINT1:
                if (isDeliveryProductModel()) {
                    return UnchangeableString.STAND_BY_SPOT;
                }
                return UnchangeableString.RECEPTION_POINT;
            case POINT2:
                if (isDeliveryProductModel()) {
                    return UnchangeableString.POSITIONING_SPOT;
                }
                return Definition.START_CHARGE_PILE_POSE;
            default:
                return "";
        }

    }

    public static String setNavigatorPointText(Context context,
                                               Constant.NavigatorPoint navigatorPoint,
                                               String text) {
        return String.format(text, context.getResources()
                .getString(getNavigatorPointStringId(navigatorPoint)));
    }

}
