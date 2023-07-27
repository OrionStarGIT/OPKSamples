import { WeakBlackListStrategy } from "./WeakBlackListStrategy";

const name = require('../../../package.json').name;

export class Log {
    public static isDebug = true;
    private static TAG = name + ":";

    private static weakBlackMap = new Map<string, WeakBlackListStrategy>();

    public static addBlackList(...keys: string[]): void {
        keys.forEach((key) => {
            this.weakBlackMap.set(key, new WeakBlackListStrategy('default'));
        });
    }

    public static addBlackMap(key: string, strategy: WeakBlackListStrategy) {
        this.weakBlackMap.set(key, strategy);
    }

    public static clearBlack(): void {
        this.weakBlackMap.clear();
    }

    public static d(t: string, m: string): void {
        let filter = this.filter(t, m);
        if (filter) {
            console.log(this.TAG + t, m);
        }
    }

    public static filter(tag: string, message: string): boolean {

        if (!this.isDebug) {
            return false;
        }

        let filterKeys = Array.from(this.weakBlackMap.keys()).filter(item =>  tag.includes(item));
        if (filterKeys.length) {
            let strategy = this.weakBlackMap.get(filterKeys[0]);
            if (strategy) {
                return strategy.filter(message);
            }
        }

        return true;
    }
}
