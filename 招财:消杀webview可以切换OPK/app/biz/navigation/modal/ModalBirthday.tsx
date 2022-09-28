import React from "react";
import { observer } from 'mobx-react';
import { Dimensions, Image, Modal, StyleSheet, View } from "react-native";
import { AppManager } from "orionos-eve-core";

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get("screen").height,
        position: 'absolute',
    },
    content: {
        flex: 1,
    }
});

interface ModalBirthdayProps {
    visible: boolean;
}

/**
 * 导航中生日祝福界面
 */
@observer
export class ModalBirthday extends React.Component<ModalBirthdayProps>{

    public render(): React.ReactNode {
        if (!this.props.visible) {
            return null;
        }
        return (
            <View
                pointerEvents={"none"}
                style={styles.container}
            >
                <Image
                    style={styles.content}
                    source={{uri: "file://" + AppManager.getOpkExtraPath() + "/theme_mode_bless_bg.gif"}}
                />
            </View>
        );
    }

}