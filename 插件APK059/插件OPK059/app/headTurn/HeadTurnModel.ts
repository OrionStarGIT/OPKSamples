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
import { HeadTurnMode, HeadTurnParam } from 'orionos-eve-core';

export class HeadTurnModel {
    
    /**
     * 运动参数
     */
    private readonly mHeadTurnParam: HeadTurnParam;

    //是否正在执行
    @observable private mIsRunning: boolean = false;

    //执行结果
    @observable private mResultText: string = '';

    //执行结果
    @observable private mHeadAction: string = '';

    //跳转OPK的trigger数
    @observable private triggerNumber: number = 36362226;

    /**
     * 构造函数
     */
    public constructor() {
        this.mHeadTurnParam = new HeadTurnParam();
    }

    /**
     * 抬头
     */
    @action
    public headUp(hMode: string, hAngle: number, vMode: string, vAngle: number): void {
        console.log("进入到了数据模型里面");
        this.mHeadTurnParam.horizontalMode = HeadTurnMode.relative;
        this.mHeadTurnParam.horizontalAngle = 0;
        this.mHeadTurnParam.horizontalMaxSpeed = 30;
        this.mHeadTurnParam.verticalMode = HeadTurnMode.relative;
        this.mHeadTurnParam.verticalAngle = -10;
        this.mHeadTurnParam.verticalMaxSpeed = 30;
        this.mIsRunning = true;
    }

    /**
     * 低头
     */
    @action
    public headDown(hMode: string, hAngle: number, vMode: string, vAngle: number): void {
        this.mHeadTurnParam.horizontalMode = HeadTurnMode.relative;
        this.mHeadTurnParam.horizontalAngle = 0;
        this.mHeadTurnParam.horizontalMaxSpeed = 30;
        this.mHeadTurnParam.verticalMode = HeadTurnMode.relative;
        this.mHeadTurnParam.verticalAngle = 10;
        this.mHeadTurnParam.verticalMaxSpeed = 30;
        this.mIsRunning = true;
    }

    /**
     * 左转
     */
    @action
    public turnLeft(hMode: string, hAngle: number, vMode: string, vAngle: number): void {
        this.mHeadTurnParam.horizontalMode = HeadTurnMode.relative;
        this.mHeadTurnParam.horizontalAngle = -30;
        this.mHeadTurnParam.horizontalMaxSpeed = 30;
        this.mHeadTurnParam.verticalMode = HeadTurnMode.relative;
        this.mHeadTurnParam.verticalAngle = 0;
        this.mHeadTurnParam.verticalMaxSpeed = 30;
        this.mIsRunning = true;
    }

    /**
     * 右转
     */
    @action
    public turnRight(hMode: string, hAngle: number, vMode: string, vAngle: number): void {
        this.mHeadTurnParam.horizontalMode = HeadTurnMode.relative;
        this.mHeadTurnParam.horizontalAngle = 30;
        this.mHeadTurnParam.horizontalMaxSpeed = 30;
        this.mHeadTurnParam.verticalMode = HeadTurnMode.relative;
        this.mHeadTurnParam.verticalAngle = 0;
        this.mHeadTurnParam.verticalMaxSpeed = 30;
        this.mIsRunning = true;
    }

    /**
     * 执行结束
     */
    @action
    public finishRunning(): void {
        this.mIsRunning = false;
    }

    /**
     * 获取参数
     */
    public getParam(): HeadTurnParam {
        return this.mHeadTurnParam;
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

    @action
    public setInfoText(infoText: string) {
        this.mHeadAction = infoText;
    }

    public getInfoText(): string {
        return this.mHeadAction;
    }

    @action
    public setTriggerNum(jumpNum: number) {
        this.triggerNumber = jumpNum;
    }

    public getTriggerNum(): number {
        return this.triggerNumber;
    }
}