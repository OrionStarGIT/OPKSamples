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

import { NlpBaseVoice, NlpVoiceData } from 'orionos-eve-core';
import { DemoViewModel } from './DemoViewModel';

/**
 * 语音处理
 */
export class DemoVoice extends NlpBaseVoice {

    private viewModel: DemoViewModel;

    /**
     * 构造函数
     * @param viewModel-业务逻辑
     */
    public constructor(viewModel: DemoViewModel) {
        super('DemoVoice');
        this.viewModel = viewModel;
    }

    /**
     *
     */
    public nlpSpeak(): void {
    }

    /**
     * 接收语音指令
     * @param result 语音识别数据
     * @return true 表示该语音指令已被处理，会拦截掉语音指令
     *         false 语音指令未被处理，交给其它opk处理
     */
    public onNlpListenCallback(result: NlpVoiceData): boolean {
        return false;
    }

}
