import {
    ComponentErrorConst,
    ComponentEvent,
    ComponentStatusConst,
    Reports,
    RobotApi
} from "orionos-eve-core";
import { contextStore } from "../biz/state/Context";
import { TaskBean, TaskType } from "../biz/TaskInterface";
import { AsyncStorageManager } from "../biz/manager/AsyncStorageManager";
import { Log } from "../base/log/Log";
import { FeatureConfig } from "../base/config/FeatureConfig";
import { TriggerChannel } from "../base/constant/TriggerChannel";

export enum EventType {
    EVENT_TYPE_DESTINATION_UNREACHABLE = 1,
    EVENT_TYPE_AVOID_START,
    EVENT_TYPE_AVOID_END,
    EVENT_TYPE_EMERGENCY,
    EVENT_TYPE_PATH_PLANNING_FAILED,
    EVENT_TYPE_OUT_MAP,
    EVENT_TYPE_OTHER,
    EVENT_TYPE_AVOID_CONTINUE,
    EVENT_TYPE_OBSTACLES_AVOID,
    EVENT_TYPE_NOT_ESTIMATE,
    EVENT_TYPE_WHEEL_OVER_CURRENT_RUN_OUT,
}

const TAG = 'ReportUtil';
export class ReportUtil {

    public static waiterLinkId: string;

    public static reportTask(result: any, key: string) {
        let taskId = result?.taskId;
        Log.d(TAG, 'reportTask taskId=' + taskId);
        let taskMode = 'zcb_customer_helper';
        FeatureConfig.setTaskMode(taskMode);
        RobotApi.taskModeReport(Number(''), taskId ? taskId : '', taskMode, 0);
        this.waiterLinkId = this.UUID;
        let type;
        if (result?.taskId) {
            type = 1;
        } else if (key === TriggerChannel.transition) {
            type = 2;
        } else {
            type = 3;
        }
        this.opkEnterReport(type);
    }

    /**
     * @param type 1:小程序切换模式 2:小程序下发跑堂任务 3:其他
     */
    public static opkEnterReport(
        type: 1 | 2 | 3 | number,
    ): void {
        let tableName = 'sc_restaurant_waiter_opk_start';
        let waiter_link_id = this.waiterLinkId;
        let ctime: number = new Date().getTime();
        Reports.reportMsg({ type, tableName, waiter_link_id, ctime });
    }

    /**
     *
     * @param taskContent 任务数据
     * @param task_num 列表的任务数量
     */
    public static waiterListReport(
        taskContent: TaskBean[],
        task_num: number,
    ): void {
        let tableName = 'sc_restaurant_waiter_tasklist';
        let waiter_link_id = this.waiterLinkId;
        let ctime: number = new Date().getTime();
        let task_content = JSON.stringify(taskContent.map((value) => {
            return {
                task_id: value.task_id,
                task_type: value.task_type,
                pos_name: value.task_data.pos_name,
                from_pos_name: value.task_data.from_pos_name,
                task_time: value.task_time,
                from: value.task_data.context_cdata ? 2 : 1,
                is_cango: value.availableArrive ? 1 : 0,
            };
        }));
        Reports.reportMsg({ task_content, task_num, tableName, waiter_link_id, ctime });
    }

    public static opkSettingsReport(type: string, value: string) {
        let opk_type = 5;
        let tableName = 'sc_restaurant_opk_setting';
        let waiter_link_id = this.waiterLinkId;
        let ctime: number = new Date().getTime();
        Reports.reportMsg({ type, value, opk_type, tableName, waiter_link_id, ctime });
    }

    public static navigationStatusEventReport(event: ComponentEvent) {
        let eventSubType = 0;
        if (event.extraData) {
            let extraData = JSON.parse(event.extraData);
            let code = extraData.code;
            if (code) {
                eventSubType = code;
            }
        }
        switch (event.status) {
            case ComponentStatusConst.STATUS_NAVIGATION_AVOID_IMMEDIATELY:
                this.waiterEventReport(EventType.EVENT_TYPE_AVOID_START, eventSubType);
                break;
            case ComponentStatusConst.STATUS_NAVIGATION_AVOID:
                this.waiterEventReport(EventType.EVENT_TYPE_AVOID_CONTINUE, eventSubType);
                break;
            case ComponentStatusConst.STATUS_NAVIGATION_AVOID_END:
                this.waiterEventReport(EventType.EVENT_TYPE_AVOID_END, eventSubType);
                break;
            case ComponentStatusConst.STATUS_OBSTACLES_AVOID:
                this.waiterEventReport(EventType.EVENT_TYPE_OBSTACLES_AVOID, eventSubType);
                break;
        }
    }

    public static navigationFinishEventReport(event?: ComponentEvent) {
        let eventSubType = 0;
        if (event?.extraData) {
            let extraData = JSON.parse(event.extraData);
            let code = extraData.code;
            if (code) {
                eventSubType = code;
            }
        }
        switch (event?.status) {
            case ComponentErrorConst.ERROR_DESTINATION_NOT_EXIST:
                this.waiterEventReport(EventType.EVENT_TYPE_DESTINATION_UNREACHABLE, eventSubType);
                break;
            case ComponentErrorConst.ERROR_NAVIGATION_OUT_MAP: //在地图外,需要重定位
                this.waiterEventReport(EventType.EVENT_TYPE_OUT_MAP, eventSubType);
                break;
            case ComponentErrorConst.ERROR_NAVIGATION_GLOBAL_PATH_FAILED:
                this.waiterEventReport(EventType.EVENT_TYPE_PATH_PLANNING_FAILED, eventSubType);
                break;
            case ComponentErrorConst.ERROR_NAVIGATION_AVOID_TIMEOUT:
                this.waiterEventReport(EventType.EVENT_TYPE_DESTINATION_UNREACHABLE, eventSubType);
                break;
            case ComponentErrorConst.ERROR_DESTINATION_CAN_NOT_ARRIVE:
                this.waiterEventReport(EventType.EVENT_TYPE_DESTINATION_UNREACHABLE, eventSubType);
                break;
            case ComponentErrorConst.ERROR_NOT_ESTIMATE:
                this.waiterEventReport(EventType.EVENT_TYPE_NOT_ESTIMATE, eventSubType);
                break;
            case ComponentErrorConst.ERROR_WHEEL_OVER_CURRENT_RUN_OUT:
                this.waiterEventReport(EventType.EVENT_TYPE_WHEEL_OVER_CURRENT_RUN_OUT, eventSubType);
                break;
            default:
                this.waiterEventReport(EventType.EVENT_TYPE_OTHER, eventSubType);
                break;
        }
    }

    public static waiterEventReport(event: EventType, sub_event: number): void{
        let bean = contextStore.curTaskBean;
        let task_id = '';
        let task_name: TaskType | '' = '';
        let task_point = '';
        let to_name = '';
        let from = 1;
        if (bean) {
            task_id = bean.task_id;
            task_name = bean.task_type;
            if (task_name === TaskType.zcb_call_position) {
                task_point = bean.task_data.pos_name;
            } else {
                task_point = bean.task_data.from_pos_name;
            }
            from = bean.task_data.context_cdata ? 2 : 1
        } else {
            to_name = AsyncStorageManager.point;
        }
        this.waiterEventReportInnter(
            task_id, task_point, task_name, to_name, event, sub_event, from
        );
    }

    /*
        task_name 任务名称：找服务员\要餐具\催菜\收拾桌子
        to_name: 前往的点位
        from 1-小程序  2-召唤转化
     */
    private static waiterEventReportInnter(
        task_id: string,
        task_point: string,
        task_name: TaskType | '',
        to_name: string,
        event: EventType,
        sub_event: number,
        from: 1 | 2 | number,
        tableName = 'sc_restaurant_waiter_event',
        waiter_link_id: string = this.waiterLinkId,
        ctime: number = new Date().getTime(),
    ) {
        Reports.reportMsg({
            task_id,
            from,
            task_point,
            task_name,
            to_name,
            event,
            sub_event,
            tableName,
            waiter_link_id,
            ctime,
        });
    }

    private static get UUID(): string{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    private static generatePublic(tableName: string) {
        return {
            tableName: tableName,
            waiter_link_id: this.waiterLinkId,
            ctime: new Date().getTime(),
        };
    }
}