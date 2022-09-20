/**
 Copyright (C) 2020 Beijing Kingsoft Internet Security Software Co., Ltd. and Beijing Orion Star Technology Co., Ltd
 Licensed under the Robot OS License Agreement (the "License").
 You may not use this file except in compliance with the License.
 You may obtain a copy of the License at  https://wiki.orionbase.cn/devguide/robot-osxu-ke-xie-yi.html
 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.
 */

import { observable, action } from 'mobx';

export class DemoModel {
    @observable private infoText = 'Hello Robot!';
    @observable private isEnterRoom = false; //是否进入房间
    @observable private remoteUserId = ''; //远端userID
    @observable private isFrontCamera = true; //当前是否为前置摄像头（广角）

    @action
    public setInfoText(infoText: string) {
        console.log('DemoVoice Set info text : ' + infoText);
        this.infoText = infoText;
    }

    public getInfoText(): string {
        return this.infoText;
    }

    @action
    public setIsEnterRoom(isEnterRoom: boolean) {
        this.isEnterRoom = isEnterRoom;
    }

    public getIsEnterRoom(): boolean {
        return this.isEnterRoom;
    }

    @action public setRemoteUserId(remoteUserId: string) {
        this.remoteUserId = remoteUserId;
    }

    public getRemoteUserId(): string {
        return this.remoteUserId;
    }

    @action public setIsFrontCamera(isFrontCamera: boolean) {
        this.isFrontCamera = isFrontCamera;
    }

    public getIsFrontCamera(): boolean {
        return this.isFrontCamera;
    }

    @action public reset(): void {
        this.isEnterRoom = false; //是否进入房间
        this.remoteUserId = ''; //远端userID
        this.isFrontCamera = true; //当前是否为前置摄像头（广角）
    }
}

export const demoModel = new DemoModel();
