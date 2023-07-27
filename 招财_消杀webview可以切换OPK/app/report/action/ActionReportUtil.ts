import { Reports } from "orionos-eve-core";
import { TaskBean, TaskType } from "../../biz/TaskInterface";
import { Action, ActionType } from "./Action";
import { ReportUtil } from "../ReportUtil";

export class ActionReportUtil {

    public static callReport(taskBean: TaskBean, actionType: ActionType): void {
        this.actionReport(taskBean, Action.CALL_POSITION, actionType);
    }

    public static arriveHandleReport(): void {
        this.emptyTaskActionReport(Action.ARRIVE_HANDLE_POINT, ActionType.DEFAULT);
    }

    public static handleReport(taskBean: TaskBean, actionType: ActionType): void {
        this.actionReport(taskBean, Action.TASK_HANDLE, actionType);
    }

    public static cancelReport(taskBean: TaskBean, actionType: ActionType): void {
        this.actionReport(taskBean, Action.TASK_CANCEL, actionType);
    }

    public static drawerCancelReport(taskBean: TaskBean | undefined, actionType: ActionType): void {
        this.actionReport(taskBean, Action.DRAWER_TASK_CANCEL, actionType);
    }

    public static exceptionReport(taskBean: TaskBean, actionType: ActionType): void {
        this.actionReport(taskBean, Action.EXCEPTION_END, actionType);
    }

    public static leaveHandlePointReport(): void {
        this.emptyTaskActionReport(Action.LEAVE_HANDLE_POINT, ActionType.DEFAULT);
    }

    public static destPointReport(taskBean: TaskBean, actionType: ActionType): void {
        this.actionReport(taskBean, Action.ARRIVE_DEST_POINT, actionType);
    }

    private static emptyTaskActionReport(action: Action, actionType: ActionType) {
        this.actionReportInner(
            '',
            '',
            '',
            action,
            actionType,
            1,
            0
        );
    }

    private static actionReport(taskBean: TaskBean | undefined, action: Action, actionType: ActionType): void {
        if (taskBean?.task_id) {
            let task_point = taskBean.task_type === TaskType.zcb_call_position
                ? taskBean.task_data.pos_name
                : taskBean.task_data.from_pos_name;
            this.actionReportInner(
                taskBean.task_id,
                task_point,
                taskBean.task_type,
                action,
                actionType,
                taskBean.task_data.context_cdata ? 2 : 1,
                taskBean.availableArrive ? 1 : 0,
            );
        } else {
            this.emptyTaskActionReport(action, actionType);
        }
    }

    /**
     *
     * @param task_id
     * @param task_point
     * @param task_name
     * @param action
     * @param action_type
     * @param task_solve
     * @param from 1-小程序  2-召唤转化
     * @param is_cango 0不可到达 1可以到达
     * @param tableName
     * @param waiter_link_id
     * @param ctime
     */
    private static actionReportInner(
        task_id: string,
        task_point: string,
        task_name: TaskType | string,
        action: Action,
        action_type: ActionType | '',
        from: 1 | 2,
        is_cango: 0 | 1,
        task_solve = 1,
        tableName = 'sc_restaurant_waiter_action',
        waiter_link_id: string = ReportUtil.waiterLinkId,
        ctime: number = new Date().getTime(),
    ): void {
        Reports.reportMsg({
            task_id,
            task_point,
            task_name,
            task_solve,
            action,
            action_type,
            from,
            tableName,
            waiter_link_id,
            ctime,
            is_cango
        });
    }
}