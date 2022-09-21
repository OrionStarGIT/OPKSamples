/**
 Copyright (C) 2020 Beijing Kingsoft Internet Security Software Co., Ltd. and Beijing Orion Star Technology Co., Ltd
 Licensed under the Robot OS License Agreement (the "License").
 You may not use this file except in compliance with the License.
 You may obtain a copy of the License at  https://wiki.orionbase.cn/devguide/robot-osxu-ke-xie-yi.html
 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.
 */

import { observable, action } from 'mobx';


export class MainModel {
    @observable private model = { infoText: 'Navigation Main 导航!' };

    @action
    public setInfoText(infoText: string) {
        this.model.infoText = infoText;
    }

    public getInfoText(): string {
        return this.model.infoText;
    }
}

export const mainModel = new MainModel();
