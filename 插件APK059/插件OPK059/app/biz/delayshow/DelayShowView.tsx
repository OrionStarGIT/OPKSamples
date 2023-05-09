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
    Dimensions,
    ImageBackground
} from 'react-native';
import { observer } from 'mobx-react';
import { HeadTurnViewModel } from '../../headTurn/HeadTurnViewModel';
import { ScreenUtils } from '../../base/util/ScreenUtils';
import { ThirdApkInfo } from '../base/ThirdApkInfo';

const { width, height } = Dimensions.get('window');

/**
 * 传入参数
 */
export interface BasicMotionViewProp {
    viewModel?: HeadTurnViewModel;
}

/**
 * 界面样式
 */
const styles = StyleSheet.create({
    rootView: {
        alignItems: 'center',
        justifyContent:'center',
        width: '100%',
        height: '100%'
    },
    resultText: {
        color: 'white'
    }
});

@observer
export class DelayShowView extends Component<BasicMotionViewProp> {

    /**
     * 绘制界面
     */
    public render(): React.ReactNode {
        if (!this.props.viewModel) {
            return null;
        }
        return ScreenUtils.isLandScape() ? this.renderLandscape() : this.renderVertical();
    }

    private renderVertical() {
        return(            
            <ImageBackground
                source={require('../../../img/bg.png')}
                style={styles.rootView}
            >
                 {this.props.viewModel?.getDelayShow() ? (
                        <>
                            <Text style={styles.resultText}>豹小秘插件APK启动参数为：</Text>
                            {/* <Text style={styles.resultText}>APPID：{ScreenUtils.getCurAppId()}</Text> */}
                            <Text style={styles.resultText}>PackageName：{ThirdApkInfo.PACKAGE_NAME}</Text>
                            <Text style={styles.resultText}>ActivityName：{ThirdApkInfo.MAIN_ACTIVITY}</Text>
                            <Text style={styles.resultText}>请检查对应apk是否安装，包名和activity名是否正确，并确保apk没有在后台运行。</Text>
                        </>
                    ) : null}
            </ImageBackground>
        );  
    }
    private renderLandscape() {
        return(            
            <ImageBackground
                source={require('../../../img/common_bg_img.png')}
                style={styles.rootView}
            >
                {this.props.viewModel?.getDelayShow() ? (
                        <>
                            <Text style={styles.resultText}>mini插件APK启动参数为：</Text>
                            {/* <Text style={styles.resultText}>APPID：{ScreenUtils.getCurAppId()}</Text> */}
                            <Text style={styles.resultText}>PackageName：{ThirdApkInfo.PACKAGE_NAME}</Text>
                            <Text style={styles.resultText}>ActivityName：{ThirdApkInfo.MAIN_ACTIVITY}</Text>
                            <Text style={styles.resultText}>请检查对应apk是否安装，包名和activity名是否正确，并确保apk没有在后台运行。</Text>
                        </>
                    ) : null}
            </ImageBackground>
        );  
    }
}