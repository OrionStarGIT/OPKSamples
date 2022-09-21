import { BaseViewModel } from 'orionos-eve-core';
import { demoModel } from './DemoModel';

/**
 * 业务逻辑
 */

const TAG = 'DemoViewModel';

export class DemoViewModel extends BaseViewModel {

    private mTimer: any;

    public constructor() {
        super('Demo');
    }

    public onStart(): void {
        console.log(TAG, 'onStart');
        this.mTimer = setTimeout((): void => {
            this.hideEmojiPlayer();
        }, 200);
    }

    public onStop(): void {
        console.log(TAG, 'onStop');
        if (this.mTimer) {
            clearTimeout(this.mTimer);
        }
    }

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }


    public showSpeechText(text: string) {
        console.log('DemoVoice : set ' + text);
        demoModel.setInfoText(text);
    }

    public queryLocation() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1004, '');
    }

}
