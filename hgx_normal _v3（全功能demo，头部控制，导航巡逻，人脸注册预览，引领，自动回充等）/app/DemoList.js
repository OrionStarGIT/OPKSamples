import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter, Button, ScrollView, Dimensions } from 'react-native';

import {
    listenersManager, ReceptionRegisterCameraView, RobotApi, speechApi, triggerManager, HeadTurnParam, HeadTurnMode, HeadTurnComponent, ForwardComponent, ForwardParam, TrickComponent, ComponentEvent, NavigationParam, NavigationComponent, NavigationBackParam, NavigationBackComponent, CruiseParam, CruiseComponent, BasicMotionParam, BasicMotionComponent, BasicMotionMode, SoundLocalizationComponent, SoundLocalizationParam, WakeupAndPreWakeupStartCheckComponent, WakeupAndPreWakeupStartCheckParam, RegisterParam, RegisterComponent
} from 'orionos-eve-core';
import { FaceParticleScreen } from './demo/FaceParticleScreen';
import { DemoScreen } from './demo/DemoScreen';
import { RegFaceScreen } from './demo/RegFaceScreen';
import { FaceTrackScreen } from './demo/FaceTrackScreen';
import { FaceOneScreen } from './demo/FaceOneScreen';
import { AutoChargeScreen } from './demo/AutoChargeScreen';
import { CategoryListView } from './CategoryListView';

const styles = StyleSheet.create({
/*      takePhoto: {
        height: Dimensions.get('screen').height*0.3,
        width: Dimensions.get('screen').width*0.5,
    }  */
    takePhoto: {
        width: 100,
        height: 200,
        marginTop:3,
        marginLeft:200
    }
});

const TAG = 'hgx_normal DemoList.js';

export default class DemoList extends React.Component {

    constructor(props) {
        super(props);
        speechApi.setRecognizeMode(false);
        listenersManager.listen(DeviceEventEmitter);
        triggerManager.start();
        this.state = {
            isHeadTurnEnable: false,
            isForwardEnable: false,
            isFaceEnable: false,
            source_image: '原图路径',
            compress_image: '压缩图路径',
            isTrickEnable: false,
            isPositionEnable: false,
            isHeadBackEnable: false,
            isTourEnable: false,
            isBasicMovementEnable: false,
            isPreOrWakeupEnable: false,
            isRegFaceEnable: false,
            isFaceAutoTrackEnable: false,
            isTrackOneEnable: false,
            isAutoChargeEnable: false,
        };
    }

    componentWillMount() {
        console.log('App', 'componentWillMount');
    }

    componentDidMount() {
        console.log('App', 'componentDidMount');
    }

    componentWillUnmount() {
        console.log('App', 'componentWillUnmount');
    }
  
    onCaptureState = (
        state,
        originalImageFile,
        compressedFile
    ) => {
        //originalImageFile图片路径
        console.log(
            'FaceCollectionViewModel', 'onCaptureState:' + state + ',originalImageFile:', originalImageFile, ',compressedFile:', compressedFile
        );
        this.setState({source_image:originalImageFile});
        this.setState({compress_image:compressedFile});
    };

    onTrueFinish = () => {
        console.log('单次头部运动');
        return true;
    }

    onStatusUpdate = () => {
        console.log('失败');
        return false;
    }

    render() {
        const obj = Dimensions.get('screen');
        console.log('biantai117width:' + JSON.stringify(obj));

        console.log('biantai110_单次头部运动+onHeadMovement');
        let headTurnRightParam = new HeadTurnParam(
            HeadTurnMode.absolute, -40, 60,HeadTurnMode.relative, 40,60); 
        let forwardParams = new ForwardParam(0.7);
        this.cameraView = React.createRef();
        let HEAD_BLINK = `[
            {
                "horizontalAngle": 50,
                "verticalAngle": 70,
                "verticalMaxSpeed": 20,
                "horizontalMaxSpeed": 80,
                "horizontalMode": absolute,
                "verticalMode": absolute
            },{
                "horizontalAngle": -50,
                "verticalAngle": 70,
                "verticalMaxSpeed": 20,
                "horizontalMaxSpeed": 80,
                "horizontalMode": absolute,
                "verticalMode": absolute
            },{
                "horizontalAngle": 0,
                "verticalAngle": 70,
                "verticalMaxSpeed": 20,
                "horizontalMaxSpeed": 80,
                "horizontalMode": absolute,
                "verticalMode": absolute
            }
            ]`;

            const EMOJI_TYPE = {LOOK_AROUND: 1};
            //let navigationParam = new NavigationParam('接待点', undefined, undefined, undefined, undefined, undefined, undefined, undefined, linearSpeed, angularSpeed);
            let param = new NavigationBackParam('接待点');
            let route = ['接待点', '会议室', '接待点'];
            let tour_param = new CruiseParam(JSON.stringify(route));
//            let basicMotionParam = new BasicMotionParam(BasicMotionMode.goForward, 0.5, 2, 10, 10, true);
            let soundLocalizationParam = new SoundLocalizationParam(-80, true, true);
//            let wakeupParam = new WakeupAndPreWakeupStartCheckParam(true, 3, 1.3, 45, true, undefined, true, 5 * 1000, undefined);
            


        return (
            <ScrollView>                
                <View style={{ backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isHeadTurnEnable: true});}} title='单次头部运动'></Button>    
                    {this.state.isHeadTurnEnable ? (
                        <HeadTurnComponent
                            param={headTurnRightParam}
                            onFinish={this.onTrueFinish}
                            onStatusUpdate={()=>{console.log(TAG, 'onHeadTurnStatusUpdate event -> ')}}
                        />
                    ) : null}
                </View>
{/*                 <View>
                    <Button onPress={()=>{this.setState({isPositionEnable: true});}} title='前往指定位置点'></Button>  
                    {this.state.isPositionEnable ? (
                        <NavigationComponent
                            param={navigationParam}
                            onStatusUpdate={this.onStatusUpdate}
                            onFinish={this.onTrueFinish}
                        />
                    ) : null}

                </View> */}

                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isHeadBackEnable: true});}} title='头部朝向后面导航回接待点'></Button>    
                    {this.state.isHeadBackEnable ? (
                        <NavigationBackComponent
                            param={param}
                            onStatusUpdate={this.onStatusUpdate}
                            onFinish={this.onFinish}
                        />
                    ) : null}
                </View>

                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isTourEnable: true});}} title='巡逻'></Button>    
                    {this.state.isTourEnable ? (
                        <CruiseComponent
                            param={tour_param}
                            onStatusUpdate={this.onStatusUpdate}
                            onFinish={this.onTrueFinish}
                        />
                    ) : null}
                </View>
               
                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isForwardEnable: true});}} title='带避障的向前或向后移动'></Button>
                    {this.state.isForwardEnable ? (
                        <ForwardComponent
                            param={forwardParams}
                            onFinish={()=>{console.log('recoverHeadFinish_results'); return true;}}
                        />
                    ) : null}
                </View>

{/*                 <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isBasicMovementEnable: true});}} title='机器人基础运动'></Button>
                    {this.state.isBasicMovementEnable ? (
                        <BasicMotionComponent
                            param={basicMotionParam}
                            onFinish={this.onFinish}
                        />
                    ) : null}
                </View> */}

                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isSoundLocalEnable: true});}} title='开启机器人声源定位（转向-80度）'></Button>
                    {this.state.isSoundLocalEnable ? (
                        <SoundLocalizationComponent
                            param={soundLocalizationParam}
                            onFinish={this.onFinish}
                        />
                    ) : null}
                </View>

                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isAutoChargeEnable: true});}} title='自动回充'></Button>
                    {this.state.isAutoChargeEnable ? (
                        <AutoChargeScreen {...this.props}/>
                    ) : null}
                    
                </View>

{/*                 <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isPreOrWakeupEnable: true});}} title='唤醒及预唤醒检测'></Button>
                    {this.state.isSoundLocalEnable ? (
                        <WakeupAndPreWakeupStartCheckComponent
                            param={wakeupParam}
                            onStatusUpdate={this.onStatusUpdate}
                            onFinish={this.onTrueFinish}
                        />
                    ) : null}
                </View> */}

                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isRegFaceEnable: true});}} title='人脸注册'></Button>
                    {this.state.isRegFaceEnable ? (
                        <RegFaceScreen {...this.props}/>
                    ) : null}
                    
                </View>
                
                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isFaceAutoTrackEnable: true});}} title='人脸自动追踪'></Button>
                    {this.state.isFaceAutoTrackEnable ? (
                        <FaceTrackScreen {...this.props}/>
                    ) : null}
                    
                </View>

                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isTrackOneEnable: true});}} title='追踪指定人'></Button>
                    {this.state.isTrackOneEnable ? (
                        <FaceOneScreen {...this.props}/>
                    ) : null}
                    
                </View>

{/*                 <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isFaceEnable: true});}} title='小眼睛和星空动画视图'></Button>
                    {this.state.isFaceEnable ? (
                        <RNFaceParticleView
                            hide={false}   
                            emojiType="blink_new"
                            showBg={false}
                        />
                    ) : null}
                </View> 

                <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('biantai_normal110');
                            this.cameraView.current.takePicture();
                        }}>
                        <Text style={{
                            backgroundColor: '#4e72b8',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#333333',
                            textAlign: 'center',
                            fontSize: 15,
                            color: '#333333',
                            marginTop: 10
                        }}>启动拍照人脸注册获取拍照的状态和图片路径</Text>
                    </TouchableOpacity>

                    <View style={{width: 100,height: 200, backgroundColor:'yellow'}}> 
                        <ReceptionRegisterCameraView
                            style={styles.takePhoto}
                            ref={
                                this.cameraView
                            }
                            onPreviewState={(state) =>{console.log('ReceptionRegisterCameraView', 'onPreviewState:' + state);}}
                            onCaptureState={this.onCaptureState.bind(
                                this
                            )}
                        />    
                    </View>        
                   
                    <Text style={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#333333',
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#333333',
                        marginTop: 10
                    }}>{this.state.source_image}</Text>
                    <Text style={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#333333',
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#333333',
                        marginTop: 10
                    }}>{this.state.compress_image}</Text>
                </View>*/}

                 <View style={{marginTop:15, backgroundColor: '#fff', textAlign: 'center', lex: 1, fontSize: 15, color: '#F7F7F7' }}>
                    <Button onPress={()=>{this.setState({isTrickEnable: true});}} title='机器人小动作'></Button>
                    {this.state.isTrickEnable ? (
                        <TrickComponent
                            headMotion={HEAD_BLINK}
                            getTrickStartText={'你是不是傻啊'}
                            emojiPlayType='dance_one'
                            onFinish={this.onTrueFinish}
                        />
                    ) : null}
                </View>

                <CategoryListView/>
            </ScrollView>
        );
    }

}


