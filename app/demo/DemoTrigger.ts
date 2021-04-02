import { Trigger, TriggerProtocol } from 'orionos-eve-core';
import { DemoEvent } from './DemoEvent';

/**
 * 页面路由跳转
 * 可从业务流程切换到主流程
 */
export class DemoTrigger extends Trigger {

    /**
     * 构造函数
     */
    public constructor() {
        //super参数为Trigger与ViewModel相互通信的标识，必须保证与ViewModel的一致
        super('Demo');
    }

    /**
     * 触发跳转
     * @param from-来源页面
     * @param to-目标页面
     */
    public navSwitch(from: string, to: string): void {
    }

    /**
     * 接收处理ViewModel发送过来的消息
     * @param protocol-trigger信息
     */
    public trigger(protocol: TriggerProtocol): void {
        switch (protocol.eventId) {
            case DemoEvent.exit:
                //页面路由跳转，单独调试的时候无效， 可能会出现红屏，在作为插件安装后，可跳转其它功能
                //跳转到首页，home为在index.js中注册的appKey
                this._trigger('home', protocol);
                break;
            case DemoEvent.config:
                this._trigger('config', protocol);
                break;
            default:
                break;
        }
    }

}
