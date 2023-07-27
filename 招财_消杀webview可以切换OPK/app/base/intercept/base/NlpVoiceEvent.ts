import { NlpVoiceData } from 'orionos-eve-core';

export class NlpVoiceEvent extends NlpVoiceData{

    public static LOCAL_ASR = 'localAsr';

    //事件是否被拦截或者事件分发到达链表的尾部
    public mAlreadyBack = false;

    public mIntent: string = '';
    public mAction: string = '';
    public mPlayMode: string = '';
    public isFuzzyMatchByAsr!: (array: string[]) => boolean;

    private constructor() {
        super();
    }

    public static getNlpVoiceEvent(nlpVoiceData: NlpVoiceData) {
        let nlpVoiceEvent: NlpVoiceEvent = (nlpVoiceData as any);
        nlpVoiceEvent.mIntent = nlpVoiceData.rawIntent;
        nlpVoiceEvent.mAction = nlpVoiceData.firstAction?.action;
        nlpVoiceEvent.mPlayMode = nlpVoiceData.firstAction?.args?.play_mode;
        nlpVoiceEvent.isFuzzyMatchByAsr = (array) => {
            return (
                nlpVoiceEvent.mAction === NlpVoiceEvent.LOCAL_ASR
                && this.isFuzzyMatchByAsr(nlpVoiceEvent.mIntent, array)
            );
        };
        return nlpVoiceEvent;
    }

    private static isFuzzyMatchByAsr(asrResult: string, fuzzyArray: string[]) {
        return fuzzyArray.map((value) => value.includes(asrResult)).length > 0;
    }
}