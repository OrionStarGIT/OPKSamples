import { AsyncStorage } from 'react-native';

var parser = require("cron-parser");

export class CronParser {
  //任务列表
  taskList = new Object();
  //缓存名称
  static TASK_NAME = 'cronList';

  /**
   * 初始化任务
   * @param {*} id 任务id
   * @param {*} grammar 文法
   * @param {*} program 函数回调标识符
   * @returns
   */
  startCronTask(id, grammar, program) {
    if (!id) return false;
    if (!grammar || typeof grammar !== 'string') return false;
    if (!program) return false;
    //不可传递重复的id
    if (this.taskList[id]) return false;

    let interval = parser.parseExpression(grammar);
    let nextTime = interval.next();
    if (nextTime) {
      //保存当前任务至列表
      this.taskList[id] = { grammar, program };
      const nextDate = nextTime.getTime();
      const nowDate = new Date().getTime();
      const diff = nextDate - nowDate;
      if (diff < 0) {
        diff = 0;
      }
      setTimeout(() => {
        this.taskCallback(id, interval);
      }, diff);
      return true;
    }
    return false;
  }

  /**
   * 循环执行任务
   * @param {*} id 任务id
   * @param {*} interval 时间
   * @returns
   */
  taskCallback(id, interval) {
    if (!this.taskList[id]) {
      interval = null;
      return;
    }

    setTimeout(() => {
      this.doTimerTaskThings(id, this.taskList[id].program)
    }, 0);
    let nextTime = interval.next();
    if (nextTime) {
      const nextDate = nextTime.getTime();
      const nowDate = new Date().getTime();
      const diff = nextDate - nowDate;
      if (diff > 0) {
        setTimeout(() => {
          this.taskCallback(id, interval);
        }, diff);
      }
    }
  }

  /**
   * 执行回调
   * @param {*} id 任务id
   * @param {*} program 回调函数标识符
   * @returns 
   */
  doTimerTaskThings(id, program) {
    console.log('CronParser doTimerTaskThings', id, program)
    switch (program) {
      case 'callback1':
        //....
        break;
    }
  }

  /**
   * 获取任务列表
   * @returns
   */
  getCronTaskList() {
    return this.taskList;
  }

  /**
   * 删除指定任务
   * @param {*} id 任务id
   */
  deleteCronTask(id) {
    if (this.taskList[id]) {
      delete this.taskList[id];
    }
  }

  /**
   * 保存任务列表到本地缓存
   */
  storeCronList() {
    AsyncStorage.setItem(CronParser.TASK_NAME, JSON.stringify(this.taskList));
  }

  /**
   *清空所有任务列表（包括本地缓存）
   */
  clearStoreCronList() {
    this.taskList = new Object();
    AsyncStorage.removeItem(CronParser.TASK_NAME)
  }

  /**
   * 检查定时任务
   * 如rn进程被杀死后，在index.js中调用此方法无需重新打开opk即可重启定时任务
   */
  checkTimerTask() {
    AsyncStorage.getItem(CronParser.TASK_NAME).then((value) => {
      if (!value) {
        console.log('CronParser', 'TASK_NAME value is null');
        return;
      }
      let list = JSON.parse(value)
      for (const key in list) {
        this.startCronTask(key, list[key].grammar, list[key].program)
      }
    });
  }
}
export const cronParser = new CronParser()
