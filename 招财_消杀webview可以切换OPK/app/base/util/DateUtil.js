export class DateUtil {

    load() {
        Date.prototype.toFormat = function (format) {
            let year = `${this.getFullYear()}`;
            let month = `${this.getMonth() + 1}`;
            if (month.length === 1) {
                month = `0${month}`;
            }
            let day = `${this.getDate()}`;
            if (day.length === 1) {
                day = `0${day}`;
            }

            let hours = `${this.getHours()}`;
            if (hours.length === 1) {
                hours = `0${hours}`;
            }
            let minutes = `${this.getMinutes()}`;
            if (minutes.length === 1) {
                minutes = `0${minutes}`;
            }
            let seconds = `${this.getSeconds()}`;
            if (seconds.length === 1) {
                seconds = `0${seconds}`;
            }

            return (format || "yyyy-MM-dd hh:mm:ss")
                .replace(/yyyy/g, year)
                .replace(/MM/g, month)
                .replace(/dd/g, day)

                .replace(/hh/g, hours)
                .replace(/mm/g, minutes)
                .replace(/ss/g, seconds);
        };
    }
}

export function dateFormat(second, format) {
    return new Date(second).toFormat(format);
}