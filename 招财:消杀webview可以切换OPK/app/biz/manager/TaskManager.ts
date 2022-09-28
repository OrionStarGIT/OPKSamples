import { TaskEvent } from "orionos-eve-core";
import { DeviceEventEmitter } from "react-native";
import { observable, IObservableArray } from 'mobx';
import { Log } from "../../base/log/Log";
import { TaskBean, TaskType } from "../TaskInterface";
import { taskStore } from "../TaskModel";
import { contextStore } from "../state/Context";
import { EndType } from "../state/State";
import { StringUtil } from "../../base/util/StringUtil";
import I18n from "../../source/res/I18n";
import { ActionReportUtil } from "../../report/action/ActionReportUtil";
import { ActionType } from "../../report/action/Action";
import { PlaceManager } from "./PlaceManager";

const TAG = 'TaskManager';
export class TaskManager {
    private taskPastTimer?: NodeJS.Timeout;
    public static TASK_PAST_EVENT = 'task_past_event';
    private mTakeTaskEvents = new Array<TaskEvent>();
    private mLastData?: string;
    private mPlaceList: string[] = [];

    public constructor() {
        PlaceManager.getPlaceList().then((list) => {
            this.setPlaceList(list);
        });
    }

    public startTaskPastTimer(): void {
        this.taskPastTimer && clearTimeout(this.taskPastTimer);
        this.taskPastTimer = setInterval(() => {
            let arr = taskStore.taskData;
            let pastBeans: TaskBean[] = [];
            if (!arr.length) {
                this.clearTaskPastTimer('taskData empty');
                return;
            }
            let i = arr.length;
            while(i--) {
                if (this.isTaskPast(arr[i])) {
                    pastBeans.push(arr[i]);
                    arr.splice(i, 1);
                }
            }

            DeviceEventEmitter.emit(TaskManager.TASK_PAST_EVENT, pastBeans);
            Log.d(TAG, 'task pastBean:' + JSON.stringify(pastBeans));
            Log.d(TAG, 'task curTaskBean:' + JSON.stringify(contextStore.curTaskBean));
            pastBeans.forEach((pastBean) => {
                if (contextStore.curTaskBean?.task_id === pastBean?.task_id) {
                    contextStore.endTask(EndType.CANCEL, 'task past,cancel current');
                }
                if (pastBean) {
                    let actionType;
                    if (pastBean.isTake) {
                        actionType = ActionType.EXCEPTION_NO_TAKE;
                    } else {
                        actionType = ActionType.EXCEPTION_NO_REPLY;
                    }
                    ActionReportUtil.exceptionReport(pastBean, actionType);
                }
            });
        }, 60 * 1000);
    }

    public clearTaskPastTimer(reason: string): void {
        if (this.taskPastTimer) {
            Log.d(TAG, 'clearTaskPastTimer reason=' + reason);
            clearTimeout(this.taskPastTimer);
            this.taskPastTimer = undefined;
        }
    }

    public addReplyTaskQueue(item: TaskBean) {
        taskStore.replyTaskQueue.push(item);
        this.setRobotReply(item.task_id);
    }

    public setRobotReply(taskId: string): void {
        let taskBean = this.getTaskBeanById(taskId);
        taskBean.isRobotReply = true;
        Log.d(TAG, `setRobotReply taskBean=${JSON.stringify(taskBean)}`);
    }

    public isTaskPast(taskBean: TaskBean): boolean {
        let date = Math.round(new Date().getTime() / 1000);
        return date - taskBean.task_time > 30 * 60;
    }

    public deleteTask(taskId: string = '', reason: string): TaskBean {
        if (taskStore.priorityTask?.task_id === taskId) {
            let taskBean = taskStore.priorityTask;
            Log.d(TAG, 'delete priority reason=' + reason + ",taskBean=" + JSON.stringify(taskBean));
            taskStore.setPriorityTask(undefined);
            return taskBean;
        }

        let taskBean = this.deleteTaskInternal(taskId);
        contextStore.setTitle(StringUtil.getString(I18n.currentTaskCount, taskStore.taskCount));
        Log.d(TAG, `deleteTask reason="${reason}, taskBean=${JSON.stringify(taskBean)}"`);
        return taskBean;
    }

    public get takeTaskEvents(): TaskEvent[] {
        return this.mTakeTaskEvents;
    }

    public addTakeTaskEvent(taskId: string, taskType: string): void {
        let taskEvent = new TaskEvent(
            '',
            '',
            '',
            '',
            taskId,
            taskType,
            '',
            0,
        );
        if (!this.mTakeTaskEvents.map((value) => value.taskId).includes(taskId)) {
            this.mTakeTaskEvents.push(taskEvent);
        }
    }

    public getTaskBeanById(taskId?: string): TaskBean{
        let taskBean = {};
        for (let i = 0; i < taskStore.taskData.length; i ++) {
            let value = taskStore.taskData[i];
            if (value.task_id === taskId) {
                taskBean = value;
                break;
            }
        }
        return taskBean as any;
    }

    public exit(): void {
        this.clearTaskPastTimer('task manger exit');
        this.clearTask();
    }

    private deleteTaskInternal(taskId?: string): TaskBean {
        let taskBean = this.getTaskBeanById(taskId);
        let index = taskStore.taskData.indexOf(taskBean);
        if (index !== -1) {
            taskStore.taskData.splice(index, 1);
        }
        return taskBean;
    }

    //是否存在召唤任务转化的任务
    public callPositionToTask(): TaskBean | undefined {
        for (let i = 0; i < taskStore.taskData.length; i ++) {
            let taskBean = taskStore.taskData[i];
            if (taskBean.task_data.context_cdata) {
                return taskBean;
            }
        }
    }

    public clearTask(): void {
        this.mTakeTaskEvents.length = 0;
        taskStore.taskData.length = 0;
        taskStore.replyTaskQueue.length = 0;
        taskStore.setPriorityTask(undefined);
        this.mLastData = undefined;
    }

    public get isAllTaskEmpty(): boolean {
        return taskStore.taskData.length === 0 && !taskStore.priorityTask;
    }

    public isPriorityTask(taskType: TaskType): boolean {
        return (
            taskType === TaskType.zcb_call_birthday
            || taskType === TaskType.zcb_call_position
        );
    }

    public get lastData(): string | undefined {
        return this.mLastData;
    }

    public setLastData(lastData: string) {
        this.mLastData = lastData;
    }

    public setPlaceList(data: string[]): void {
        this.mPlaceList.push(...data);
    }

    public get placeList(): string[] {
        return this.mPlaceList;
    }

    public taskDataDecor(data: TaskBean[]): IObservableArray {
        let result = observable([]);
        if (data && data.length) {
            result = observable(data.map((item) => {
                if (item.isTakePending) {
                    return item;
                }
                return {
                    task_id: item.task_id,
                    task_type: item.task_type,
                    task_data: item.task_data,
                    task_time: item.task_time,
                    availableArrive: this.placeList.includes(item.task_data.pos_name)
                        || this.placeList.includes(item.task_data.from_pos_name),
                };
            }) as any);
        }

        return result;
    }

}