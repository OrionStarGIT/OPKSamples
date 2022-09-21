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

import React, { Component, RefObject } from 'react';
import {
    Button,
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { ReceptionRegisterCameraView } from 'orionos-eve-core';
import { observer } from 'mobx-react';
import { ReceptionRegisterCameraViewViewModel } from './ReceptionRegisterCameraViewViewModel';

/**
 * 传入参数
 */
 export interface ReceptionRegisterCameraViewViewProp {
    viewModel?: ReceptionRegisterCameraViewViewModel;
}

const { width, height } = Dimensions.get('window');



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
    takePhoto: {
        width: 160,
        height: 90,
        marginTop:3,
        marginLeft:200
    }
});

@observer
export class ReceptionRegisterCameraViewView extends Component<ReceptionRegisterCameraViewViewProp> {
    private viewModel: ReceptionRegisterCameraViewViewModel;
    private mScroll?: ScrollView;
    public cameraView: RefObject<
    ReceptionRegisterCameraView
> = React.createRef();

    public constructor(props: ReceptionRegisterCameraViewViewProp) {
        super(props);
        this.viewModel = props.viewModel;
        this.viewModel.cameraView = this.cameraView;
    }

    /**
     * 绘制界面
     */
    public render(): React.ReactNode {
        if (!this.props.viewModel) {
            return null;
        }
        return (
            <View style={styles.rootView}>
                <TouchableOpacity
                    onPress={() => {
                        console.log('biantai_normal110');
                        this.cameraView &&
                        this.cameraView.current &&
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
                <View style={{width: 160,height: 90, backgroundColor:'yellow'}}> 
                    <ReceptionRegisterCameraView
                        style={styles.takePhoto}
                        ref={
                            this.cameraView
                        }
                        onPreviewState={(state) =>{console.log('ReceptionRegisterCameraView', 'onPreviewState:' + state);}}
                        onCaptureState={this.viewModel.onCaptureState.bind(
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
                    }}>{this.viewModel.getSourcImage()}</Text>
                    <Text style={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#333333',
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#333333',
                        marginTop: 10
                    }}>{this.viewModel.getCompressImage()}</Text> 
            </View>
        );
    }

    private setScroll = (scroll: ScrollView): void => {
        this.mScroll = scroll;
    };

    private onContentSizeChange = (): void => {
        this.mScroll && this.mScroll.scrollToEnd();
    }
}