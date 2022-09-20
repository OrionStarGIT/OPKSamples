/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Component } from 'react';
import { Button, FlatList, StyleSheet, View, Text, ListRenderItemInfo } from 'react-native';
import * as React from 'react';
import { ReceptionRegisterCameraViewScreen } from './receptionRegisterCameraView/ReceptionRegisterCameraViewScreen';
import { BasicMotionScreen } from './basicMotion/BasicMotionScreen';
import { HeadTurnScreen } from './headTurn/HeadTurnScreen';
import { StandardFaceTrackScreen } from './standardFaceTrack/StandardFaceTrackScreen';
import { NavigationScreen } from './navigation/NavigationScreen';
import { ChargeStartScreen } from './chargeStart/ChargeStartScreen';
import { RegisterScreen } from './register/RegisterScreen';
import { PersonAppearScreen } from './personAppear/PersonAppearScreen';
import { BodyFollowScreen } from './bodyFollow/BodyFollowScreen';
import { GetNearestPlaceScreen } from './getNearestPlace/GetNearestPlaceScreen';
import { ForwardScreen } from './forward/ForwardScreen';
import { ResetEstimateScreen } from './resetEstimate/ResetEstimateScreen';
import { PersonDisappearScreen } from './personDisappear/PersonDisappearScreen';
import { MotionArcWithObstaclesScreen } from './motionArcWithObstacles/MotionArcWithObstaclesScreen';

/**
 * 界面样式
 */
const styles = StyleSheet.create({
    rootView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    categoryList: {
        height: '100%',
        width: '80%'
    },
    categoryButton: {
        marginTop: 20
    },
    titleBar: {
        width: '100%',
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'deepskyblue',
        alignItems: 'center',
        marginBottom: 10
    },
    titleButton: {
        marginLeft: 10
    },
    titleText: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        marginRight: 40
    },
    componentList: {
        width: '80%'
    }
});

interface RobotComponent {
    /**
     * 组件名称
     */
    name: string;
    /**
     * 组件描述
     */
    describe: string;
    /**
     * 组件模块入口
     */
    componentScreen: React.ReactChild;
}

export class CategoryListView extends Component {

    /**
     * 组件类别
     */
    private mCategoryList: string[] = [
        '拍照获取图片',
        '基础运动',
        '视觉能力',
        '导航',
        '电量控制',
        '地图及位置'
    ];
    /**
     * 组件列表
     */
    private mComponentList: RobotComponent[][] = [[
        { name: '拍照获取图片', describe: 'ReceptionRegisterCameraView', componentScreen: <ReceptionRegisterCameraViewScreen/> }
    ],[
        { name: '身体运动新版本', describe: 'MotionArcWithObstacles', componentScreen: <MotionArcWithObstaclesScreen/> },
        { name: '身体运动(导航)', describe: 'ForwardComponent', componentScreen: <ForwardScreen/> },
        { name: '头部运动', describe: 'HeadTurnComponent', componentScreen: <HeadTurnScreen/> }
    ], [
        { name: '人脸跟随', describe: 'StandardFaceTrackComponent', componentScreen: <StandardFaceTrackScreen/> },
        { name: '人脸注册', describe: 'RegisterComponent', componentScreen: <RegisterScreen/> },
        { name: '人脸检测', describe: 'PersonAppearComponent', componentScreen: <PersonAppearScreen/> },
        { name: '人离开检测', describe: 'PersonDisappearComponent', componentScreen: <PersonDisappearScreen/> }
    ], [
        { name: '导航', describe: 'NavigationComponent', componentScreen: <NavigationScreen/> },
        { name: '人体追踪', describe: 'BodyFollowComponent', componentScreen: <BodyFollowScreen/> }

    ], [
        { name: '充电', describe: 'ChargeStartComponent', componentScreen: <ChargeStartScreen/> }
    ], [
        { name: '获取最近位置', describe: 'GetNearestPlaceComponent', componentScreen: <GetNearestPlaceScreen/> },
        { name: '重定位', describe: 'ResetEstimateComponent', componentScreen: <ResetEstimateScreen/> }
    ]];
    /**
     * 记录用户选择
     */
    private mSelectIndexLevel1: number = 0;
    private mSelectIndexLevel2: number = 0;
    public state = {
        /**
         * 界面级别：一级界面展示组件类别目录，
         *           二级界面展示组件列表目录，
         *           三级界面展示组件操作界面
         */
        viewLevel: 1
    };

    /**
     * 绘制界面
     */
    public render(): React.ReactNode {
        switch (this.state.viewLevel) {
            case 1:
                return this.renderCategoryLevel1();
            case 2:
                return this.renderCategoryLevel2();
            case 3:
                return this.renderComponent();
            default:
                return null;
        }
    }

    /**
     * 显示类别目录
     */
    private renderCategoryLevel1(): React.ReactChild {
        return (
            <View style={styles.rootView}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.categoryList}
                    data={this.mCategoryList}
                    renderItem={this.renderItemLevel1}/>
            </View>
        );
    }

    private renderItemLevel1 = ({ item, index }: ListRenderItemInfo<string>): React.ReactElement => {
        console.log('biantai110_item:' + item + '=======biantai110_index:' + index);
        return (
            <View style={styles.categoryButton}>
                <Button
                    title={item}
                    onPress={(): void => {
                        this.mSelectIndexLevel1 = index;
                        this.setState({
                            viewLevel: 2
                        });
                    }}
                />
            </View>
        );
    };

    /**
     * 显示组件目录
     */
    private renderCategoryLevel2(): React.ReactChild {
        console.log('biantai110_index_categorylevel2:' + this.mSelectIndexLevel1);
        return (
            <View style={styles.rootView}>
                {this.renderTitleBar(this.mCategoryList[this.mSelectIndexLevel1])}
                <FlatList
                    style={styles.componentList}
                    showsVerticalScrollIndicator={false}
                    data={this.mComponentList[this.mSelectIndexLevel1]}
                    renderItem={this.renderItemLevel2}/>
            </View>
        );
    }

    private renderItemLevel2 = ({ item, index }: ListRenderItemInfo<RobotComponent>): React.ReactElement => {
        return (
            <View style={styles.categoryButton}>
                <Button
                    color={'dodgerblue'}
                    title={item.name + '\n' + item.describe}
                    onPress={(): void => {
                        this.mSelectIndexLevel2 = index;
                        this.setState({
                            viewLevel: 3
                        });
                    }}
                />
            </View>
        );
    };

    /**
     * 显示标题栏
     */
    private renderTitleBar(title: string): React.ReactChild {
        console.log('biantai110_index_titlebar:' + title);
        return (
            <View style={styles.titleBar}>
                <View style={styles.titleButton}>
                    <Button
                        color={'dodgerblue'}
                        title={'后退'}
                        onPress={(): void => {
                            this.setState({
                                viewLevel: this.state.viewLevel - 1
                            });
                        }}/>
                </View>
                <Text style={styles.titleText}>{title}</Text>
            </View>
        );
    }

    /**
     * 显示组件操作界面
     */
    private renderComponent(): React.ReactChild {
        let component = this.mComponentList[this.mSelectIndexLevel1][this.mSelectIndexLevel2];
        return (
            <View style={styles.rootView}>
                {this.renderTitleBar(component.name)}
                {component.componentScreen}
            </View>
        );
    }
}