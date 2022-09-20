import { BaseVoice } from 'orionos-eve-core';
import { MotionArcWithObstaclesViewModel } from './MotionArcWithObstaclesViewModel';

/**
 * 语音处理
 */
export class MotionArcWithObstaclesVoice extends BaseVoice {

    private viewModel: MotionArcWithObstaclesViewModel;

    public constructor(viewModel: MotionArcWithObstaclesViewModel) {
        super('MotionArcWithObstaclesVoice');
        this.viewModel = viewModel;
    }

    /**
     * 接收语音指令
     *
     * @param intent 语音指令标识
     * @param result 语音识别的数据
     * @param id
     * @param text 语音识别文本
     *
     * @return {boolean}
     *         true 表示该语音指令已被处理，会拦截掉语音指令
     *         false 语音指令未被处理，交给其它opk处理
     */
    public onListenCallback(intent: string, result: any, id: number, text: string): boolean {
        console.log('demoApp', 'onListenCallback', intent, result, id, text);
        switch (intent) {
            case 'general_command&stop':
                this.viewModel.exit();
                return true;

            default:
                this.viewModel.showSpeechText(`${intent} : ${text}`);
                return true;
        }
    }

    public speak(): void {
    }

}
