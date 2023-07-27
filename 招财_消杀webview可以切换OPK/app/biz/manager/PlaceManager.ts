import { LocationEstimateUtil } from "orionos-eve-core";
import I18n from '../../source/res/I18n';
import { Log } from "../../base/log/Log";

const TAG = 'PlaceManager'
export class PlaceManager {
    private static locationEstimateUtil: LocationEstimateUtil = new LocationEstimateUtil();

    public static readonly MIN_DISTANCE = 0.65;

    public static getPlaceList(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.locationEstimateUtil.getPlaceList().then((list: any): void => {
                Log.d(TAG, 'getPlaceList=' + JSON.stringify(list))
                let mapLocationInfos: string[] = [];
                for (let index in list) {
                    let name = list[index]['name'];
                    if (!PlaceManager.filter(name)) {
                        mapLocationInfos.push(name);
                    }
                }

                // this.test(mapLocationInfos)
                this.sortMapLocationList(mapLocationInfos)
                    .then((mapLocationInfo: any) => {
                        resolve(mapLocationInfo)
                        Log.d(TAG, 'get distance: callback'+ JSON.stringify(mapLocationInfo));
                    });
            });
        })
    }

    private static sortMapLocationList = (mapList: string[]) => {
        let hasDistanceList: string[] = [];
        Object.assign(hasDistanceList, mapList);
        hasDistanceList.sort(function(a, b) {
            function sortNames(a: any, b: any): any {
                let parseA = isNaN(parseInt(a)) ? a : parseInt(a);
                let parseB = isNaN(parseInt(b)) ? b : parseInt(b);
                if (typeof (parseA) === 'string' && typeof (parseB) === 'string') {
                    if (parseA.length > 1 && parseB.length > 1 &&
                        parseA.charAt(0) === parseB.charAt(0)) {
                        return sortNames(parseA.substring(1), parseB.substring(1));
                    }
                    return parseA.localeCompare(parseB, 'zh');
                }

                if (typeof (parseA) === 'string' && typeof (parseB) === 'number') {
                    return 1;
                }

                if (typeof (parseA) === 'number' && typeof (parseB) === 'string') {
                    return -1;
                }

                if (typeof (parseA) === 'number' && typeof (parseB) === 'number') {
                    if (parseA === parseB) {
                        return a.localeCompare(b, 'zh');
                    }
                    return parseA - parseB;
                }
            }

            return sortNames(a, b);
        });

        return new Promise((resolve, reject): void => {
            resolve(hasDistanceList);
        });
    };

    public static filter(point: string) {
        return point === I18n.chargePoint
            || point === I18n.chargePile
            || point === I18n.locationPoint
    }

    public static isInMap(point: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getPlaceList().then((mapList) => {
                if (mapList) {
                    let isInMap = false;
                    for (let index in mapList) {
                        if (point === mapList[index]) {
                            isInMap = true;
                            break;
                        }
                    }
                    resolve(isInMap)
                }
            });
        });
    }

    public static isInPlaceAsync(point: string, distance: number = this.MIN_DISTANCE) {
        return this.locationEstimateUtil.isInPlace(point, distance)
    };

    public static isRobotEstimate(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.locationEstimateUtil.isRobotEstimate().then((isRobotEstimate) => {
                resolve(!!isRobotEstimate)
            }).catch((reason: string) => {
                reject(reason);
            });
        });
    }

    public static checkPoint(points: string[]): Promise<string>{
        let targetPoints = points.concat();
        Log.d(TAG, 'checkPoint pointsTarget=' + JSON.stringify(targetPoints));
        return new Promise<string>((resolve, reject) => {
            this.checkInner(targetPoints, resolve, reject);
        });
    }

    private static checkInner(targetPoints: string[], resolve: any, reject: any) {
        let point = targetPoints.shift();
        if (!point) {
            reject('all out map:' + JSON.stringify(targetPoints));
            return;
        }
        PlaceManager.isInMap(point).then((isInMap) => {
            Log.d(TAG, `point:${point},isInMap=${isInMap}`);
            if (!isInMap) {
                this.checkInner(targetPoints, resolve, reject);
            } else {
                resolve(point);
            }
        });
    }
}