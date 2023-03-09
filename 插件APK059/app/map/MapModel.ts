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

export class MapModel {
    //执行结果
    @observable private mapName: string = '';

    /**
     * 构造函数
     */
    public constructor() {
    }

    /**
     * 设置执行结果
     * @param text-结果
     */
    @action
    public setMapName(text: string): void {
        this.mapName = text;
    }

    /**
     * 获取执行结果
     */
    public getMapName(): string {
        return this.mapName;
    }
}