import { DeviceEventEmitter, EmitterSubscription, } from 'react-native';
import { Trigger, TriggerProtocol } from 'orionos-eve-core';
// import { OpkManager } from './OpkManager';
import { Log } from "../../base/log/Log";

const appid = require('../../../package.json').appid;

const TAG = 'RouterManager';

interface RouterBean {
    router: string;
    result: any;
}

export enum RouterParamsKey {
    tier = 'tier',
    tableNum = 'tableNum',
    taskBean = 'taskBean',
    lastRouter = 'lastRouter',
}

export class RouterManager extends Trigger{

    private static readonly CHANNEL = 'routerUtil'

    private static es: EmitterSubscription;
    private static routers = new Array<RouterBean>();
    public static currentRouter: string;
    private static mPrepare?: (router: string, callback: (isSuccess: boolean) => void) => void;

    public static addRouterListener() {
        Log.d(TAG, 'appId=' + appid);
        this.es = DeviceEventEmitter.addListener('workFlowEventChange', (config) => {

            let preConfig = config.preConfig;
            let sceneConfig = config.sceneConfig;
            let newRoute = config.newRoute;

            if (sceneConfig.appId === appid) {
                if (preConfig.appId !== appid) {
                    // OpkManager.OnOpkEnter(newRoute.params?.result, preConfig.key, sceneConfig.key);
                }
                if (this.routers.length === 0
                    || this.routers[this.routers.length - 1] !== sceneConfig.key) {
                    this.currentRouter = sceneConfig.key;
                    this.routers.push({router: this.currentRouter, result: config.newRoute?.params?.result});
                }
                // OpkManager.OnNavigationChange(preConfig.key, sceneConfig.key);
            } else {
                if (preConfig.appId === appid) {
                    this.quitWelcomeOpk();
                }
            }

        });
    }

    public static navigation(router: string, params?: any) {
        this.internalNavigation(router, params)
    }

    public static navigationWithHook(router: string, params?: any, execPrepareFailed?: () => void) {
        if (this.mPrepare) {
            this.mPrepare(router, (isSuccess: boolean) => {
                if (isSuccess) {
                    this.internalNavigation(router, params);
                } else {
                    execPrepareFailed && execPrepareFailed();
                }
            });
        } else {
            this.internalNavigation(router, params)
        }
    }

    public static setPrepare(prepare: any) {
        this.mPrepare = prepare;
    }

    /*
        导航并且清空回退栈
     */
    public static navigationClear(router: string, params?: any): void {
        this.routers.length = 0;
        this.internalNavigation(router, params);
    }

    public static back() {
        let lastRouter = this.lastRouter;
        if (!lastRouter) {
            Log.d(TAG, 'back failed, enter advert');
            return;
        }
        if (lastRouter.router !== this.currentRouter) {
            this.internalNavigation(lastRouter.router, lastRouter.result);
        }
    }

    private static internalNavigation(router: string, params?: any) {
        let protocol = {
            channel: this.CHANNEL,
            eventId: 0,
            type: 0,
            result: params
        };

        new RouterManager(protocol.channel)._trigger(router, protocol);
    }

    private static get lastRouter(): RouterBean | undefined {
        let lastRouter = undefined;
        if (this.routers.length >= 2) {
            let length = this.routers.length;
            let index = length - 2;
            lastRouter = this.routers[index];
            this.routers.length = length - 2;
        }
        Log.d(TAG, 'lastRouter=' + JSON.stringify(lastRouter));
        return lastRouter;
    }

    private static removeRouterListener() {
        this.es?.remove();
    }

    private static quitWelcomeOpk() {
        this.routers.length = 0;
        // OpkManager.OnOpkQuit();
    }

    public static getValue(props: any, key: string) {
        let value;
        try {
            let result = props.navigation.state.params.result;
            value = eval('result.' + key);
        }catch (e) {
        }
        Log.d(TAG, 'value=' + value);
        return value;
    }

    public static gParam(key: string, value: any) {
        Log.d(TAG, `key=${key}, value=${JSON.stringify(value)}`)
        let obj = {};
        Object.defineProperty(obj, key, {
            value: value,
            enumerable : true,
            configurable: true,
        });
        Log.d(TAG, 'obj=' + JSON.stringify(obj));
        return obj;
    }

    public navSwitch(from: string, to: string): void {
    }

    public trigger(protocol: TriggerProtocol): void | boolean {
    }

    public static clearStack() {
        this.routers.splice(0, this.routers.length - 1);
    }
}