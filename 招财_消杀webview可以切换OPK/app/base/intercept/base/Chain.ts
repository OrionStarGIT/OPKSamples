import { NlpVoiceData } from 'orionos-eve-core';
import { BaseVoiceIntercept } from './BaseVoiceIntercept';
import { NlpVoiceEvent } from './NlpVoiceEvent';
import { Log } from "../../log/Log";

export class Chain {
    public mStart?: BaseVoiceIntercept;
    public mEnd?: BaseVoiceIntercept;
    public mSize: number = 0;
    private readonly TAG: string;

    public constructor(tag: string, ...intercepts: BaseVoiceIntercept[]) {
        intercepts.forEach((value) => {
            this.addIntercept(value);
        });
        this.TAG = 'Chain:' + tag;
    }

    //尾结点插入
    public addIntercept(intercept: BaseVoiceIntercept) {
        if (!intercept.TAG.includes(this.TAG)) {
            intercept.TAG = this.TAG + ':' + intercept.TAG
        }
        if (!this.mEnd) {
            this.mStart = intercept;
        } else {
            this.mEnd.next = intercept;
            intercept.pre = this.mEnd;
        }
        this.mEnd = intercept;
        this.mSize ++;
    }

    public dispatchVoiceEvent(nlpVoiceData: NlpVoiceData) {
        let nlpVoiceEvent = NlpVoiceEvent.getNlpVoiceEvent(nlpVoiceData);
        Log.d(this.TAG, 'chain toString' + this.toString());
        Log.d(this.TAG, 'dispatchVoiceEvent nlpVoiceEvent=' + JSON.stringify(nlpVoiceEvent));
        if (this.mStart) {
            return this.mStart.dispatchVoiceEvent(nlpVoiceEvent);
        }
        return false;
    }

    public toString() {
        let intercept = this.mStart;
        if (!intercept) {
            Log.d(this.TAG, 'intercept is empty');
            return '';
        }
        let names = '';
        names += "size=" + this.mSize+",";
        do {
            names += intercept?.TAG+":[pre=";
            names += intercept.pre?.name() + ",next=" + intercept.next?.name()+"],";
            intercept = intercept?.next;
        }while (!!intercept);
        return names;
    }
}