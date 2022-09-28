import React from 'react';
import { observer } from 'mobx-react';
import { LinearGradientView } from 'orionos-eve-core';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import I18n from '../../../source/res/I18n';
import { StringUtil } from "../../../base/util/StringUtil";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('screen').height,
        alignItems: 'center',
        position: 'absolute'
    },
    icon: {
        width: 77,
        height: 77,
        marginTop: 150,
    },
    title: {
        color: 'white',
        fontSize: 18,
        marginTop: 29
    },
    subTitle: {
        color: 'white',
        fontSize: 14,
        marginTop: 19
    },
    errorCodeText: {
        marginTop: 20,
        color: 'white',
        fontSize: 10,
    },
    hintText: {
        color: 'white',
        fontSize: 8,
        marginTop: 70
    },
    btnContainer: {
        flexDirection: 'row',
    },
    cancelTextContainer: {
        height: 46,
        width: 131,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        borderColor: '#ffffff',
        borderWidth: 1,
        position: "absolute",
        bottom: 50,
        left: 35,
    },
    confirmTextContainer: {
        height: 46,
        width: 131,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        backgroundColor: '#00E193',
        position: "absolute",
        bottom: 50,
        right: 35,
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

export interface ModalCannotArriveProps {
    visible: boolean;
    title: string;
    subTitle: string;
    errorCode: string;
    hintText?: string;
    cancelText?: string;
    confirmText?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    onShow?: () => void;
}

const Display = require('react-native-display').default;

@observer
export class ModalCannotArrivePoint extends React.Component<ModalCannotArriveProps> {

    public constructor(props: ModalCannotArriveProps) {
        super(props);
        this.props.onShow?.();
    }

    public render(): React.ReactNode {
        const {title, subTitle, errorCode, hintText, cancelText, confirmText } = this.props;
        return (
            <LinearGradientView
                style={styles.container}
                startPoint={{ x: 0, y: 0 }}
                endPoint={{ x: 0, y: 1 }}
                colors={['#031E71', '#0052B6', '#0095F1']}
                border={[0, 0, 0, 0, 0, 0, 0, 0]}
            >
                <Image
                    style={styles.icon}
                    source={require('../../../../img/navigation/warning.png')}/>

                <Text style={styles.title}>{title}</Text>

                <Text style={styles.subTitle}>{subTitle}</Text>

                <Display enable={!StringUtil.isEmpty(errorCode)}>
                    <Text style={styles.errorCodeText}>
                        {StringUtil.getString(I18n.errorCode, errorCode)}
                    </Text>
                </Display>


                <Display
                    enable={!StringUtil.isEmpty(hintText)}>
                    <Text style={styles.hintText}>{hintText}</Text>
                </Display>

                <TouchableOpacity
                    style={styles.cancelTextContainer}
                    onPress={this.props.onCancel}>
                    <Text style={styles.cancelTextStyle}>
                        {cancelText ? cancelText : I18n.navEndTask}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.confirmTextContainer}
                    onPress={this.props.onConfirm}>
                    <Text style={styles.confirmTextStyle}>
                        {confirmText ? confirmText : I18n.reboot_robot}
                    </Text>

                </TouchableOpacity>
            </LinearGradientView>
        );
    }
}