import { NlpBaseVoice, NlpVoiceData } from 'orionos-eve-core';
import { DemoViewModel } from './DemoViewModel';

/**
 * 语音处理
 */
export class DemoVoice extends NlpBaseVoice {

    private viewModel: DemoViewModel;

    /**
     * 构造函数
     * @param viewModel-业务逻辑
     */
    public constructor(viewModel: DemoViewModel) {
        super('DemoVoice');
        this.viewModel = viewModel;
    }

    /**
     *
     */
    public nlpSpeak(): void {
    }

    /**
     * 接收语音指令
     * @param result 语音识别数据
     * @return true 表示该语音指令已被处理，会拦截掉语音指令
     *         false 语音指令未被处理，交给其它opk处理
     */
    public onNlpListenCallback(result: NlpVoiceData): boolean {
        return false;
    }

}
