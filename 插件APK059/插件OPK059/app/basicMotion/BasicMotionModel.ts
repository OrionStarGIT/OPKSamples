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
import { BasicMotionMode, BasicMotionParam } from 'orionos-eve-core';

export class BasicMotionModel {
    /**
     * 运动参数
     */
    private readonly mBasicMotionParam: BasicMotionParam;

    //是否正在执行
    @observable private mIsRunning: boolean = false;

    //执行结果
    @observable private mResultText: string = '';

    /**
     * 构造函数
     */
    public constructor() {
        this.mBasicMotionParam = new BasicMotionParam();
    }

    /**
     * 前进
     */
    @action
    public goForward(): void {
        this.mBasicMotionParam.mode = BasicMotionMode.goForward;
        this.mBasicMotionParam.linearSpeed = 0.1;
        this.mBasicMotionParam.distance = 0.1;
        this.mBasicMotionParam.avoidStop = true;
        this.mIsRunning = true;
    }

    /**
     * 后退
     */
    @action
    public goBackward(): void {
        this.mBasicMotionParam.mode = BasicMotionMode.goBackward;
        this.mBasicMotionParam.linearSpeed = 0.1;
        this.mBasicMotionParam.distance = 0.1;
        this.mBasicMotionParam.avoidStop = true;
        this.mIsRunning = true;
    }

    /**
     * 左转
     */
    @action
    public turnLeft(): void {
        this.mBasicMotionParam.mode = BasicMotionMode.turnLeft;
        this.mBasicMotionParam.angularSpeed = 10;
        this.mBasicMotionParam.angle = 30;
        this.mIsRunning = true;
    }

    /**
     * 右转
     */
    @action
    public turnRight(): void {
        this.mBasicMotionParam.mode = BasicMotionMode.turnRight;
        this.mBasicMotionParam.angularSpeed = 10;
        this.mBasicMotionParam.angle = 30;
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
    public getParam(): BasicMotionParam {
        return this.mBasicMotionParam;
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