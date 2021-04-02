import { observable, action } from 'mobx';

/**
 * 业务数据
 */
export class DemoModel {
    //数据发生改变时界面自动重绘
    @observable private infoText = 'Hello Robot!';

    @action
    public setInfoText(infoText: string): void {
        this.infoText = infoText;
    }

    public getInfoText(): string {
        return this.infoText;
    }
}
