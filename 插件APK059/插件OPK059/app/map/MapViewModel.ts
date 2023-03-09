import {
    BaseViewModel,
    CommandListener,
    RobotApi,
} from 'orionos-eve-core';
import { observer } from 'mobx-react';
import { MapTools as mapTools } from 'orionos-extension-maptools';
import { MapModel } from './MapModel';

const TAG = 'MapViewModel';

export class MapViewModel extends BaseViewModel {
    //let return_obj = {"mapName": mapName, "pose": pose, "poseBeanList": {"singer": "", "song": ""}};
    private return_obj = {"mapName": "", "pose": "", "poseBeanList": ""};
    private current_position = {"curMapName": "", "pose": ""};
    //数据模块
    private mModel: MapModel;

    public constructor() {
        super('map');
        this.mModel = new MapModel();
    }

    /**
     * 开始
     */
     public onStart(): void {

    }

    /**
     * 结束
     */
    public onStop(): void {

    }

/**
     * 获取机器人当前坐标
     */
 public getCurrPosition() {
    return new Promise((resolve, reject): void => {
        let commandListener = new CommandListener();
        commandListener.addListener(
            CommandListener.EVENT_RESULT,
            (result: any) => {
                console.log(TAG, 'getMapName -> ' + JSON.stringify(result));
                if (result !== null) {
                    let mapName = result.message;
                    if (mapName !== null && mapName !== '') {
                        RobotApi.getPosition()
                            .then(result => {
                                console.log(TAG, 'getCurrPose -> ' + JSON.stringify(result));
                                this.current_position.curMapName = mapName;
                                this.current_position.pose = result.message;;
                                resolve(this.current_position);
                            })
                            .catch((e: any) => {
                                console.log(TAG, 'getCurrPose Error -> ' + e);
                            });
                    }
                }
                commandListener.removeListener();
            }
        );
        RobotApi.getMapName(commandListener.getId());
    })
} 

    /**
     * 获取机器人当前坐标与站点列表数据信息
     */
    public getCurrPose() {
        return new Promise((resolve, reject): void => {
            let commandListener = new CommandListener();
            commandListener.addListener(
                CommandListener.EVENT_RESULT,
                (result: any) => {
                    console.log(TAG, 'getMapName -> ' + JSON.stringify(result));
                    if (result !== null) {
                        let mapName = result.message;
                        if (mapName !== null && mapName !== '') {
                            RobotApi.getPosition()
                                .then(result => {
                                    let pose = result.message;
                                    console.log(TAG, 'getCurrPose -> ' + JSON.stringify(result));
                                    this.getPlaceListWithName(mapName, pose).then(function(return_obj){
                                        resolve(return_obj);
                                    });
                                })
                                .catch((e: any) => {
                                    console.log(TAG, 'getCurrPose Error -> ' + e);
                                });
                        }
                    }
                    commandListener.removeListener();
                }
            );
            RobotApi.getMapName(commandListener.getId());
        })
    }  
    
    /**
     * 获取机器人当前位置点列表数据
     */
    public getPlaceListWithName(mapName: string, pose: any): Promise<any> {
        return new Promise((resolve, reject): void => {
            let action = new CommandListener();
            action.addListener(
                CommandListener.EVENT_RESULT,
                (msg: any) => {
                    console.log(TAG, '位置点列表数据 : ' + JSON.stringify(msg));
                    this.return_obj.mapName = mapName;
                    this.return_obj.pose = pose;
                    this.return_obj.poseBeanList = msg.message;
                    resolve(this.return_obj);
                    action.removeListener();
                }
            );
            RobotApi.getPlaceListWithName(action.getId());
        })
    };

    /**
     * 获取地图名称
     */
    public getCurMapName(): string {
        return this.mModel.getMapName();
    }

}
