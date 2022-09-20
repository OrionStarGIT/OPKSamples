import { BaseComponent, triggerManager, BaseComponentProps, RobotApi, CommandListener } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Button, View, StyleSheet, Dimensions } from 'react-native';
import { MotionArcWithObstaclesViewModel } from './MotionArcWithObstaclesViewModel';
import { MotionArcWithObstaclesVoice } from './MotionArcWithObstaclesVoice';
import { MotionArcWithObstaclesTrigger } from './MotionArcWithObstaclesTrigger';
import { MotionArcWithObstaclesModel } from './MotionArcWithObstaclesModel';

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new MotionArcWithObstaclesTrigger());
const TAG = 'DemoScreen';
const SPEED_NONE = 0;

const FORWARD_SPEED = 0.4;
const BACKWARD_SPEED = -0.2;
const LEFT_SPEED = 0.5;
const RIGHT_SPEED = -0.5;

const MULTI_FORWARD_SPEED = 0.3;
const MULTI_BACKWARD_SPEED = -0.3;
const MULTI_LEFT_SPEED = 0.3;
const MULTI_RIGHT_SPEED = -0.3;

const MOTION_NONE = 0;
const MOTION_MARK = 63;
const MOTION_FORWARD = 1;
const MOTION_BACKWARD = 1 << 1;
const MOTION_LEFT = 1 << 2;
const MOTION_RIGHT = 1 << 3;
const MOTION_HEAD_UP = 1 << 4;
const MOTION_HEAD_DOWN = 1 << 5;
const { width, height } = Dimensions.get('window');

/**
 * 界面样式
 */
 const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        width: width,
        height: height
    },
    button: {
        width: '50%',
        marginBottom: 10
    },
    
});

/**
 * 功能UI界面
 */
@observer
export class MotionArcWithObstaclesScreen extends BaseComponent<BaseComponentProps, MotionArcWithObstaclesViewModel, MotionArcWithObstaclesVoice> {

    public viewModel: MotionArcWithObstaclesViewModel;
    private callback?: CommandListener;

    public constructor(props: BaseComponentProps) {
        super(props);

        this.viewModel = new MotionArcWithObstaclesViewModel();
        let voice = new MotionArcWithObstaclesVoice(this.viewModel);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);
        this.callback = new CommandListener();
        this.callback.addListener(
            CommandListener.EVENT_RESULT,
            (result: any) => {
                console.log(TAG, 'motionArcWithObstacles onResult', result);
            }
        );
        this.callback.addListener(
            CommandListener.EVENT_ONFINISH,
            (result: any) => {
                console.log(TAG, 'motionArcWithObstacles onFinish', result);
            }
        );
        this.callback.addListener(
            CommandListener.EVENT_STATUSUPDATE,
            (result: any) => {
                console.log(
                    TAG,
                    'motionArcWithObstacles onStatusUpdate',
                    result
                );
            }
        );
    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();
    }

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public render() {
        return (
            <View style={styles.rootView}>
                <View style={styles.button}>
                    <Button title="前进" onPress={this.startMove.bind(this, 'forward')}></Button>
                </View>
                <View style={styles.button}>
                    <Button title="后退" onPress={this.startMove.bind(this, 'back')}></Button>
                </View>
                <View style={styles.button}>
                    <Button title="左转" onPress={this.startMove.bind(this, 'left')}></Button>
                </View>
                <View style={styles.button}>
                    <Button title="右转" onPress={this.startMove.bind(this, 'right')}></Button>
                </View>
                <View style={styles.button}>
                    <Button title="停止" onPress={this.stopMove}></Button>
                </View>
            </View>
        );

    }

    public startMove(type: string) {
        console.log(TAG, type)
        switch (type) {
            case 'forward':
                RobotApi.motionArcWithObstacles(
                    this.callback ? this.callback.getId() : -1,
                    FORWARD_SPEED,
                    0
                );
                break;
            case 'back':
                RobotApi.motionArcWithObstacles(
                    this.callback ? this.callback.getId() : -1,
                    BACKWARD_SPEED,
                    0
                );
                break;
            case 'left':
                RobotApi.motionArcWithObstacles(
                    this.callback ? this.callback.getId() : -1,
                    0,
                    LEFT_SPEED
                );
                break;
            case 'right':
                RobotApi.motionArcWithObstacles(
                    this.callback ? this.callback.getId() : -1,
                    0,
                    RIGHT_SPEED
                );
                break;
        }
    }

    public stopMove() {
        RobotApi.motionArcWithObstacles(
            this.callback ? this.callback.getId() : -1,
            SPEED_NONE,
            SPEED_NONE
        );
    }
}
