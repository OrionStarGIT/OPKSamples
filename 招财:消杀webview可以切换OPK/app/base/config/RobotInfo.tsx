import {
    Broadcast,
} from 'orionos-eve-core';
import { Log } from "../log/Log";

const TAG = 'RobotInfo';
export class RobotInfo {

    private static readonly VOLUME_ARRAY = [0, 3, 5, 6, 8, 10, 11, 12, 13, 14, 15];
    /**
     * 是否正在充电
     */
    public static get isCharging() {
        if (global.robotStatus) {
            return global.robotStatus.isCharging();
        }
    }

    public static setGlobalChatShow(show: boolean) {
        if (global.globalChat.setShow) {
            global.globalChat.setShow(show);
        }
    }

    public static setCloseFloatChatView(closeFloatChatView: boolean) {
        if (global.globalChat.setCloseFloatChatView) {
            global.globalChat.setCloseFloatChatView(closeFloatChatView);
        }
    }

    public static setRecognitionShow(isShow: boolean) {
        if (global.recognition) {
            global.recognition.setShow(isShow)
        }
        Log.d(TAG, 'setRecognitionShow=' + isShow)
    }

    public static setGuideShow(isShow: boolean) {
        if (global.recognition) {
            global.recognition.setGuideShow(isShow)
        }
    }

    public static setRecognitionViewStyle(style: number) {
        if (global.recognition && global.recognition.setRecognitionViewStyle) {
            global.recognition.setRecognitionViewStyle(style)
        }
    }

    public static setDisablePress(disable: boolean): void {
        global.recognition.setDisablePress(disable);
    }

    public static setGlobalRobotViewShow(isShow: boolean) {
        if (global.recognition) {
            global.recognition.setGlobalRobotViewShow(isShow)
        }
    }

    public static isFloatChatViewClosed() {
        if (global.globalChat) {
            return global.globalChat.isFloatChatViewClosed()
        }
        return true;
    }

    public static showVerifyPwdDialog(oldPwd: string, callback: (status: string) => void) {
        if (global.passwordModel) {
            global.passwordModel.showVerifyPwdDialog(oldPwd, callback)
        }
    }

    public static showUpdatePwdDialog(callback: (pwd: string) => void) {
        if (global.passwordModel) {
            global.passwordModel.showUpdatePwdDialog(callback)
        }
    }

    public static getChatViewState(): number {
        if (global.globalChat && global.globalChat.getTotalViewState) {
            return global.globalChat.getTotalViewState();
        }
        return 0;
    }

    public static sendRepositionBroadcast() {
        Broadcast.sendBroadcast('action_reposition', { repositionVision: true });
    }

    public static get isPasswordModelShow() {
        if (global.passwordModel.isShow) {
            return global.passwordModel.isShow()
        }
    }

    public static hidePasswordModal() {
        if (global.passwordModel.dismissDialog) {
            return global.passwordModel.dismissDialog()
        }
    }

    public static transVolumeValue(index: number): number {
        return this.VOLUME_ARRAY[index]
    }

    public static transVolumeIndex(value: number): number {
        for (let i = 0; i < this.VOLUME_ARRAY.length; i++) {
            if (this.VOLUME_ARRAY[i] === value) {
                return i;
            } else if ((value - this.VOLUME_ARRAY[i]) * (value - this.VOLUME_ARRAY[i + 1]) < 0) {
                if (Math.abs(value - this.VOLUME_ARRAY[i]) <= Math.abs(value - this.VOLUME_ARRAY[i + 1])) {
                    return i;
                } else {
                    return i + 1;
                }
            }
        }
        return 5;
    }

    public static getAngularSpeed(linearSpeed: number): number {
        return linearSpeed / 0.7;
    }
}

