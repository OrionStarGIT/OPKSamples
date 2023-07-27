export class DelayUtil {
    public static postDelay(callback: () => void, time: number) {
        let timeout = setTimeout(() => {
            callback();
            clearTimeout(timeout)
        }, time)
    }
}