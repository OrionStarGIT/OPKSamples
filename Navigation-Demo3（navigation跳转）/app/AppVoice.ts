import { BaseVoice } from 'orionos-eve-core';

/**
 * 兜底语音处理
 * <p>
 * 如果当前语音指令无业务处理，可在此处进行处理
 *
 */
export class AppVoice extends BaseVoice {

    public constructor() {
        super('DemoVoice');
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
        return false;
    }

    public speak(): void {
    }

}
