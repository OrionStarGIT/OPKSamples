import { observable } from 'mobx';
import { ImageProps } from "react-native";
import { TaskSendId } from "../tasksend/TaskSendData";

export interface TaskItemBean {
    taskType: TaskSendId;
    num: number;
    tableNum: string;
    time: string;
    image: ImageProps;
    isCancel?: boolean;
    isOtherRobotPull?: boolean;
    isHandle?: boolean;
    isRobotHandleComplete?: boolean;
    isNoNeedRobotComplete?: boolean;
    toastText?: string;
}

export default {
    data: observable([
        {
            taskType: TaskSendId.pushFood,
            tableNum: 'A02',
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            num: 99,
            image: require('../../../img/taskpending/push_food_icon.png'),
        },
        {
            taskType: TaskSendId.loopUpWaiter,
            tableNum: 'A03',
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            num: 2,
            image: require('../../../img/taskpending/look_up_waiter_icon.png')
        },
        {
            taskType: TaskSendId.lackTableware,
            tableNum: 'A01',
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            num: 2,
            image: require('../../../img/taskpending/lack_tableware_icon.png')
        },
        {
            taskType: TaskSendId.clearTable,
            tableNum: 'A01',
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            num: 2,
            image: require('../../../img/taskpending/clear_table_icon.png'),
            isOtherRobotPull: true,
        },
    ])
};