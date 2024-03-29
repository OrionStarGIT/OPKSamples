import { BaseViewModel } from 'orionos-eve-core';
import { demoModel } from './DemoModel';

/**
 * 业务逻辑
 */
export class DemoViewModel extends BaseViewModel {

    public constructor() {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('cafe_meal');
    }

    public onStart() {

    }

    public onStop() {

    }

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    public showSpeechText(text: string) {
        console.log('DemoVoice : set ' + text);
        demoModel.setInfoText(text);
    }

}
