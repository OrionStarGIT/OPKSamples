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
import { PersonDisappearParam } from 'orionos-eve-core';

export class PersonDisappearModel {

    /**
     * 人离开检测参数
     */
    private readonly mPersonDisappearParam: PersonDisappearParam;


    //是否正在执行
    @observable private mIsRunning: boolean = false;

    //执行结果
    @observable private mResultText: string = '';

    /**
     * 构造函数
     */
    public constructor() {
        this.mPersonDisappearParam = new PersonDisappearParam();
    }

    /**
     * 开始人离开检测
     */
    @action
    public startPersonDisappear(): void {
        this.mPersonDisappearParam.personId = undefined;
        this.mPersonDisappearParam.personName = undefined;
        this.mPersonDisappearParam.maxDistance = 3;
        this.mPersonDisappearParam.maxFaceAngleX = 60;
        this.mPersonDisappearParam.isNeedInCompleteFace = false;
        this.mPersonDisappearParam.isNeedBody = false;
        this.mPersonDisappearParam.disappearTimeout = 15000;
        this.mPersonDisappearParam.lostTimeout = 2000;
        this.mPersonDisappearParam.scene = undefined;
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
    public getParam(): PersonDisappearParam {
        return this.mPersonDisappearParam;
    }

    /**
     * 是否正在执行
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