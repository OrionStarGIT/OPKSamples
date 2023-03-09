import { speechApi, Trigger, TriggerProtocol } from 'orionos-eve-core';

/**
 * 页面路由跳转，可从业务流程切换到主流程
 */
export class HeadTurnTrigger extends Trigger {

    public constructor() {
        //super参数为Trigger与ViewModel相互通信的标识，必须保证与ViewModel的一致
        super('HeadTurn1199');
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
            case 36362226:
                //页面路由跳转，单独调试的时候无效， 可能会出现红屏，在作为插件安装后，可跳转其它功能
                //跳转到首页，home为在index.js中注册的appKey
                console.log("最后一步有没有走到这里");
                this._trigger('home', protocol);
                break;
            case 36362227:
                console.log("最后一步有没有走到这里triggerToHome");
                this._trigger('home', protocol);
                break;
            case 36362228:
                console.log("最后一步有没有走到这里triggerToWakeup");
                this._trigger('wakeUp', protocol);
                break; 
            case 36362229:
                console.log("最后一步有没有走到这里triggerToQueryLocation");
                this._trigger('queryLocation', protocol);
                break; 
            case 36362230:
                console.log("最后一步有没有走到这里triggerToWeather");
                speechApi.queryByText("今天天气");
                this._trigger('weather', protocol);
                break;
        }
        return undefined;
    }

}
