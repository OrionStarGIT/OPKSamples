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

import {
    BaseViewModel,
    ComponentEvent,
    ComponentResultConst,
    ComponentErrorConst,
    PersonAppearParam
} from 'orionos-eve-core';
import { PersonAppearModel } from './PersonAppearModel';

export class PersonAppearViewModel extends BaseViewModel {

    //数据模块
    private mModel: PersonAppearModel;

    /**
     * 构造函数
     */
    public constructor() {
        super('PersonAppear');
        this.mModel = new PersonAppearModel();
    }

    /**
     * 开始
     */
    public onStart(): void {

    }

    /**
     * 结束
     */
    public onStop(): void {

    }

    /**
     * 点击开始人脸识别
     */
    public onPressStartPersonAppear = (): void => {
        this.mModel.startPersonAppear();
    };

    /**
     * 点击结束人脸识别
     */
    public onPressFinishPersonAppear = (): void => {
        this.mModel.finishRunning();
    };

    /**
     * 人脸识别执行结果
     * @param event
     */
    public onFinish = (event?: ComponentEvent): boolean => {
       
        this.mModel.finishRunning();
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    console.log('啦啦啦啦' + event.status);
                    this.mModel.appendResultText(
                        'RESULT_SUCCESS(' + event.status + '): 检测成功');
                    if (event.data) {
                        let personData = JSON.parse(event.data);
                        this.mModel.appendResultText(
                            '姓名：' + (personData.name ? personData.name : '陌生人'));
                        this.mModel.appendResultText(
                            '性别：' + (personData.gender === 'female' ? '女' : '男'));
                        this.mModel.appendResultText(
                            '年龄：' + personData.age);
                    }
                    break;
                case ComponentResultConst.RESULT_TIMEOUT:
                    console.log('啦啦啦啦' + event.status);
                    this.mModel.appendResultText(
                        'RESULT_TIMEOUT(' + event.status + '): 检测超时');
                    break;
                case ComponentErrorConst.ERROR_OPEN_PERSON_DETECT_FAILED:
                    console.log('啦啦啦啦' + event.status);
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_REGISTER_ID_INVALID(' + event.status + '): 获取人脸数据失败');
                    break;
                default:
                    console.log('啦啦啦啦' + event.status);
                    this.mModel.appendResultText(event.status + '');
                    break;
            }
        }
        return true;
    };

    /**
     * 是否正在识别
     */
    public isRunning(): boolean {
        return this.mModel.isRunning();
    }

    /**
     * 获取识别参数
     */
    public getParam(): PersonAppearParam {
        console.log('啦啦啦' + this.mModel.getParam());
        return this.mModel.getParam();
    }

    /**
     * 获取识别结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }
}