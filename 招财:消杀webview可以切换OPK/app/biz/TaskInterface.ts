export interface ExtraTaskBean {
    isCancel?: boolean;
    isOtherRobotPull?: boolean;
    isTakePending?: boolean;
    //是否认领任务
    isTake?: boolean;
    //机器回复
    isRobotReply?: boolean;
    //其他回复
    isNoNeedRobotReply?: boolean;
    //在几层餐盘
    tier?: number;
    //话术
    trick: string;
    isReportReceive: boolean;
    isReportEnd: boolean;
    availableArrive: boolean;
}

export interface TaskBean extends ExtraTaskBean{
    task_id: string;
    task_type: TaskType;
    task_data: TaskData;
    task_time: number;
}

export interface TaskData {
    //召唤任务的桌号
    pos_name: string;
    //其他任务的桌号
    from_pos_name: string;
    cdata?: string;
    context_cdata?: string;
    tableware_list?: TablewareBean[];
    //模板id
    card_tpl_id?: CardTplId;
    card_content?: CardContent;
}

export interface TablewareBean {
    tableware: Tableware;
    count: number;
}

export interface Tableware {
    tableware_name: string;
    tableware_type?: string;
}

export interface CardContent {
    from_name: string;
    to_name: string;
    to_avatar_url: string;
    greeting_text: string;
    greeting_play: string;
    relation: string;
}

//枚举
export enum TaskType {
    zcb_call_position = 'zcb_call_position',
    zcb_call_birthday = 'zcb_call_birthday',
    zcb_ask_hurry = 'zcb_ask_hurry',
    zcb_call_waiter = 'zcb_call_waiter',
    zcb_clear_table = 'zcb_clear_table',
    zcb_need_tableware = 'zcb_need_tableware'
}

export enum CardTplId {
    BIRTHDAY_0001 = 'tpl_0001',
}