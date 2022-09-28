import { Context } from "./Context";

export enum StateName {
    TASK_CALL_POSITION = 'TaskCallPositionState',
    TASK_GET = 'TaskGetState',
    TASK_HANDLE_POINT = 'TaskHandlePointState',
    TASK_REPLY = 'TaskReplyState',
    TASK_FINAL_STATE = 'TaskFinalState',
    TASK_BIRTHDAY_BLESS_STATE = 'TaskBirthdayBlessState',
}

export enum EndType {
    ARRIVE = 'arrive',
    CANCEL = 'cancel',
    NEXT_STATE = 'next_state',
    NO_TASK = 'no_task',
    NAVIGATION_ERROR = 'navigation_error',
    CUSTOMER_CANCEL = 'customer_cancel',
}

export interface State {
    onHandleState: (context: Context) => any;
    onEndState: (type: EndType, extraData?: any) => void;
    name: () => StateName;
    onDestroy?: () => void;
}