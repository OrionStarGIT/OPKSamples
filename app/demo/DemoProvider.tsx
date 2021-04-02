import * as React from 'react';
import {
    BaseComponent,
    BaseComponentProps
} from 'orionos-eve-core';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoView } from './DemoView';

export class DemoProvider
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