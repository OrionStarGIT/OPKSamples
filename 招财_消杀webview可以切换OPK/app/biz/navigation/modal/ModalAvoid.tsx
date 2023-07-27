import React from 'react';
import { observer } from 'mobx-react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Log } from "../../../base/log/Log";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('screen').height,
        alignItems: 'center',
        position: 'absolute'
    },
    touchContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'black',
        height: Dimensions.get('screen').height
    },
    title: {
        marginTop: 41,
        fontSize: 23,
        color: 'white',
        textAlign: 'center',
        height: 100,
    },
    emoji: {
        width: 297,
        height: 167,
        marginTop: 51,
    },
    canNotPass: {
        width: 217,
        height: 41,
        marginTop: 65
    },
    giveWay: {
        width: 169,
        height: 19,
        marginTop: 26
    },
    touchableView: {
        alignItems: 'center',
    },
});

interface AvoidProps {
    visible: boolean;
    title: string;
    onTouch?: () => void;
    onShow?: () => void;
    onDismiss?: () => void;
}

const Display = require('react-native-display').default;

@observer
export class ModalAvoid extends React.Component<AvoidProps>{

    public constructor(props: AvoidProps) {
        super(props);
    }

    public componentWillUpdate(nextProps: Readonly<AvoidProps>,
        nextState: Readonly<{}>, nextContext: any): void {
        Log.d('ModalAvoid', 'componentWillUpdate nextVisible =' + nextProps.visible
            + ",visible ="+this.props.visible);
        if (this.props.visible !== nextProps.visible) {
            if (nextProps.visible) {
                this.props.onShow?.();
            } else {
                this.props.onDismiss?.();
            }
        }
    }

    public render() {
        return (
            <Display
                enable={this.props.visible}
                style={styles.container}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.touchContainer}
                    onPress={this.props.onTouch}
                >
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Image
                        style={styles.emoji}
                        source={require('../../../../img/navigation/emoji_avoid.png')}
                    />
                    <Image
                        style={styles.canNotPass}
                        source={require('../../../../img/navigation/can_not_pass.png')}
                    />
                    <Image
                        style={styles.giveWay}
                        source={require('../../../../img/navigation/give_way.png')}
                    />

                </TouchableOpacity>
            </Display>
        );
    }
}