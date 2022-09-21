import { AppManager, BaseViewModel, RobotSettingApi } from 'orionos-eve-core';
import { demoModel } from './DemoModel';

const TAG = 'DemoViewModel.ts 验证生命周期';
/**
 * 业务逻辑
 */
export class DemoViewModel extends BaseViewModel {

    public constructor() {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('Demo');
        RobotSettingApi.getRobotString('robot_name')
        .then((result: string): void => {
            console.log('charge type:', result);
        })
        .catch((e: any): void => {
            console.log('type err:', e);
        });
    }

    public onStart() {
        console.log(TAG, 'hgx=======生命周期: DemoViewModel.onStart()');
        console.log(TAG, 'hgx=======生命周期: 导航服务 DemoViewModel.onStart() 1' + AppManager.getAppId());
        AppManager.setAppInfo('e353b6dad9d3b1a351f3e542aba7da72', 'main');
        console.log(TAG, 'hgx=======生命周期: 导航服务 DemoViewModel.onStart() 2' + AppManager.getAppId());
        console.log(TAG, 'hgx=======生命周期: 导航服务 DemoViewModel.onStart() _channel' + this._channel );
    }

    public onStop() {

    }

    public startMain() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    public showSpeechText(text: string) {
        demoModel.setInfoText(text);
    }

}
