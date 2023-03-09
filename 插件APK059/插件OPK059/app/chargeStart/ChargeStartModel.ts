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

import { action, observable } from 'mobx';
import { ChargeStartParam } from 'orionos-eve-core';

export class ChargeStartModel {

    /**
     * 去充电参数
     */
    private readonly mChargeStartParam: ChargeStartParam;


    //是否执行
    @observable private mIsRunning: boolean = false;

    //执行结果
    @observable private mResultText: string = '';


    /**
     * 构造函数
     */
    public constructor() {
        this.mChargeStartParam = new ChargeStartParam();
    }

    /**
     * 开始去充电
     */
    @action
    public startChargeStart(): void {
        this.mChargeStartParam.chargeTimeout = 180000;
        this.mChargeStartParam.avoidDistance = 0.1;
        this.mChargeStartParam.avoidTimeout = 20000;
        this.mChargeStartParam.multiWaitTimeout = 300000;
        this.mIsRunning = true;
    }

    /**
     * 结束执行
     */
    @action
    public finishRunning(): void {
        this.mIsRunning = false;
    }

    /**
     * 获取参数
     */
    public getParam(): ChargeStartParam {
        return this.mChargeStartParam;
    }

    /**
     * 是否执行
     */
    public isRunning(): boolean {
        return this.mIsRunning;
    }

    /**
     * 设置执行结果
     * @param text-结果
     */
    @action
    public appendResultText(text: string): void {
        this.mResultText += '\n' + text;
    }

    /**
     * 获取执行结果
     */
    public getResultText(): string {
        return this.mResultText;
    }
}