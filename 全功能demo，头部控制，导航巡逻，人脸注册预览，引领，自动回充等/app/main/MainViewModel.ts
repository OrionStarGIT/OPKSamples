import { BaseViewModel } from 'orionos-eve-core';
import { mainModel } from './MainModel';

/**
 * 业务逻辑
 */
export class MainViewModel extends BaseViewModel {

    public constructor() {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('main');
    }

    public onStart() {

    }

    public onStop() {

    }

    public startDemo() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    public showSpeechText(text: string) {
        mainModel.setInfoText(text);
    }

}
