import { EndType, StateName } from "./State";
import { Log } from "../../base/log/Log";
import { navigationStore } from "../navigation/NavigationStore";
import { RouterManager } from "../manager/RouterManager";
import { TriggerChannel } from "../../base/constant/TriggerChannel";
import { StateWrapper } from "./StateWrapper";
import { TaskManager } from "../manager/TaskManager";
import { TaskBean } from "../TaskInterface";
// import { DelayUtil } from "../../base/util/DelayUtil";
// import { OpkManager } from "../manager/OpkManager";
// import { BlessSongManager } from "../manager/BlessSongManager";

const TAG = 'Context';
export class Context {

    private mState?: StateWrapper;
    private mLastState?: StateWrapper;
    private readonly mTaskManager: TaskManager;
    private id: number = 0;

    public constructor() {
        this.mTaskManager = new TaskManager();
    }

    // public postState(state: StateWrapper): any {
        //Log.d(TAG + ":" + state.name(), 'postState=' + JSON.stringify(state));
    //     state.setContext(this);
    //     return state.onHandleState(this);
    // }

    public setState(state: StateWrapper) {
        this.id ++;
        this.mState = state;
        this.printState('setState');
        return this;
    }

    // public get isHandlePointState() {
    //     return this.stateName === StateName.TASK_HANDLE_POINT;
    // }

    // public get lastState(): StateWrapper | undefined {
    //     return this.mLastState;
    // }

    // public get state(): StateWrapper | undefined{
    //     return this.mState;
    // }

    // public get stateName(): string | undefined {
    //     return this.state?.name();
    // }

    public handle() {
        return this.handleInner();
    }

    public endTask = (type: EndType, reason: string, extraData?: any) => {
        this.printState(`endTask type=${type},reason: ${reason},extraData=${extraData}`);
        this.mState?.onEndState(type, extraData);
    }

    public goToPoint(point?: string) {
        if (!point) {
            this.printState('point is empty');
            return;
        }
        // this.printState(`goToPoint point=${point},isNavigation=${navigationStore.isNavigation}`);
        // navigationStore.resetState();
        // navigationStore.setCurrentPoint(point);
        // DelayUtil.postDelay(() => {
        //     navigationStore.setIsNavigation(true);
        //     RouterManager.navigation(TriggerChannel.navigation);
        // }, 100);
    }

    public setTitle(title: string): void {
        navigationStore.setTitle(title);
    }

    // public exit(): void {
    //     //Log.d(TAG, 'exit');
    //     this.mState?.onDestroy();
    //     this.mState = undefined;
    //     this.mLastState = undefined;
    //     this.taskManager.exit();
    //     this.id = 0;
    // }

    public get taskManager(): TaskManager {
        return this.mTaskManager;
    }

    public get curTaskBean(): TaskBean | undefined {
        return this.mState?.curTaskBean;
    }

    // public get isNeedBackLastOpk(): boolean {
    //     return OpkManager.lastOpkRouter === TriggerChannel.meal;
    // }

    private handleInner(): any {
        return this.startHandle();
    }

    private startHandle(): any {
        this.mLastState?.onDestroy?.();
        this.mLastState = this.mState;
        this.mState?.setContext(this);
        this.printState('handleState');
        return this.mState?.onHandleState(this);
    }

    protected printState(str: string) {
        // Log.d(`Context:${this.mState?.name()}-${this.id}`,
        //     `${str}, ${JSON.stringify(this.mState, (key, value) => {
        //         if (key === 'context') {
        //             return '';
        //         }
        //         if (value instanceof BlessSongManager) {
        //             return '';
        //         }
        //         return value;
        //     })}`
        // );
    }
}

export const contextStore = new Context();