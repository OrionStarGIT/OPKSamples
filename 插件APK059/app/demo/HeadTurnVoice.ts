import { BaseVoice, NLPApkControl } from 'orionos-eve-core';
import { HeadTurnViewModel } from '../headTurn/HeadTurnViewModel';

/**
 * 语音处理
 */
export class HeadTurnVoice extends BaseVoice {

    private viewModel: HeadTurnViewModel;
    private return_obj = {"intent": "", "text": "", "result": ""};

    public constructor(viewModel: HeadTurnViewModel) {
        super('HeadTurnVoice');
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
        console.log('DemoVoice : ' + text + "   result====:" + JSON.stringify(result));
        switch (intent) {
            // case 'general_command&stop':
            //     this.viewModel.exit();
            //     return true;

            default:
                this.return_obj.intent = intent;
                this.return_obj.text = text;
                this.return_obj.result = result;
                let result_str = JSON.stringify(this.return_obj);
                console.log("语音识别数据信息：" + result_str);
                NLPApkControl.onRobotMessage('com.example.myfirstapp',result_str);
                //this.viewModel.showSpeechText(`${intent} : ${text}`);
                return true;
        }
    }

    public speak(): void {
    }

}
