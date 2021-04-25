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

import * as React from 'react';
import {
    BaseComponent,
    BaseComponentProps,
    triggerManager
} from 'orionos-eve-core';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoView } from './DemoView';
import { DemoTrigger } from './DemoTrigger';

export class DemoScreen
    extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    /**
     * 构造函数
     * @param props-传入参数
     */
    public constructor(props: BaseComponentProps) {
        super(props);

        let viewModel = new DemoViewModel();
        this.setViewModel(viewModel);
        this.setVoice(new DemoVoice(viewModel));
        triggerManager.addTrigger(new DemoTrigger());
    }

    /**
     * 界面渲染完成
     */
    public componentDidMount(): void {
        //重写界面的didMount，必须调用super
        super.componentDidMount();
    }

    /**
     * 界面即将销毁
     */
    public componentWillUnmount(): void {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public render(): React.ReactNode {
        return (
            <>
                <DemoView viewModel={this.viewModel}/>
            </>
        );
    }
}