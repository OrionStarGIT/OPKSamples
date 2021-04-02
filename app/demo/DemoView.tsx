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
