import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter } from 'react-native';

import {
    listenersManager, ReceptionRegisterCameraView, RobotApi, speechApi, triggerManager
} from 'orionos-eve-core';


const styles = StyleSheet.create({
    takePhoto: {
        width: 123,
        height: 123,
        marginTop: 100
    }
});

export default class CameraDemo extends React.Component {

    constructor(props) {
        super(props);
        speechApi.setRecognizeMode(false);
        listenersManager.listen(DeviceEventEmitter);
        triggerManager.start();
        this.state = {
            startCamera: false
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
    };

    onPreviewState = (state) => {
        console.log('FaceCollectionViewModel', 'onPreviewState:' + state);
    };

    render() {
        this.cameraView = React.createRef();
        return (
            <View
                style={{
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    flex: 1,
                    fontSize: 15,
                    color: '#F7F7F7'
                }}>
                <Text>hello word!</Text>

                <TouchableOpacity
                    onPress={() => {
                        console.log('biantai_normal110');
                        this.cameraView.current.takePicture();
                    }}>
                    <Text style={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#333333',
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#333333',
                        marginTop: 10
                    }}>启动拍照</Text>
                </TouchableOpacity>

                <ReceptionRegisterCameraView
                    style={styles.takePhoto}
                    ref={
                        this.cameraView
                    }
                    onPreviewState={this.onPreviewState.bind(
                        this
                    )}
                    onCaptureState={this.onCaptureState.bind(
                        this
                    )}
                />
            </View>
        );
    }

}


