import { Trigger, TriggerProtocol } from 'orionos-eve-core';

/**
 * 页面路由跳转，可从业务流程切换到主流程
 */
export class MainTrigger extends Trigger {

    public constructor() {
        //super参数为Trigger与ViewModel相互通信的标识，必须保证与ViewModel的一致
        super('main');
    }

    public navSwitch(from: string, to: string): void {
    }

    /**
     * 接收处理ViewModel发送过来的消息
     *
     * @param protocol
     */
    public trigger(protocol: TriggerProtocol): void | boolean {
        switch (protocol.eventId) {
            case 10013:
                this._trigger('jump_to_app', protocol);
                break;
        }
        return undefined;
    }

}
