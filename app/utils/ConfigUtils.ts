/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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