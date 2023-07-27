import { AppManager } from 'orionos-eve-core';
import { PlaceManager } from "./PlaceManager";
import I18n from "../../source/res/I18n";
import { Log } from "../../base/log/Log";
import { ReportUtil } from "../../report/ReportUtil";

export interface LeadingConfig {
    desk_point: string;
}

export enum Key {
    desk_point = 'desk_point',
}

const TAG = 'AsyncStorageManager';
export class AsyncStorageManager {

    //从云设置同步到本地的缓存
    private static sToLocalConfig?: LeadingConfig;
    private static mPoint: string;
    private static defaultPoint: string;
    private static defaultPointList = [
        I18n.standbyPoint,
        I18n.receptionPoint,
    ];

    public static async updateSettings(): Promise<any> {
        this.sToLocalConfig = this.parseToConfig(JSON.parse(AppManager.getAppConfig()));
        AppManager.setConfigUpdateListener((config: LeadingConfig) => {
            Log.d(TAG, 'update listener cfg_config=' + JSON.stringify(config));
            this.sToLocalConfig = this.parseToConfig(config);
            this.syncSettingsToLocal();
        });
        await PlaceManager.checkPoint(this.defaultPointList).then((point: string) => {
            this.defaultPoint = point;
            this.mPoint = this.defaultPoint;
            Log.d(TAG, `defaultPoint=${this.defaultPoint}`);
        });
        this.syncSettingsToLocal();
        Log.d(TAG, 'init complete');
    }

    //云端设置同步到本地
    public static syncSettingsToLocal(): void {
        let config = this.sToLocalConfig;
        Log.d(TAG, 'syncSettingsToLocal config=' + JSON.stringify(config));
        if (!config) {
            return;
        }

        if (config.desk_point) {
            let place = config.desk_point;
            ReportUtil.opkSettingsReport(Key.desk_point, config.desk_point);
            this.mPoint = place;
            PlaceManager.checkPoint([place]).catch(() => {
                this.setPointItem(this.defaultPoint);
            });
        }
        this.sToLocalConfig = undefined;
    }

    public static get point() {
        return this.mPoint;
    }

    public static setPointItem(value: string): void {
        this.mPoint = value;
        AppManager.setAppConfig(Key.desk_point, value);
        ReportUtil.opkSettingsReport(Key.desk_point, value);
    }

    private static parseToConfig(config: any): LeadingConfig | undefined {
        Log.d(TAG, 'cfg_config=' + JSON.stringify(config));
        let cConfig;
        try {
            let strCfData = config?.cfg_data;
            let cfData = JSON.parse(strCfData);
            cConfig = cfData?.robot;
        }catch (e) {
        }
        Log.d(TAG, 'parseToConfig=' + JSON.stringify(cConfig));
        return cConfig;
    }
}