import { EndType, State, StateName } from "./State";
import { Context } from "./Context";
import { Log } from "../../base/log/Log";
import { TaskManager } from "../manager/TaskManager";
import { TaskBean } from "../TaskInterface";

export abstract class StateWrapper implements State{
    protected context!: Context;
    protected TAG: string = "Context:" + this.name();
    private mIsDestroy: boolean = false;

    public abstract onHandleState(context: Context): any;
    public abstract onEndState(type: EndType, extraData?: any): void;
    public abstract name(): StateName;
    public curTaskBean!: TaskBean;

    public setContext(context: Context): void {
        this.context = context;
    }

    public onDestroy(): void {
        Log.d(this.TAG, 'onDestroy');
        this.mIsDestroy = true;
    }

    protected setState(state: StateWrapper) {
        return this.context.setState(state);
    }

    protected handle(): any {
        return this.context?.handle();
    }

    public get taskManager(): TaskManager {
        return this.context.taskManager;
    }

    public get isDestroy(): boolean {
        return this.mIsDestroy;
    }
}