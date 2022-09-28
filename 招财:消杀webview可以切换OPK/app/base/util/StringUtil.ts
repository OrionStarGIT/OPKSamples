/**
 * 字符串工具类
 */
export class StringUtil {
    /**
     *
     * @param format 支持format %d 和 %s
     * @param obj
     */
    public static getString(format: string, ...objs: any) {

        for (let i = 0; i < objs.length; i ++) {
            let item = objs[i];
            if (typeof item === 'number') {
                format = format.replace("%d", String(item));
            } else if (typeof item === 'string') {
                format = format.replace('%s', item);
            }
        }
        format = format.replace("%s/g", "")
            .replace("%d/g", "");
        return format;
    }

    public static millsToSecondStr(mills: number) {
        return mills/1000 + 's'
    }

    public static isEmpty(str?: string): boolean {
        return !str;
    }

    public static getStringArray(format: string[], replace: string) {
        let array = new Array<string>();
        Object.assign(array, format);
        return array.map((value) => {
            return this.getString(value, replace)
        })
    }
}