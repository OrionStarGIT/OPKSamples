import { BaseViewModel } from 'orionos-eve-core';
import { DemoModel } from './DemoModel';

/**
 * 业务逻辑
 */
export class DemoViewModel extends BaseViewModel {

    /**
     * 数据模块
     */
    private mModel: DemoModel;

    /**
     * 构造函数
     */
    public constructor() {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('Demo');
        this.mModel = new DemoModel();
    }

    /**
     * 任务开始
     */
    public onStart(): void {

    }

    /**
     * 任务结束
     */
    public onStop(): void {

    }

    /**
     * 点击换一换
     */
    public onPressChangeText = (): void => {
        if (this.mModel.getInfoText() === 'Hello Robot!') {
            this.mModel.setInfoText('你好，机器人！');
        } else {
            this.mModel.setInfoText('Hello Robot!');
        }
    };

    public getInfoText(): string {
        return this.mModel.getInfoText();
    }
}
