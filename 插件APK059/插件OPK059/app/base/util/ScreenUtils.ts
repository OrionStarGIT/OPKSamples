import {
    AppManager
} from 'orionos-eve-core';
import { Dimensions } from 'react-native';

const getScreenWidth = () => Dimensions.get('screen').width;
const getScreenHeight = () => Dimensions.get('screen').height;

const TAG = 'ScreenUtils';

export class ScreenUtils {

    public static readonly SCREEN_QUERY_LOCATION = 'QueryLocationScreen';
    public static readonly SCREEN_NAVIGATION_LEADING = 'NavigationLeadingScreen';
    public static readonly SCREEN_NAVIGATION_RETURN_START_POINT = 'NavigationReturnStartPointScreen';
    public static readonly SCREEN_NAVIGATION_ARRIVED = 'NavigationArrivedScreen';
    public static readonly SCREEN_SETTINGS = 'SettingsScreen'; //设置页面


    public static reportScreenId(screenId: string): void {
        let appid = ScreenUtils.getCurAppId();
        let versionName = ScreenUtils.getCurAppVersion();
        console.log(TAG,' appid: ' + appid + 'versionName: ' + versionName + ' screenId: ' + screenId);
        AppManager.setAppInfo(appid, screenId, '', versionName);
    }

    public static getCurAppId(): string {
        let jsonStr = AppManager.getAppJson();
        let jsonObject = JSON.parse(jsonStr);
        console.log(TAG,' appJson: ' + JSON.stringify(jsonObject));
        return jsonObject.appid;
    }

    public static getCurAppVersion(): string {
        let jsonStr = AppManager.getAppJson();
        let jsonObject = JSON.parse(jsonStr);
        console.log(TAG,' appJson: ' + JSON.stringify(jsonObject));
        return jsonObject.versionName;
    }

    /**
     * 是否横屏
     * @returns
     */
    public static isLandScape(): boolean {

        let rate = getScreenWidth()/getScreenHeight();

        if(rate > 1){
            return true;
        }else{
            return false;
        }

    }

}