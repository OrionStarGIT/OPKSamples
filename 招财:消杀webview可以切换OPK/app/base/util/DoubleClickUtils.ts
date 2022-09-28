
export class DoubleClickUtils {
    private static readonly MIN_TIME_INTERVAL: number = 3000;

    private static mLastTime: number = 0;

    public static isEnableClick() {
        let curTime = new Date().getTime();
        console.log("DoubleClickUtils time " + curTime + " mLastTime: " + this.mLastTime + " " + (curTime - this.mLastTime > this.MIN_TIME_INTERVAL));
        if (curTime - this.mLastTime > this.MIN_TIME_INTERVAL) {
            this.mLastTime = curTime;
            return true;
        }
        return false;
    }
}