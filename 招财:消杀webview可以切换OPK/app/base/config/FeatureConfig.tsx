/*
 * Copyright (C) 2017 OrionStar Technology Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SettingsUtil, AppManager, AndroidSettings } from 'orionos-eve-core';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { Log } from "../log/Log";

const DEFAULT = 'defValue';
const ENABLED = '1';
const TAG = 'FeatureConfig';
const DEFAULT_PASSWORD = '0000';

export class FeatureConfig {

    /**
     * 充电闲聊
     */
    private static readonly SETTINGS_CHARGING_CHAT = 'robot_usable_when_charging';

    /**
     * 原地服务
     */
    private static readonly SETTINGS_IN_SITU = 'robot_setting_situ_service_status';

    /**
     * 静默回复
     */
    private static readonly ROBOT_CHAT_REPLY = 'robot_chat_reply';

    /**
     * lite首页
     */
    private static readonly SETTINGS_LITE = 'switch_lite_home';

    private static readonly SETTINGS_GLOBAL_SHOW_AD = 'robot_show_ad';
    private static readonly SETTINGS_TRICK = 'robot_samll_action';
    private static readonly SETTINGS_PRE_WAKEUP = 'need_say_hello';
    private static readonly SETTINGS_WELCOME_BACK = 'robot_auto_back_reception';
    private static readonly SETTINGS_ADS_AND_ROTATE = 'robot_show_ad_and_rotate';
    private static readonly SETTINGS_CM_DOOR = 'switch_allow_open_cm_bluetooth_door';
    private static readonly SETTINGS_GUIDE_CHAT = 'switch_allow_chat_when_interpret';
    /**
     * navigation param
     */
    private static readonly ROBOT_SETTING_DEFAULT_LINEAR_SPEED = 0.7;
    private static readonly ROBOT_SETTING_DEFAULT_GREET_LINEAR_SPEED = 0.3;
    private static readonly ROBOT_SETTING_DEFAULT_ANGULAR_SPEED = 1.2;

    public static readonly ROBOT_SETTING_NAV_LINEAR_SPEED = 'robot_setting_nav_linear_speed';
    public static readonly CONFIG_NAV_SPEED = 'nav_speed';
    public static readonly ROBOT_SETTING_NAV_ANGULAR_SPEED = 'robot_setting_nav_angular_speed';
    public static readonly ROBOT_SETTING_LEAD_LINEAR_SPEED = 'robot_setting_lead_linear_speed';
    public static readonly ROBOT_SETTING_LEAD_ANGULAR_SPEED = 'robot_setting_lead_angular_speed';
    public static readonly ROBOT_SETTING_GUIDE_LINEAR_SPEED = 'robot_setting_guide_linear_speed';
    public static readonly ROBOT_SETTING_GUIDE_ANGULAR_SPEED = 'robot_setting_guide_angular_speed';

    /**
     * cruise linear speed
     */
    public static readonly ROBOT_SETTING_CRUISE_LINEAR_SPEED = 'robot_setting_cruise_linear_speed';

    /**
     * cruise angular speed
     */
    public static readonly ROBOT_SETTING_CRUISE_ANGULAR_SPEED = 'robot_setting_cruise_angular_speed';


    public static readonly ROBOT_SETTING_GREET_LINEAR_SPEED = 'robot_setting_greet_linear_speed';
    public static readonly ROBOT_SETTING_GREET_ANGULAR_SPEED = 'robot_setting_greet_angular_speed';
    /**
     * go back interval
     */
    private static readonly ROBOT_SETTING_WAITING_TIME = 'robot_setting_waiting_time';

    private static readonly TIMEOUT_GO_RECEPTION_POINT = 2 * 60;

    /**
     * demo mode 演示模式
     */
    public static readonly ROBOT_SETTING_DEMO_MODE = 'robot_setting_demo_mode';

    /**
     * module app 版本号
     */
    public static readonly VERSION_MODULE_APP = 'version_module_app';
    /**
     * origin star os version
     */
    private static readonly PROPERTY_ORIONSTAR_VERSION = 'ro.product.orionstaros';

    /**
     * origin star name
     */
    private static readonly CORP_NAME = 'corp_name';

    /**
     * 引领中等人
     */
    private static readonly GUIDE_WAIT = 'guide_wait';

    /**
     * Settings 口罩检测开关
     */
    public static readonly ROBOT_MASK_DETECTION = 'robot_mask_detection';

    public static readonly CONFIG_ENABLE_AUTO_BACK_RECEPTION = 'enable_auto_back_reception';
    public static readonly CONFIG_BACK_RECEPTION_WAITING_TIME = 'back_reception_waiting_time';
    public static readonly CONFIG_ENABLE_FOCUS_FOLLOW = 'enable_focus_follow';
    public static readonly CONFIG_FOCUS_FOLLOW_STYLE = 'focus_follow_style';
    public static readonly CONFIG_ENABLE_SMALL_ACTION = 'enable_small_action';
    public static readonly CONFIG_ENABLE_CHAT_REPLAY = 'enable_chat_replay';
    public static readonly CONFIG_ENABLE_MASK_DETECTION = 'enable_mask_detection';
    public static readonly CONFIG_GREET_SPEED = 'greet_speed';
    public static readonly CONFIG_HOME_INVALID_TIME = 'home_page_invalid_time';

    public static readonly ROBOT_SETTINGS_BMS_WARNING_STATUS = "robot_setting_bms_warning_status";

    public static readonly GLOBAL_MEAL_DELIVERY_THREE_FLOORS = 'robot_meal_delivery_three_floors';

    private static readonly SETTINGS_TASK_MODE = 'robot_setting_task_mode';

    public static readonly SETTINGS_PASSWORD = 'robot_meal_setting_password';

    //休眠时长
    public static readonly ROBOT_SETTING_STANDBY_TIME = 'robot_meal_setting_standby_time';

    public static readonly GLOBAL_MEAL_DELIVERY_LAYERS = 'robot_meal_setting_layers';

    public static readonly DEFAULT_LAYERS = 3;


    /**
     * 需要监听设置项变化的Settings
     */
    private static keys = [FeatureConfig.SETTINGS_CHARGING_CHAT
        , FeatureConfig.SETTINGS_IN_SITU
        , FeatureConfig.SETTINGS_GLOBAL_SHOW_AD
        , FeatureConfig.ROBOT_CHAT_REPLY
        , FeatureConfig.SETTINGS_WELCOME_BACK
        , FeatureConfig.SETTINGS_PRE_WAKEUP
        , FeatureConfig.SETTINGS_TRICK
        , FeatureConfig.SETTINGS_ADS_AND_ROTATE
        , FeatureConfig.SETTINGS_GUIDE_CHAT
        , FeatureConfig.ROBOT_SETTING_NAV_ANGULAR_SPEED
        , FeatureConfig.ROBOT_SETTING_NAV_LINEAR_SPEED
        , FeatureConfig.ROBOT_SETTING_WAITING_TIME
        , FeatureConfig.ROBOT_SETTING_LEAD_ANGULAR_SPEED
        , FeatureConfig.ROBOT_SETTING_LEAD_LINEAR_SPEED
        , FeatureConfig.ROBOT_SETTING_CRUISE_LINEAR_SPEED
        , FeatureConfig.ROBOT_SETTING_CRUISE_ANGULAR_SPEED
        , FeatureConfig.ROBOT_SETTING_GUIDE_LINEAR_SPEED
        , FeatureConfig.ROBOT_SETTING_GUIDE_ANGULAR_SPEED
        , FeatureConfig.ROBOT_SETTING_GREET_LINEAR_SPEED
        , FeatureConfig.ROBOT_SETTING_GREET_ANGULAR_SPEED
        , FeatureConfig.ROBOT_SETTING_DEMO_MODE
        , FeatureConfig.VERSION_MODULE_APP
        , FeatureConfig.GUIDE_WAIT
        , FeatureConfig.ROBOT_MASK_DETECTION
        , FeatureConfig.ROBOT_SETTINGS_BMS_WARNING_STATUS
        , FeatureConfig.SETTINGS_PASSWORD
        , FeatureConfig.GLOBAL_MEAL_DELIVERY_LAYERS
    ];

    /**
     * getSystemProperties
     */
    private static propertiesKeys = [
        FeatureConfig.PROPERTY_ORIONSTAR_VERSION
    ];

    private static globalKeys = [
        FeatureConfig.GLOBAL_MEAL_DELIVERY_THREE_FLOORS
    ];

    private static settingsSubscription: EmitterSubscription;
    private static mSettings: Map<string, any> = new Map<string, any>();
    private static mPropertiesSettings: Map<string, any> = new Map<string, any>();
    private static mConfig: Map<string, any> = new Map<string, any>();
    private static mSettingsListener: Map<string, any> = new Map();
    private static mGlobalSettings: Map<string, any> = new Map<string, any>();
    private static robotSettingsSubscription: EmitterSubscription;

    private static onSettingsChange(key: string, value: string) {
        Log.d(TAG, 'On settings change, key : ' + key + '   value : ' + value);
        this.mSettings.set(key, value);
    }


    /**
     * 是否启用广告功能
     *
     * 默认不启用
     */
    public static isAdsEnable(): boolean {
        let value = this.mSettings.get(this.SETTINGS_GLOBAL_SHOW_AD);
        return value == ENABLED;
    }

    /**
     * 播放广告时是否允许做小动作
     */
    public static isAdsTrickEnable(): boolean {
        let value = this.mSettings.get(this.SETTINGS_ADS_AND_ROTATE);
        return value == ENABLED;
    }

    /**
     * 是否启用预唤醒
     */
    public static async isPreWakeupEnable(): Promise<boolean> {
        let value = this.mSettings.get(this.SETTINGS_PRE_WAKEUP);
        return value == ENABLED;
    }

    /**
     * 是否启用小动作
     */
    public static isTrickEnable(): boolean {
        let value;
        if (this.mConfig.has(this.CONFIG_ENABLE_SMALL_ACTION)) {
            value = this.mConfig.get(this.CONFIG_ENABLE_SMALL_ACTION);
            Log.d(TAG, 'get trick enable from config', value);
        } else {
            value = this.mSettings.get(this.SETTINGS_TRICK);
        }
        return value == ENABLED || value == DEFAULT;
    }

    /**
     * 是否允许自动返回接待点
     */
    public static async isOpenBackReceptionPoint(): Promise<boolean> {
        let value;
        if (this.mConfig.has(this.CONFIG_ENABLE_AUTO_BACK_RECEPTION)) {
            value = this.mConfig.get(this.CONFIG_ENABLE_AUTO_BACK_RECEPTION);
            Log.d(TAG, 'get back reception from config', value);
        } else {
            value = await SettingsUtil.getString(this.SETTINGS_WELCOME_BACK);
        }
        return value === ENABLED;
    }

    /**
     * 导航线速度
     * @returns {number}
     */
    public static getNavLinearSpeed(): number {
        let value;
        if (this.mConfig.has(this.CONFIG_NAV_SPEED)) {
            value = this.mConfig.get(this.CONFIG_NAV_SPEED);
            Log.d(TAG, 'get nav speed from config', value);
        } else {
            value = this.mSettings.get(this.ROBOT_SETTING_NAV_LINEAR_SPEED);
        }
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_LINEAR_SPEED :
            Number.parseFloat(value);
    }

    /**
     * 导航角速度
     * @returns {number}
     */
    public static getNavAngularSpeed(): number {
        let value = this.mSettings.get(this.ROBOT_SETTING_NAV_ANGULAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_ANGULAR_SPEED :
            Number.parseFloat(value);
    }

    /**
     * 引领线速度
     * @returns {number}
     */
    public static getLeadingLinearSpeed(): number {
        let value = this.mSettings.get(this.ROBOT_SETTING_LEAD_LINEAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_LINEAR_SPEED :
            Number.parseFloat(value);
    }

    /**
     * 引领角速度
     * @returns {number}
     */
    public static getLeadingAngularSpeed(): number {
        let value = this.mSettings.get(this.ROBOT_SETTING_LEAD_ANGULAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_ANGULAR_SPEED :
            Number.parseFloat(value);
    }

    /**
     * 招揽线速度
     * @returns {number}
     */
    public static getGreetLinearSpeed(): string {
        let value;
        if (this.mConfig.has(this.CONFIG_GREET_SPEED)) {
            value = this.mConfig.get(this.CONFIG_GREET_SPEED);
            Log.d(TAG, 'get modal speed from config', value);
        } else {
            value = this.mSettings.get(this.ROBOT_SETTING_GREET_LINEAR_SPEED);
        }
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_LINEAR_SPEED : value;
    }

    /**
     * 招揽线速度
     * @returns {number}
     */
    public static getGreetAngularSpeed(): string {
        let value = this.mSettings.get(this.ROBOT_SETTING_GREET_ANGULAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_ANGULAR_SPEED : value;
    }

    /**
     * 导航线速度
     * @returns {number}
     */
    public static getNavLinearSpeedStr(): string {
        let value = this.mSettings.get(this.ROBOT_SETTING_NAV_LINEAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_LINEAR_SPEED : value;
    }

    /**
     * 导航角速度
     * @returns {number}
     */
    public static getNavAngularSpeedStr(): string {
        let value = this.mSettings.get(this.ROBOT_SETTING_NAV_ANGULAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_ANGULAR_SPEED : value;
    }

    /**
     * 是否支持充电闲聊
     *
     * 默认支持
     */
    public static isAllowChargingChat(): boolean {
        let value = this.mSettings.get(this.SETTINGS_CHARGING_CHAT);
        return value == ENABLED || value == DEFAULT;
    }

    public static async getAllowChargingChat() {
        await this.loadSettings(this.SETTINGS_CHARGING_CHAT);
        return this.isAllowChargingChat();
    }

    public static setLocalPassword(value: string){
        this.mSettings.set(this.SETTINGS_PASSWORD, value);
    }

    /**
     * 获取底层密码
     */
    public static getSettingPassword(): string {
        let value = this.mSettings.get(this.SETTINGS_PASSWORD);
        Log.d(TAG, 'getSettingPassword value =' + value);
        return value === DEFAULT_PASSWORD || value === '' ? DEFAULT_PASSWORD : value;
    }

    /**
     * 送餐打开设置的密码
     * 默认0000
     */
    public static setPassword(value: string) {
        Log.d(TAG, 'setPassword::  value : ' + value);
        this.mSettings.set(this.SETTINGS_PASSWORD, value);
        AndroidSettings.putString(this.SETTINGS_PASSWORD,value);
    }

    /**
   * 是否有充电缓慢的监听
   *
   * 默认支持
   */
    public static isChargeSlow(): boolean {
        let value = this.mSettings.get(this.ROBOT_SETTINGS_BMS_WARNING_STATUS);
        return value == '2';
    }

    public static async getChargeSlow() {
        await this.loadSettings(this.ROBOT_SETTINGS_BMS_WARNING_STATUS);
        return this.isChargeSlow();
    }

    public static setRobotSettingListener(key: string, listener: any) {
        if(!this.mSettingsListener.has(key)){
            this.mSettingsListener.set(key, listener);
        }else { 
            Log.d(TAG,"already exist " + key);
        }
    }

    private static updateSettingsListener() {
        for (let [key, value] of this.mSettingsListener) {
            switch (key) {
                case this.ROBOT_SETTINGS_BMS_WARNING_STATUS:
                    if(value){
                        value(this.isChargeSlow());
                    }
                    break
            }
        }
    }

    /**
     * 原地服务是否开启
     */
    public static isInSituService(): boolean {
        let value = this.mSettings.get(this.SETTINGS_IN_SITU);
        return value == ENABLED;
    }

    public static async isOpenInSituService(): Promise<boolean> {
        let value = await SettingsUtil.getString(this.SETTINGS_IN_SITU);
        return value === ENABLED;
    }

    /**
     * 是否允许静默回复
     */
    public static isAllowReply(): boolean {
        let value;
        if (this.mConfig.has(this.CONFIG_ENABLE_CHAT_REPLAY)) {
            value = this.mConfig.get(this.CONFIG_ENABLE_CHAT_REPLAY);
            Log.d(TAG, 'get allow reply from config', value);
        } else {
            value = this.mSettings.get(this.ROBOT_CHAT_REPLY);
        }
        return value == ENABLED || value == DEFAULT;
    }

    /**
     * 是否lite首页
     */
    public static isLiteHome(): boolean {
        let value = this.mSettings.get(this.SETTINGS_LITE);
        return value == ENABLED;
    }

    /**
     * 加载所有Setting配置
     */
    public static load() {
        this.keys.forEach(item => {
            this.loadSettings(item);
        });
        this.propertiesKeys.forEach(items => {
            this.loadPropertiesSettings(items);
        });
        this.loadServiceConfig();
        //@ts-ignored
        this.loadCorpName();
    }

    public static async loadCorpName(){
        let value = await AndroidSettings.getString(this.CORP_NAME);
        if (value == null) {
            value = DEFAULT;
        }
        Log.d(TAG, 'Load settings, key : ' + this.CORP_NAME + '  ' + value);
        this.mPropertiesSettings.set(this.CORP_NAME, value);
    }

    private static async loadSettings(key: string) {
        let value = await SettingsUtil.getString(key);
        if (value == null) {
            value = DEFAULT;
        }
        Log.d(TAG, 'Load settings, key : ' + key + '  ' + value);
        this.mSettings.set(key, value);
    }

    public static loadGlobal() {
        this.globalKeys.forEach(item => {
            this.loadGlobalSettings(item);
        });
    }

    public static addGlobalSettingsListener() {
        AndroidSettings.addSettingsListener(this.globalKeys);
        this.robotSettingsSubscription = DeviceEventEmitter.addListener('_android_settings_', (data: any) => {
            FeatureConfig.loadGlobalSettings(data);
        });
    }

    private static async loadGlobalSettings(item: string) {
        Log.d(TAG, 'Load global settings, key : ' + item);
        let value = await AndroidSettings.getString(item);
        if (value == null) {
            value = DEFAULT;
        }
        Log.d(TAG, 'Load global settings, value : ' + value);
        this.mGlobalSettings.set(item, value);
    }

    private static async loadPropertiesSettings(item: string) {
        let value = await SettingsUtil.getSystemProperties(item);
        if (value == null) {
            value = DEFAULT;
        }
        Log.d(TAG, 'load properties settings key ', item, ' ', value);
        this.mPropertiesSettings.set(item, value);
    }

    /**
     * 获取返回接待点间隔时间
     */
    public static async getBackReceptionIntervalTime(): Promise<number> {
        let value;
        if (this.mConfig.has(this.CONFIG_BACK_RECEPTION_WAITING_TIME)) {
            value = this.mConfig.get(this.CONFIG_BACK_RECEPTION_WAITING_TIME);
            Log.d(TAG, 'get back reception time from config', value);
        } else {
            value = await SettingsUtil.getString(this.ROBOT_SETTING_WAITING_TIME);
        }
        Log.d(TAG, 'getBackReceptionIntervalTime value=' + value);
        return (value === undefined || value === null) ? this.TIMEOUT_GO_RECEPTION_POINT * 1000 : value * 1000;
    }

    public static getHomeInvalidTime(): number {
        let value;
        if (this.mConfig.has(this.CONFIG_HOME_INVALID_TIME)) {
            value = this.mConfig.get(this.CONFIG_HOME_INVALID_TIME) - 2;
            if (value < 5) {
                value = 5;
            }
            Log.d(TAG, 'get home invalid time from config: ', value);
        } else {
            value = 5;
            Log.d(TAG, 'get default home invalid time: ', value);
        }
        return value * 1000;
    }



    /**
     *  注册Settings变化监听
     */
    public static addSettingsListener() {
        SettingsUtil.addSettingsListener(this.keys);
        this.settingsSubscription = DeviceEventEmitter.addListener('_settings_', (data: any) => {
            FeatureConfig.loadSettings(data);
            this.updateSettingsListener();
        });
    }

    /**
     * 清除Settings监听
     */
    public static clearSettingsListener() {
        SettingsUtil.clearSettingsListener();
        if (this.settingsSubscription) {
            this.settingsSubscription.remove();
        }
        if (this.robotSettingsSubscription) {
            this.robotSettingsSubscription.remove();
        }
    }

    /**
     * 巡逻导航线速度
     * @returns {number}
     */
    public static getCruiseLinearSpeed(): string {
        let value = this.mSettings.get(this.ROBOT_SETTING_CRUISE_LINEAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_LINEAR_SPEED : value;
    }

    /**
     * 巡逻导航角速度
     * @returns {number}
     */
    public static getCruiseAngularSpeed(): string {
        let value = this.mSettings.get(this.ROBOT_SETTING_CRUISE_ANGULAR_SPEED);
        Log.d('CruiseViewModel', 'getCruiseAngularSpeed', value);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_ANGULAR_SPEED : value;
    }

    public static getGuideLinearSpeed(): string {
        let value = this.mSettings.get(this.ROBOT_SETTING_GUIDE_LINEAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_LINEAR_SPEED : value;
    }

    public static getGuideAngularSpeed(): string {
        let value = this.mSettings.get(this.ROBOT_SETTING_GUIDE_ANGULAR_SPEED);
        return value === DEFAULT ? this.ROBOT_SETTING_DEFAULT_ANGULAR_SPEED : value;
    }

    /**
     * 导览中闲聊开关
     */
    public static getAllowGuideChat(): boolean {
        let value = this.mSettings.get(this.SETTINGS_GUIDE_CHAT);
        return value == ENABLED || value == DEFAULT;
    }

    /**
     * 是否开启 演示模式
     * 默认不启用
     */
    public static isDemoModeEnable(): boolean {
        let value = this.mSettings.get(this.ROBOT_SETTING_DEMO_MODE);
        return value === ENABLED;
    }

    public static getVersionModuleApp(): string {
        let value = this.mSettings.get(this.VERSION_MODULE_APP);
        return value;
    }

    public static getOriginStarOSVersion(): string {
        let value = this.mPropertiesSettings.get(this.PROPERTY_ORIONSTAR_VERSION);
        return value;
    }

    public static getCorpName(): string {
        let value = this.mPropertiesSettings.get(this.CORP_NAME);
        return value;
    }

    public static isGuideWait(): boolean {
        let value = this.mSettings.get(this.GUIDE_WAIT);
        return value != 0;
    }

    /**
     * 是否开启 演示模式
     * 默认不启用
     *
     */
    public static isMaskDetectionEnable(): boolean {
        let value;
        if (this.mConfig.has(this.CONFIG_ENABLE_MASK_DETECTION)) {
            value = this.mConfig.get(this.CONFIG_ENABLE_MASK_DETECTION);
            Log.d(TAG, 'get mask detect from config', value);
        } else {
            value = this.mSettings.get(this.ROBOT_MASK_DETECTION);
        }
        return value === ENABLED;
    }

    public static setTaskMode(takeMode: string): Promise<boolean> {
        return AndroidSettings.putString(FeatureConfig.SETTINGS_TASK_MODE, takeMode);
    }

    public static loadServiceConfig(): void {
        try {
            let config = AppManager.getAppConfig();
            let configJson = JSON.parse(config);
            Log.d(TAG, 'server config', configJson);
            let dataJson = JSON.parse(configJson.cfg_data);
            let global = dataJson.global;
            let robot = dataJson.robot;
            if (global) {
                for (let key in global) {
                    this.mConfig.set(key, global[key].toString());
                }
            }
            if (robot) {
                for (let key in robot) {
                    this.mConfig.set(key, robot[key].toString());
                }
            }
            Log.d(TAG, 'config data size', this.mConfig.size);
        } catch (e) {
            Log.d(TAG, 'get server config error');
        }
    }

    public static getIsSupportThreeFloors(): boolean {
        Log.d(TAG, 'getIsSupportThreeFloors');
        let value = this.mGlobalSettings.get(this.GLOBAL_MEAL_DELIVERY_THREE_FLOORS);
        Log.d(TAG, 'getIsSupportThreeFloors::  value : ' + value);
        if (!value) {
            return false;
        }
        value = Number(value);
        return value === 1;
    }

    public static getLayers(): number {
        let value = this.mSettings.get(this.GLOBAL_MEAL_DELIVERY_LAYERS);
        if (!value) {
            return this.DEFAULT_LAYERS;
        }
        return Number(value);
    }
}
