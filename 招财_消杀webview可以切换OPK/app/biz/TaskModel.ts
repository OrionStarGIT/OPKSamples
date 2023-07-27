import { observable } from 'mobx';
import { TaskBean } from "./TaskInterface";
import { contextStore } from "./state/Context";

const TAG = 'TaskModel';
export class TaskModel {

    private state = observable({
        taskData: observable(new Array<TaskBean>()),
        robotReplyTaskData: observable(new Array<TaskBean>()),
    });

    //高优先级任务，一次执行一个，eg：召唤任务，生日祝福任务
    private mPriorityTask?: TaskBean;

    public setTaskData(data: TaskBean[]): void {
        let taskManager = contextStore.taskManager;
        this.state.taskData = taskManager.taskDataDecor(data);
        console.log(TAG, 'setTaskData');
    }

    public get taskData(): TaskBean[] {
        return this.state.taskData;
    }

    //所有任务的个数
    public get taskCount(): number {
        return this.state.taskData.length;
    }

    public get replyTaskQueue(): TaskBean[] {
        return this.state.robotReplyTaskData;
    }

    public setPriorityTask(taskBean: TaskBean | undefined) {
        this.mPriorityTask = taskBean;
    }

    public get priorityTask(): TaskBean | undefined {
        return this.mPriorityTask;
    }

}

export const taskStore = new TaskModel();