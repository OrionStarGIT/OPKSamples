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

import { ThirdApkInfo } from '../biz/base/ThirdApkInfo';
import {
    BaseViewModel,
    ComponentEvent,
    ComponentResultConst,
    ComponentErrorConst,
    PersonAppearParam,
    NLPApkControl
} from 'orionos-eve-core';
import { PersonAppearModel } from './PersonAppearModel';

const TAG = 'shadow_opk_for_android personAppearViewModel.ts';
export class PersonAppearViewModel extends BaseViewModel {

    //数据模块
    private mModel: PersonAppearModel;
    private return_obj = {"command": "", "text": "", "code": -1, "data": "", "messaage": ""};

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
            this.return_obj.command = "personAppearAction";
            this.return_obj.text = "person appear action";
            this.return_obj.code = event && event.status;
            this.return_obj.data = event.data ? JSON.stringify(event.data) : "";
            let result = JSON.stringify(this.return_obj);
            NLPApkControl.onRobotMessage(ThirdApkInfo.PACKAGE_NAME, result);
            console.log(TAG, "人脸检测 onFinish 方法" + JSON.stringify(event));
            switch (event.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    console.log('啦啦啦啦1' + event.status);
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
                    console.log('啦啦啦啦2' + event.status);
                    this.mModel.appendResultText(
                        'RESULT_TIMEOUT(' + event.status + '): 检测超时');
                    break;
                case ComponentErrorConst.ERROR_OPEN_PERSON_DETECT_FAILED:
                    console.log('啦啦啦啦3' + event.status);
                    this.mModel.appendResultText(
                        'ERROR_PARAMS_REGISTER_ID_INVALID(' + event.status + '): 获取人脸数据失败');
                    break;
                default:
                    console.log('啦啦啦啦4' + event.status);
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
        console.log('检测isRunning方法是否被执行' + this.mModel.getParam());
        return this.mModel.isRunning();
    }

    /**
     * 获取识别参数
     */
    public getParam(): PersonAppearParam {
        console.log('啦啦啦5' + this.mModel.getParam());
        return this.mModel.getParam();
    }

    /**
     * 获取识别结果
     */
    public getResultText(): string {
        return this.mModel.getResultText();
    }
}