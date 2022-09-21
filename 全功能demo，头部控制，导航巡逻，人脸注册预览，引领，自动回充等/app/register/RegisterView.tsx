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

import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { observer } from 'mobx-react';
import { RegisterViewModel } from './RegisterViewModel';

const { width, height } = Dimensions.get('window');

/**
 * 传入参数
 */
export interface RegisterViewProp {
    viewModel?: RegisterViewModel;
}

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
    resultArea: {
        flex: 1,
        width: '90%',
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'dodgerblue',
        alignItems: 'center'
    },
    resultScroll: {
        width: '90%',
        height: '100%',
    },
    resultText: {
        fontSize: 12,
        alignSelf: 'center',
        width: '100%',
        height: '100%'
    }
});

@observer
export class RegisterView extends Component<RegisterViewProp> {

    private mScroll?: ScrollView;

    /**
     * 绘制界面
     */
    public render(): React.ReactNode {
        if (!this.props.viewModel) {
            return null;
        }
        return (
            <View style={styles.rootView}>
                <View style={styles.button}>
                    <Button
                        color={'dodgerblue'}
                        title={'开始人脸注册'}
                        onPress={this.props.viewModel.onPressStartRegister}/>
                </View>
                <View style={styles.button}>
                    <Button
                        color={'dodgerblue'}
                        title={'停止人脸注册'}
                        onPress={this.props.viewModel.onPressFinishRegister}/>
                </View>
                <SafeAreaView style={styles.resultArea}>
                    <ScrollView
                        ref={this.setScroll}
                        onContentSizeChange={this.onContentSizeChange}
                        style={styles.resultScroll}
                        showsVerticalScrollIndicator={false}>
                        <Text style={styles.resultText}>
                            {this.props.viewModel.getResultText()}
                        </Text>
                    </ScrollView>
                </SafeAreaView>
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