import { ImageProps } from "react-native";
import { autorun } from 'mobx';
import { BaseMyViewModel } from "../base/BaseMyViewModel";
// import I18n from "../../source/res/I18n";
// import { Log } from "../../base/log/Log";
// import { contextStore } from "../state/Context";
// import { TaskReplyState } from "../state/impl/TaskReplyState";
// import { taskStore } from "../TaskModel";
// import { TaskBean, TaskType } from "../TaskInterface";
// import { CountManager } from "../manager/CountManager";
// import { TakeRet, TaskApi } from "../repository/TaskApi";
// import { TaskReportUtil } from "../../report/taskevent/TaskReportUtil";
// import { TTSPlayerManager } from "../manager/TTSPlayerManager";
// import { ActionReportUtil } from "../../report/action/ActionReportUtil";
// import { ActionType } from "../../report/action/Action";
// import { StringUtil } from "../../base/util/StringUtil";
// import { FeatureConfig } from "../../base/config/FeatureConfig";
// import { BlessSongManager } from "../manager/BlessSongManager";
// import { TaskGetState } from "../state/impl/TaskGetState";
// import { TaskFinalState } from "../state/impl/TaskFinalState";

export class TaskPendingViewModel extends BaseMyViewModel{

    // private itemTitleMap = new Map<TaskType, string>();
    // private countManagerArray: CountManager[] = [];
    // private needDeleteWhenStopTaskArray: TaskBean[] = [];
    private handlePressTime: number = 0;
    private handlePressTimeout?: NodeJS.Timeout;
    // private blessManager: BlessSongManager;
    private timeInterval?: NodeJS.Timeout;
    private ttsTimeInterval?: NodeJS.Timeout;

    public constructor() {
        super('TaskPendingViewModel');
        // this.generateItemTitle();
        // this.blessManager = new BlessSongManager();
        // this.timeInterval = setInterval(() => {
        //     contextStore.postState(new TaskGetState(
        //         {isSilence: true, needPriorityTask: false,tts: ''})
        //     );
        // }, 5000);
        // this.ttsTimeInterval = setInterval(() => {
        //     this.playPendingTTS();
        // }, 10 * 1000);
        // this.playPendingTTS();
    }

    public onStart(): void {
        super.onStart();
        // this.blessManager.playNew();
    }

    public onStop(): void {
        super.onStop();
        // this.countManagerArray.forEach((countManger) => {
        //     countManger.clearIntervalTime();
        // });
        // this.countManagerArray.length = 0;
        // this.needDeleteWhenStopTaskArray.length = 0;
        // this.disposer();
        // TTSPlayerManager.stopTTS('pending onStop');
        // this.blessManager.destroyPlayer();
        // this.clearGetTaskInterval();
        // this.clearTTSInterval();
    }

    // public get data(): TaskBean[] {
    //     return taskStore.taskData;
    // }

    // public getTaskTypeName(taskType: TaskType): string | undefined {
    //     switch (taskType) {
    //         case TaskType.zcb_clear_table:
    //             return I18n.clearTable;
    //         case TaskType.zcb_call_waiter:
    //             return I18n.waiter;
    //         case TaskType.zcb_ask_hurry:
    //             return I18n.pushFood;
    //         case TaskType.zcb_need_tableware:
    //             return I18n.lackTableware;
    //     }
    // }

    // public getItemTitle(item: TaskBean): string {
    //     if (item.isCancel) {
    //         return I18n.taskCanceled;
    //     }
    //     let result = this.itemTitleMap.get(item.task_type);
    //     if (!result) {
    //         result = '';
    //     }
    //     return result;
    // }

    // public getHandleBtnTextArray(item: TaskBean): string[] {
    //     if (item.task_type === TaskType.zcb_need_tableware) {
    //         let robotDeliveryText = I18n.robotDeliveryTableware;
    //         if(item.tier) {
    //             robotDeliveryText = StringUtil.getString(I18n.robotDeliveryTablewareWithTier, item.tier);
    //         }
    //         return [robotDeliveryText, I18n.humanDeliveryTableware];
    //     } else {
    //         return [I18n.robotReply, I18n.noNeedRobotReply];
    //     }
    // }

    // public getHandleBtnText(item: TaskBean): string {
    //     if (item.isRobotReply) {
    //         return this.getHandleBtnTextArray(item)[0];
    //     }
    //     if (item.isNoNeedRobotReply) {
    //         return this.getHandleBtnTextArray(item)[1];
    //     }
    //     return I18n.handleTask;
    // }

    //认领任务
    // public takeTask(item: TaskBean): Promise<TakeRet> {
    //     if (item.isTakePending) {
    //         return new Promise<TakeRet>(() => {});
    //     }
    //     item.isTakePending = true;
    //     TTSPlayerManager.stopTTS('take task');
    //     this.clearTTSInterval();
    //     this.handlePressTime = new Date().getTime();
    //     this.handlePressTimeout && clearTimeout(this.handlePressTimeout);
    //     return new Promise<TakeRet>((resolve) => {
    //         TaskApi.taskTake(item.task_id).then((value) => {
    //             let diff = new Date().getTime() - this.handlePressTime;
    //             Log.d(this.TAG, 'diff=' + diff);
    //             if (!item.isTake) {
    //                 if (diff < 1500) {
    //                     this.handlePressTimeout = setTimeout(() => {
    //                         item.isTake = value === TakeRet.OK;
    //                         resolve(value);
    //                         if (item.isTake) {
    //                             if (!this.isDestroy) {
    //                                 TTSPlayerManager.playText(I18n.taskTakeTTS);
    //                             }
    //                             contextStore.taskManager.addTakeTaskEvent(item.task_id, item.task_type);
    //                             TaskReportUtil.reportWorkRobotTask();
    //                             ActionReportUtil.handleReport(item, ActionType.HANDLE_TASK);
    //                         } else {
    //                             item.isTakePending = false;
    //                         }
    //                     }, 1500 - diff);
    //                 } else {
    //                     resolve(value);
    //                 }
    //             } else {
    //                 resolve(TakeRet.OK);
    //             }
    //         });
    //     });
    // }

    //取消任务
    // public cancelTask(item: TaskBean, isReportWaiter: boolean = true): Promise<boolean> {
    //     this.clearTTSInterval();
    //     TTSPlayerManager.stopTTS('cancel task');
    //     return new Promise<boolean>((resolve) => {
    //         TaskApi.taskCancel(item.task_id).then((value) => {
    //             if (value) {
    //                 contextStore.taskManager.deleteTask(item.task_id, 'cancelTask');
    //                 if (isReportWaiter) {
    //                     ActionReportUtil.cancelReport(item, ActionType.CANCEL_WAITER);
    //                 }
    //             }
    //             resolve(value);
    //         });
    //     });
    // }

    //选择【机器人回复/递送】
    // public robotReply(item: TaskBean): void {
    //     TaskReportUtil.reportStart(item);
    //     contextStore.taskManager.addReplyTaskQueue(item);
    //     if (item.task_type === TaskType.zcb_need_tableware) {
    //         //机器人递送
    //         ActionReportUtil.handleReport(item, ActionType.HANDLE_DELIVERY_TABLEWARE);
    //         TTSPlayerManager.playText(I18n.robotDeliveryTTS);
    //     } else {
    //         //机器人回复
    //         ActionReportUtil.handleReport(item, ActionType.HANDLE_ROBOT_REPLY);
    //         TTSPlayerManager.playText(I18n.robotReplayTTS);
    //     }
    // }

    //选择【无需机器人回复/递送】
    //直接提示成功
    // public noNeedRobotReply(item: TaskBean): Promise<boolean> {
    //     return new Promise<boolean>((resolve) => {
    //         let tableNum = item.task_data.from_pos_name;
    //         TaskApi.taskManual(item.task_id).then((value) => {
    //             resolve(value);
    //             if (value) {
    //                 item.isNoNeedRobotReply = true;
    //                 this.needDeleteWhenStopTaskArray.push(item);
    //                 let countManager = new CountManager(600, 'TaskPendingViewModel');
    //                 countManager.startIntervalCount(() => {
    //                     contextStore.taskManager.deleteTask(item.task_id, 'count end,no need robot reply');
    //                 });
    //                 this.countManagerArray.push(countManager);
    //                 if (item.task_type === TaskType.zcb_need_tableware) {
    //                     this.playTTSToDesk(StringUtil.getString(I18n.humanDeliveryTTS, tableNum));
    //                     ActionReportUtil.handleReport(item, ActionType.HANDLE_HUMAN_TABLEWARE);
    //                 } else {
    //                     let typeName = '';
    //                     if (item.task_type === TaskType.zcb_call_waiter) {
    //                         typeName = I18n.waiter;
    //                     } else if (item.task_type === TaskType.zcb_clear_table) {
    //                         typeName = I18n.clearTable;
    //                     } else if (item.task_type === TaskType.zcb_ask_hurry) {
    //                         typeName = I18n.pushFood;
    //                     }
    //                     this.playTTSToDesk(StringUtil.getString(I18n.humanReplyTTS, tableNum, typeName));
    //                     ActionReportUtil.handleReport(item, ActionType.HANDLE_NO_ROBOT_REPLY);
    //                 }
    //             } else {
    //                 contextStore.taskManager.deleteTask(item.task_id, 'no need robot');
    //             }
    //         });
    //     });
    // }

    // public get hasRobotReplyTask(): boolean {
    //     let hasComplete = false;

    //     this.data.forEach((value, index) => {
    //         if (value.isRobotReply) {
    //             hasComplete = true;
    //         }
    //     });

    //     return hasComplete;
    // }

    //是否所有任务都是人工回复/递送
    // public get isAllTaskHumanReplay() {
    //     let isAllHumanReplay = false;
    //     for (let i = 0; i < this.data.length; i ++) {
    //         if (this.data[i].isNoNeedRobotReply) {
    //             isAllHumanReplay = true;
    //         } else {
    //             isAllHumanReplay = false;
    //             break;
    //         }
    //     }
    //     Log.d(this.TAG, 'isAllTaskHumanReplay=' + isAllHumanReplay);
    //     return isAllHumanReplay;
    // }

    // public get hasHandledCompleteTask(): boolean {
    //     let hasComplete = false;

    //     this.data.forEach((value, index) => {
    //         if (value.isRobotReply || value.isNoNeedRobotReply) {
    //             hasComplete = true;
    //         }
    //     });

    //     return hasComplete;
    // }

    // public get isDisableBtnComplete(): boolean {
    //     return !this.hasHandledCompleteTask;
    // }

    // public getTablewareText(item: TaskBean): string {
    //     let text = '';
    //     let tablewareList = item.task_data.tableware_list;
    //     if (tablewareList) {
    //         tablewareList.forEach((tablewareBean, index) => {
    //             text +=  `${tablewareBean.tableware.tableware_name}*${tablewareBean.count}`;
    //             if (tablewareList && index !== tablewareList.length - 1) {
    //                 text += ',';
    //             }
    //         });
    //     }
    //     return text;
    // }

    // public getImage(item: TaskBean): ImageProps | undefined {
    //     switch (item.task_type) {
    //         case TaskType.zcb_ask_hurry:
    //             return require('../../../img/taskpending/push_food_icon.png');
    //         case TaskType.zcb_need_tableware:
    //             return require('../../../img/taskpending/lack_tableware_icon.png');
    //         case TaskType.zcb_call_waiter:
    //             return require('../../../img/taskpending/look_up_waiter_icon.png');
    //         case TaskType.zcb_clear_table:
    //             return require('../../../img/taskpending/clear_table_icon.png');
    //     }
    // }

    // public confirm = (): void => {
    //     Log.d(this.TAG, `needDelete=${JSON.stringify(this.needDeleteWhenStopTaskArray)}`);
    //     this.clearGetTaskInterval();
    //     this.needDeleteWhenStopTaskArray.forEach((taskBean) => {
    //         contextStore.taskManager.deleteTask(taskBean.task_id, 'confirm,no need robot reply');
    //     });
    //     ActionReportUtil.leaveHandlePointReport();
    //     if (!this.hasRobotReplyTask) {
    //         TTSPlayerManager.playTextDelay(I18n.taskHandleComplete, 500);
    //         contextStore.setState(new TaskFinalState()).handle();
    //         return;
    //     }
    //     //去回复顾客
    //     contextStore.setState(new TaskReplyState(taskStore.replyTaskQueue)).handle();
    //     taskStore.replyTaskQueue.forEach((item) => {
    //         TaskReportUtil.reportHandle(item);
    //     });
    // }

    // private generateItemTitle(): void {
    //     this.itemTitleMap.set(TaskType.zcb_ask_hurry, I18n.pushFoodTitle);
    //     this.itemTitleMap.set(TaskType.zcb_need_tableware, I18n.lackTablewareTitle);
    //     this.itemTitleMap.set(TaskType.zcb_clear_table, I18n.clearTableTitle);
    //     this.itemTitleMap.set(TaskType.zcb_call_waiter, I18n.lookWaiterTitle1);
    // }

    // private disposer = autorun(() => {
    //     try {
    //         if (taskStore.taskCount === 0) {
    //             Log.d(this.TAG, 'task count 0,trigger desk');
    //             contextStore.setState(new TaskFinalState()).handle();
    //         }
    //     }catch (e) {
    //     }
    // })

    // public OnDrawerEndTask(): void {
    //     super.OnDrawerEndTask();
    //     contextStore.taskManager.takeTaskEvents.forEach((bean) => {
    //         let taskBean = contextStore.taskManager.getTaskBeanById(bean.subTaskId);
    //         Log.d(this.TAG, 'drawer end cancel taskBean:' + JSON.stringify(taskBean))
    //         if (taskBean.task_id) {
    //             this.cancelTask(taskBean, false).then((result) => {
    //                 if (result) {
    //                     ActionReportUtil.drawerCancelReport(taskBean, ActionType.DRAWER_CANCEL_HANDLE_POINT);
    //                 }
    //             });
    //         }
    //     });
    //     contextStore.taskManager.clearTask();
    // }

    // public get floors(): string[] {
    //     let result = new Array<string>();
    //     let layers = FeatureConfig.getLayers();
    //     for (let i = 1; i <= layers; i ++) {
    //         result.push(String(i));
    //     }

    //     return result;
    // }

    // private playTTSToDesk(tts: string) {
    //     TTSPlayerManager.playTextWithCallback(tts, (reason: string) => {
    //         if (this.isAllTaskHumanReplay) {
    //             contextStore.setState(new TaskFinalState()).handle();
    //             contextStore.taskManager.clearTask();
    //         }
    //     });
    // }

    // private pendingCount(): number {
    //     let count = 0;

    //     taskStore.taskData.forEach((item) => {
    //         if (!item.isRobotReply && !item.isNoNeedRobotReply) {
    //             count ++;
    //         }
    //     });

    //     return count;
    // }

    private clearTTSInterval() {
        if (this.ttsTimeInterval) {
            clearInterval(this.ttsTimeInterval);
            this.ttsTimeInterval = undefined;
        }
    }

    private clearGetTaskInterval(): void {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
            this.timeInterval = undefined;
            // Log.d(this.TAG, 'clearGetTaskInterval');
        }
    }

    // private playPendingTTS(): void {
    //     if (this.pendingCount()) {
    //         let tts = StringUtil.getString(I18n.pendingTaskCount, this.pendingCount());
    //         TTSPlayerManager.playTextAfterTTSComplete(tts);
    //     }
    // }
}