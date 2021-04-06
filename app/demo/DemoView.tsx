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
import { observer } from 'mobx-react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { DemoViewModel } from './DemoViewModel';

/**
 * 传入参数
 */
export interface DemoViewProps {
    viewModel?: DemoViewModel;
}

/**
 * 界面样式
 */
const styles = StyleSheet.create({
    rootView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    titleText: {
        fontSize: 20,
        color: 'black'
    },
    infoText: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 10
    }
});

/**
 * 显示界面
 */
@observer
export class DemoView extends Component<DemoViewProps> {

    /**
     * 绘制界面
     */
    public render(): React.ReactNode {
        if (!this.props.viewModel) {
            return null;
        }
        return (
            <View style={styles.rootView}>
                <Text style={styles.infoText}> {this.props.viewModel.getInfoText()}</Text>
                <Button
                    title={'换一换'}
                    onPress={this.props.viewModel.onPressChangeText}/>
            </View>
        );

    }
}
