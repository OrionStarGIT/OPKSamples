import { BaseViewModel, speechApi } from "orionos-eve-core";
import { Log } from "../../base/log/Log";
import DrawerData, { DrawerID, DrawerItemBean } from "../drawer/DrawerData";
import { RouterManager } from "../manager/RouterManager";
import { TriggerChannel } from "../../base/constant/TriggerChannel";
import { contextStore } from "../state/Context";
import { EndType } from "../state/State";
import { CommonVoice } from "../../base/voice/CommonVoice";
//import { DeskVoiceIntercept } from "../intercept/DeskVoiceIntercept";
//import { TTSPlayerManager } from "../manager/TTSPlayerManager";
//import { DeskScreenVoiceIntercept } from "../intercept/DeskScreenVoiceIntercept";
//import { NonSupportVoiceIntercept } from "../../base/intercept/NonSupportVoiceIntercept";
import { RobotInfo } from "../../base/config/RobotInfo";
//import { TableQueueVoiceIntercept } from '../../base/intercept/TableQueueVoiceIntercept';
//import { taskWaitStore } from '../taskwait/TaskWaitStore';
//import { TaskWaitViewModel } from '../taskwait/TaskWaitViewModel';

export abstract class BaseMyViewModel extends BaseViewModel{

    public TAG = '';
    protected isDestroy: boolean = false;

    protected constructor(name: string) {
        super(name);
        this.TAG = name;

        let commonVoice = new CommonVoice(this.TAG);
        //commonVoice.addIntercept(new NonSupportVoiceIntercept());
        //commonVoice.addIntercept(new DeskVoiceIntercept());
        //commonVoice.addIntercept(new DeskScreenVoiceIntercept(this));
        //commonVoice.addIntercept(new TableQueueVoiceIntercept());
        this.setVoice(commonVoice);
    }

    public onStart(): void {
        // Log.d(this.TAG, 'onStart');
    }

    public onStop(): void {
        // Log.d(this.TAG, 'onStop');
        this.isDestroy = true;
        this.setRecognitionShow(false);
        (this._voice as CommonVoice).onStop();
    }

    public get drawerData(): DrawerItemBean[] {
        return DrawerData.desk;
    }

    public drawerItemClick = (id: DrawerID, execFailed?: () => void) => {
        switch (id) {
            case DrawerID.meal:
                RouterManager.navigationWithHook(TriggerChannel.meal, {}, execFailed);
                break;
            case DrawerID.welcome:
                RouterManager.navigationWithHook(TriggerChannel.welcome, {}, execFailed);
                break;
            case DrawerID.cruise:
                RouterManager.navigationWithHook(TriggerChannel.cruise, {}, execFailed);
                break;
            case DrawerID.leading:
                RouterManager.navigationWithHook(TriggerChannel.leading, {}, execFailed);
                break;
            case DrawerID.settings:
                RouterManager.navigationWithHook(TriggerChannel.settings, {}, execFailed);
                break;
            case DrawerID.plate:
                RouterManager.navigationWithHook(TriggerChannel.plate, {}, execFailed);
                break;
            case DrawerID.endTask:
                this.OnDrawerEndTask();
                break;
            case DrawerID.featureSwitch:
                this.emojiPlayerStore.setShow(false);
                this.emojiPlayerStore.setContentView(null);
                //taskWaitStore.setIsShowOpkNavigationView(true);
                break;
        }
    }

    //任务结束，默认回到任务待机页
    public OnDrawerEndTask(): void {
        Log.d(this.TAG, 'onEndTask');
        //TTSPlayerManager.stopTTS(this.TAG + ' OnDrawerEndTask');
        contextStore.endTask(EndType.CANCEL, 'click drawer');
    }

    public log(s: any, t: string) {
        Log.d(s, t);
    }

    public back = (): void => {
        RouterManager.back();
    }

    public setRecognitionShow(isShow: boolean) {
        RobotInfo.setRecognitionShow(isShow);
        speechApi.setRecognizeMode(isShow);
        if (isShow) {
            RobotInfo.setRecognitionViewStyle(1);
            RobotInfo.setDisablePress(true);
        } else {
            RobotInfo.setDisablePress(false);
        }
    }

    public get localAsrArray(): string[] {
        return [];
    }

}