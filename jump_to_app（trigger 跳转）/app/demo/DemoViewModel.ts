import { BaseViewModel } from 'orionos-eve-core';
import { demoModel } from './DemoModel';

/**
 * 业务逻辑
 */
export class DemoViewModel extends BaseViewModel {

    public constructor() {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('Demo');
    }

    public onStart() {

    }

    public onStop() {

    }

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    public triggerHome() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1002, '');
    }

    public triggerWakeup() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1003, '');
    }

    public queryLocation() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1004, '');
    }

    public reception() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1005, '');
    }

    public navigation() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1006, '');
    }

    public guide() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1007, '');
    }

    public advert() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1008, '');
    }

    public cruise() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1009, '');
    }

    public dance() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1010, '');
    }

    public groupPhoto() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1011, '');
    }

    public getProps() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1012, '');
    }

    public showSpeechText(text: string) {
        console.log('DemoVoice : set ' + text);
        demoModel.setInfoText(text);
    }

}
