import { AppManager } from 'orionos-eve-core';

/**
 * 解析服务器配置
 * 仅发布的应用能获取服务器配置
 */
export class ConfigUtils {

    //服务器配置参数列表
    private static sConfig: Map<string, any> = new Map<string, any>();

    /**
     * 解析服务器配置参数
     */
    public static loadServiceConfig(): void {
        try {
            let config = AppManager.getAppConfig();
            let configJson = JSON.parse(config);
            let dataJson = JSON.parse(configJson.cfg_data);
            let global = dataJson.global;
            let robot = dataJson.robot;
            //全局配置
            if (global) {
                for (let key in global) {
                    this.sConfig.set(key, global[key].toString());
                }
            }
            //单机配置
            if (robot) {
                for (let key in robot) {
                    this.sConfig.set(key, robot[key].toString());
                }
            }
        } catch (e) {

        }
    }

    /**
     * 获取配置项值
     * @param key-配置项
     */
    public static getConfig(key: string): any {
        return this.sConfig.get(key);
    }
}