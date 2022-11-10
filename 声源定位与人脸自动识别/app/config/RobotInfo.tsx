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

import { SettingsUtil } from 'orionos-eve-core';
import { observable } from 'mobx';

const TAG = 'RobotInfo';

export class RobotInfo {

    @observable private static charging = false;

    /**
     * 是否正在充电
     */
    public static get isCharging(): boolean {
        if (global.robotStatus) {
            return global.robotStatus.isCharging();
        }
        return this.charging;
    }

    public static set isCharging(charging: boolean) {
        console.log(TAG, 'Set charging : ' + charging);
        this.charging = charging;
    }

    private static updateChargingStatus() {
        try {
            SettingsUtil.isCharing().then((result: boolean) => {
                console.log(TAG, 'Get charging status : ' + result);
                RobotInfo.isCharging = result;
            });
        } catch (error) {
            console.log('This feature is not supported in the current version.');
        }
    }

    public static load() {
        this.updateChargingStatus();
    }
}

