import { Trigger, TriggerProtocol } from 'orionos-eve-core';

/**
 * 页面路由跳转，可从业务流程切换到主流程
 */
export class DemoTrigger extends Trigger {

    public constructor() {
        //super参数为Trigger与ViewModel相互通信的标识，必须保证与ViewModel的一致
        super('Demo');
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
            case 1001:
                //页面路由跳转，单独调试的时候无效， 可能会出现红屏，在作为插件安装后，可跳转其它功能
                //跳转到首页，home为在index.js中注册的appKey
                this._trigger('home', protocol);
                break;
            case 1002:
                this._trigger('home', protocol);
                break;
            case 1003:
                this._trigger('wakeUp', protocol);
                break;
            case 1004:
                this._trigger('queryLocation', protocol);
                break;
            case 1005:
                this._trigger('reception', protocol);
                break;
            case 1006:
                this._trigger('navigation', protocol);
                break;
            case 1007:
                this._trigger('guide', protocol);
                break;
            case 1008:
                this._trigger('advert', protocol);
                break;
            case 1009:
                this._trigger('cruise', protocol);
                break;
            case 1010:
                this._trigger('dance', protocol);
                break;
            case 1011:
                this._trigger('groupPhoto', protocol);
                break;
            case 1012:
                protocol.result = {param1: 'value1',param2: 'value2'};
                this._trigger('get_props', protocol);
                break;                
        }
        return undefined;
    }

}
