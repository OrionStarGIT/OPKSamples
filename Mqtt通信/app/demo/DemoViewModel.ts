import {BaseViewModel} from 'orionos-eve-core';
import {Client} from 'paho-mqtt';
import {demoModel} from './DemoModel';

/**
 * 业务逻辑
 */

const TAG = 'DemoViewModel';

export class DemoViewModel extends BaseViewModel {

    private mTimer: any;
    private mClient: Client | undefined;

    public constructor() {
        super('Demo');
    }

    public onStart(): void {
        console.log(TAG, 'onStart');
        this.mTimer = setTimeout((): void => {
            this.hideEmojiPlayer();
        }, 200);
    }

    public onStop(): void {
        console.log(TAG, 'onStop');
        if (this.mTimer) {
            clearTimeout(this.mTimer);
        }
    }

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }


    public showSpeechText(text: string) {
        console.log('DemoVoice : set ' + text);
        demoModel.setInfoText(text);
    }

    public initMqttClient() {
        if (this.mClient && this.mClient.isConnected()) {
            console.log(TAG, 'MQTT client already initialized');
            return;
        }
        this.mClient = new Client('broker.hivemq.com', 8000, 'clientId');
        // 连接处理
        this.mClient.connect({
            onSuccess: () => {
                console.log(TAG, 'Connected to MQTT broker');
                this.mClient?.subscribe('test/topic');
                this.mClient?.send('test/topic', 'Hello MQTT');
            },
            onFailure: (err) => {
                console.log(TAG, 'Failed to connect to MQTT broker', err);
            },
            keepAliveInterval: 60, // 设置心跳间隔
            reconnect: true // 启用自动重连
            // userName: 'your-username', // 添加用户名
            // password: 'your-password'  // 添加密码
        });

        // 消息处理
        this.mClient.onMessageArrived = (message) => {
            console.log(TAG, `Received message: ${message.payloadString} on topic: ${message.destinationName}`);
        };
        // 连接丢失处理
        this.mClient.onConnectionLost = (err) => {
            console.log(TAG, 'Connection lost', err);
        };
    }

    public sendMqttTestMessage() {
        if (!this.mClient || !this.mClient.isConnected()) {
            console.log(TAG, 'sendMqttTestMessage MQTT client not initialized');
            return;
        }
        //时间戳 2024-01-01 00:00:00
        this.mClient.send('test/topic', 'Hello MQTT, current time is ' + this.getCurrentDateTime());
    }

    public closeMqttClient() {
        if (!this.mClient || !this.mClient.isConnected()) {
            console.log(TAG, 'closeMqttClient MQTT client not initialized');
            return;
        }
        this.mClient.disconnect();
    }

    private getCurrentDateTime(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return '' + year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
}
