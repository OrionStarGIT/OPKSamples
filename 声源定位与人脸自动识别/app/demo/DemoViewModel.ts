import { observable } from 'mobx';
import { BaseViewModel, ComponentEvent, ComponentStatusConst, SoundLocalizationParam, StandardFaceTrackParam } from 'orionos-eve-core';
import { demoModel } from './DemoModel';
import { FeatureConfig } from '../config/FeatureConfig';

/**
 * 业务逻辑
 */
export class DemoViewModel extends BaseViewModel {
    private readonly TAG = '有没有执行操作';
    private faceAppear: boolean;
    private quitTimeout?: number;
    @observable private soundLocalizationParam: SoundLocalizationParam;
    @observable private standardFaceTrackParam: StandardFaceTrackParam;
    @observable private avoidWakeUp = false;
    public constructor() {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('Demo');
        this.faceAppear = false;
        this.soundLocalizationParam = new SoundLocalizationParam(0, true, true);
        this.standardFaceTrackParam = new StandardFaceTrackParam();
    }

    public onStart() {

    }

    public onStop() {
        this.cleanQuitTimer();
    }

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    public showSpeechText(text: string) {
        console.log('DemoVoice : set ' + text);
        demoModel.setInfoText(text);
    }

    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        console.log(this.TAG, 'onStatusUpdate event:', event);
        if (event) {
            switch (event.status) {
                case ComponentStatusConst.STATUS_TRACK_SUCCESS:
                    this.faceAppear = true;
                    return true;
                case ComponentStatusConst.STATUS_TRACK_END:
                    this.faceAppear = false;
                    return true;
                case ComponentStatusConst.STATUS_TRACK_FAILED:
                    this.faceAppear = false;
                    return true;
            }
        }
        return false;
    };

    public onFaceTrackFinish = (event?: ComponentEvent): boolean => {
        console.log(this.TAG, 'onFaceTrackFinish event:', event);
        this.faceAppear = false;
        this.startWTimeout();
        return true;
    };
    
    public startWTimeout = (): void => {
        if (this.quitTimeout) {
            clearTimeout(this.quitTimeout);
        }

        console.log(this.TAG, 'timeoutReset');
        this.quitTimeout = setTimeout((): void => {
            if (!this.faceAppear) {
                console.log(this.TAG, 'timeoutReset', 'trigger timeout');
                if (FeatureConfig.isDemoModeEnable()) {
                    this._apiTrigger(1001, {});
                } else {
                    this._apiTrigger(1002, {});
                }
            } else {
                console.log(this.TAG, 'faceTrack');
            }
        }, 10000);
    };    

    public cleanQuitTimer(): void {
        if (this.quitTimeout) {
            clearTimeout(this.quitTimeout);
        }
    }

    public getSoundParams(): SoundLocalizationParam {
        return this.soundLocalizationParam;
    } 

    public setSoundParams(soundParams: SoundLocalizationParam): void {
        this.soundLocalizationParam = soundParams;
    }    
    
    public getFaceTrackParams(): StandardFaceTrackParam {
        return this.standardFaceTrackParam;
    } 
    
    public setFaceTrackParams(faceTrackParams: StandardFaceTrackParam): void {
        this.standardFaceTrackParam = faceTrackParams;
    }    
    
    public getAvoidWakeupState(): boolean {
        return this.avoidWakeUp;
    }    

}
