import {
    NlpBaseVoice,
    NlpVoiceData,
} from 'orionos-eve-core';
import { DeviceEventEmitter, EmitterSubscription } from "react-native";
import { BaseVoiceIntercept } from '../intercept/base/BaseVoiceIntercept';
import { Chain } from '../intercept/base/Chain';
import { NlpVoiceEvent } from "../intercept/base/NlpVoiceEvent";
import { Log } from "../log/Log";

export class CommonVoice extends NlpBaseVoice {
    private mIntercepts: BaseVoiceIntercept[];
    private readonly TAG: string;
    private mEmitterSubscription: EmitterSubscription;

    public nlpSpeak(): void {
    }

    public speak = (): void => {
    };

    public addIntercept(intercept: BaseVoiceIntercept) {
        this.mIntercepts.push(intercept);
    }

    public constructor(tag: string, ...intercepts: BaseVoiceIntercept[]) {
        super(tag);
        this.TAG = tag;
        this.mIntercepts = intercepts;

        //最终的识别结果
        this.mEmitterSubscription = DeviceEventEmitter.addListener(
            "onSpeeckCallback", (value: { event: string; message: string }) => {
                if (value.event === 'onQueryAsrResult' && value.message) {
                    let nlpVoiceData = new NlpVoiceData();
                    nlpVoiceData.domain = NlpVoiceEvent.LOCAL_ASR;
                    nlpVoiceData.rawIntent = value.message;
                    nlpVoiceData.firstAction = {
                        action: NlpVoiceEvent.LOCAL_ASR,
                        args: {
                            play_mode: value.message
                        }
                    };

                    this.onNlpListenCallback(nlpVoiceData);
                }
            }
        );
    }

    public onNlpListenCallback(nlpVoiceData: NlpVoiceData): boolean {
        let chain = new Chain(this.TAG);
        this.mIntercepts.forEach((intercept) => {
            chain.addIntercept(intercept);
        });
        return chain.dispatchVoiceEvent(nlpVoiceData);
    };

    public onStop(): void {
        Log.d(this.TAG, 'onStop');
        this.mEmitterSubscription.remove();
    }

}
