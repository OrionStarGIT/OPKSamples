import React from 'react';
import { observer } from 'mobx-react';
import { LinearGradientView } from 'orionos-eve-core';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import I18n from '../../../source/res/I18n';

const height = Dimensions.get('screen').height
const styles = StyleSheet.create({
    dialogStyle: {
        width: '100%',
        height: height,
        alignItems: 'center',
        position: 'absolute'
    },
    title: {
        marginTop: 73,
        color: 'white',
        fontSize: 23,
    },
    subTitle: {
        marginTop: 9,
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        textAlign: 'center',
        height: 37,
    },
    icon: {
        marginTop: 12,
        width: 246,
        height: 246,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 64,
    },
    cancelTextContainer: {
        height: 46,
        width: 131,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    confirmTextContainer: {
        height: 46,
        width: 131,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        backgroundColor: '#00E193',
        marginLeft: 20,
    },
    cancelTextStyle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    confirmTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

interface ModalOverRunOutProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    onShow?: () => void;
}

/**
 * 过流保护界面
 */
@observer
export class ModalOverRunOut extends React.Component<ModalOverRunOutProps>{

    public constructor(props: ModalOverRunOutProps) {
        super(props);
        this.props.onShow?.();
    }

    public render() {
        return (
            <LinearGradientView
                style={styles.dialogStyle}
                startPoint={{ x: 0, y: 0 }}
                endPoint={{ x: 0, y: 1 }}
                colors={['#031E71', '#0052B6', '#0095F1']}
                border={[0, 0, 0, 0, 0, 0, 0, 0]}
            >
                <Text style={styles.title}>{I18n.overRunTitle}</Text>
                <Text style={styles.subTitle}>{I18n.overRunSubTitle}</Text>
                <Image
                    style={styles.icon}
                    source={require('../../../../img/navigation/over_run_out_icon.png')}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.cancelTextContainer, {backgroundColor: 'rgba(255,255,255,0.1)'}]}
                        onPress={this.props.onCancel}>
                        <Text style={styles.cancelTextStyle}>{I18n.noProcess}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.confirmTextContainer}
                        onPress={this.props.onConfirm}>
                        <Text style={styles.confirmTextStyle}>{I18n.resumeWork}</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradientView>
        );
    }
}