import { OnVoiceEvent } from './OnVoiceEvent';
import { NlpVoiceEvent } from './NlpVoiceEvent';
import { Log } from "../../log/Log";

/**
 * 事件机制：同Android的事件分发机制类似
 * 采用双向链表，记录上一个和下一个voice，事件分发如同一个u字形，
 * 如果可能的话，从第一个到最后一个，然后从最后一个到第一个
'   Chain=size=3,
        OtherVoiceIntercept:[pre=undefined,next=TaskVoiceIntercept],
        TaskVoiceIntercept:[pre=OtherVoiceIntercept,next=AdvertChatVoiceIntercept],
        AdvertChatVoiceIntercept:[pre=TaskVoiceIntercept,next=undefined],
    ----------------------------------------------------------------
    'OtherVoiceIntercept', 'dispatchVoiceEvent tell_me_why&common,pre=undefined,next=TaskVoiceIntercept'
    'OtherVoiceIntercept', 'onInterceptVoiceEvent=false'
    'TaskVoiceIntercept', 'dispatchVoiceEvent tell_me_why&common,pre=OtherVoiceIntercept,next=AdvertChatVoiceIntercept'
    'TaskVoiceIntercept', 'onInterceptVoiceEvent=false'
    'AdvertChatVoiceIntercept', 'dispatchVoiceEvent tell_me_why&common,pre=TaskVoiceIntercept,next=undefined'
    'AdvertChatVoiceIntercept', 'onInterceptVoiceEvent=true'
    'AdvertChatVoiceIntercept', 'onVoiceActionEvent result=false'
    'AdvertChatVoiceIntercept', 'onVoiceEvent result=false'
    'TaskVoiceIntercept', 'onVoiceActionEvent result=false'
    'TaskVoiceIntercept', 'onVoiceEvent result=false'
    'OtherVoiceIntercept', 'onVoiceActionEvent result=false'
    'OtherVoiceIntercept', 'onVoiceEvent result=false'
 */
export abstract class BaseVoiceIntercept implements OnVoiceEvent{

    public next?: BaseVoiceIntercept;
    public pre?: BaseVoiceIntercept;
    public TAG: string = '';
    private disallowIntercept: boolean = false;

    public constructor() {
        this.TAG = this.name();
    }

    public dispatchVoiceEvent(event: NlpVoiceEvent): boolean {
        if (event.mAlreadyBack) {
            return this.handlerPreTransform(event);
        }
        Log.d(this.TAG, "dispatchVoiceEvent " + event.mIntent
            + ',pre=' + this.pre?.TAG + ",next=" + this.next?.TAG);

        let intercepted;
        if (this.disallowIntercept) {
            intercepted = false;
        } else {
            intercepted = this.onInterceptVoiceEvent(event);
        }

        Log.d(this.TAG, 'onInterceptVoiceEvent=' + intercepted)
        if (intercepted) {
            event.mAlreadyBack = true;
            return this.handlerPreTransform(event);
        } else {
            if (this.next) {
                return this.next?.dispatchVoiceEvent(event);
            } else {
                event.mAlreadyBack = true;
                return this.handlerPreTransform(event)
            }
        }
    }

    public requestDisallowInterceptVoiceEvent(disallowIntercept: boolean) {
        //父类都设置为disallowIntercept
        let parent = this.pre;
        while (parent != null) {
            parent.setDisallowIntercept(disallowIntercept);
            parent = parent.pre;
        }
    }

    public onInterceptVoiceEvent(event: NlpVoiceEvent): boolean {
        return false;
    }

    public onVoiceActionEvent(event: NlpVoiceEvent): boolean {
        return false;
    }

    public onVoiceEvent(event: NlpVoiceEvent): boolean {
        return false;
    }

    public abstract name(): string;

    /**
     * 处理拦截的事件，将onVoiceEvent往上抛
     * @param event
     */
    private handlerPreTransform(event: NlpVoiceEvent): boolean {
        let result = this.onVoiceActionEvent(event);
        Log.d(this.TAG, "onVoiceActionEvent result=" + result)
        if (result) {
            return true;
        }
        result = this.onVoiceEvent(event);
        Log.d(this.TAG, "onVoiceEvent result=" + result)
        if (result) {
            return true;
        }
        if (this.pre) {
            return this.pre?.dispatchVoiceEvent(event);
        }
        return false;
    }

    public setDisallowIntercept(disallowIntercept: boolean) {
        this.disallowIntercept = disallowIntercept;
    }
}