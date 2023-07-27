import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { RouterManager } from "../manager/RouterManager";

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 36,
        marginBottom: 31,
        justifyContent: 'center',
    },
    backTouch: {
        width: 51,
        height: 51,
        top: -14,
        left: 7,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        width: 11,
        height: 19,
    },
    title: {
        fontSize: 17,
        color: 'white'
    },
});

interface ToolBarProps {
    title: string;
    isHideBack?: boolean;
    style?: ViewStyle;
}

export class ToolBar extends React.Component<ToolBarProps>{

    public render(): React.ReactNode {
        return (
            <View
                style={[styles.titleContainer, this.props.style]}>
                {this.props.isHideBack ? null : (
                    <TouchableOpacity
                        style={styles.backTouch}
                        onPress={() => RouterManager.back()}
                    >
                        <Image
                            style={styles.back}
                            source={require('../../../img/back.png')}
                        />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }

}