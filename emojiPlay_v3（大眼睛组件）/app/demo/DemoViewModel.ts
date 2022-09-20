import { action, observable } from 'mobx';
import { BaseViewModel, PersonAppearParam, ComponentEvent, ComponentResultConst, ComponentErrorConst, emojiPlayerModel } from 'orionos-eve-core';
import { demoModel } from './DemoModel';
import { PersonAppearModel } from './PersonAppearModel';

/**
 * 业务逻辑
 */
export class DemoViewModel extends BaseViewModel {
    //数据模块
    private mTimer: any;
    @observable private flag: boolean = false;
    public constructor() {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('Demo');
    }

    public onStart() {

    }

    public onStop() {
        if (this.mTimer) {
            clearTimeout(this.mTimer);
        }
    }

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    public getFlag(): boolean {
        return this.flag;
    }

    @action
    public setFlag(visibility: boolean): void {
        this.flag = visibility;
    }

    public showSpeechText(text: string) {
        console.log('DemoVoice : set ' + text);
        demoModel.setInfoText(text);
    }

    /**
     * 人脸识别执行结果
     * @param event
     */
    public onFinish = (event?: ComponentEvent): boolean => {
        if (event && event.status) {
            switch (event.status) {
                case ComponentResultConst.RESULT_SUCCESS:
                    //     'RESULT_SUCCESS(' + event.status + '): 检测成功');
                    if (event.data) {
                        let personData = JSON.parse(event.data);
                        console.log('personAppearonUpdata55啦啦啦啦啦啦姓名：' + (personData.name ? personData.name : '陌生人'));
                        this.onHidden();
                        //this.updatePersonApeear();
                    }
                    break;
                case ComponentResultConst.RESULT_TIMEOUT:
                    //     'RESULT_TIMEOUT(' + event.status + '): 检测超时');
                    console.log('personAppearonUpdata44啦啦啦啦啦啦检测超时');
                    break;
                case ComponentErrorConst.ERROR_OPEN_PERSON_DETECT_FAILED:
                    //     'ERROR_PARAMS_REGISTER_ID_INVALID(' + event.status + '): 获取人脸数据失败');
                    console.log('personAppearonUpdata33啦啦啦啦啦啦获取人脸数据失败');
                    break;
                default:
                    console.log('personAppearonUpdata22啦啦啦啦啦啦默认值' + event.status);
                    break;
            }
        }
        return true;
    }; 
    
    public updatePersonApeear = (event?: ComponentEvent): void => {
        console.log(' 啦啦啦啦updatePersonApeear : ', event);
        console.log(' 啦啦啦啦updatePersonApeear第二步骤 : ', event);
        this._apiTrigger(1002, '');
    };

    public onHidden(): void {
        console.log('onHidden啦啦啦啦啦');
        this.mTimer = setTimeout((): void =>{
            this.hideEmojiPlayer();
        }, 2000);
        this.setFlag(true);
        this._apiTrigger(1002, '');
    }

}
