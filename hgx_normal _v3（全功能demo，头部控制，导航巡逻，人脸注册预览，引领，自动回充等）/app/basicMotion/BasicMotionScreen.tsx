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

import React from 'react';
import {
    BaseComponent,
    BaseComponentProps,
    BaseVoice,
    BasicMotionComponent
} from 'orionos-eve-core';
import { observer } from 'mobx-react';
import { BasicMotionViewModel } from './BasicMotionViewModel';
import { BasicMotionView } from './BasicMotionView';

@observer
export class BasicMotionScreen
    extends BaseComponent<BaseComponentProps, BasicMotionViewModel, BaseVoice> {

    /**
     * 构造函数
     */
    public constructor(props: BaseComponentProps) {
        super(props);

        this.setViewModel(new BasicMotionViewModel());
    }

    /**
     * 执行
     */
    public render(): React.ReactNode {
        if (!this.viewModel) {
            return null;
        }
        return (
            <>
                {/*运动组件*/}
                {this.viewModel.isRunning() ? (
                    <BasicMotionComponent
                        param={this.viewModel.getParam()}
                        onFinish={this.viewModel&&this.viewModel.onFinish}/>
                ) : null}
                {/*界面*/}
                <BasicMotionView viewModel={this.viewModel}/>
            </>
        );
    }
}