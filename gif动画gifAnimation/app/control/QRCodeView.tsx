import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    Image,
    ImageBackground,
    Animated,
    Easing,
} from 'react-native';
import { RobotSettingApi,SystemInfo } from 'orionos-eve-core';
import QRCode from 'react-native-qrcode';
import { DemoViewModel } from '../demo/DemoViewModel';
// import { homeStore } from "../../model/HomeModel";

const styles = StyleSheet.create({
    QrMain: {
        width: 340,
        height: 400,
        marginTop: 100,
        marginLeft: 0,
        backgroundColor: '#F0FFFFFF',
        flexDirection: 'column',
        borderRadius: 9
    },
    QrTitleMain: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center'
    },
    Wechat: {
        width: 17,
        height: 17,
        marginRight: 1
    },
    QrTiTle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#202A37FF',
        fontSize: 14
    },
    Qr2Title: {
        textAlign: 'center',
        color: '#818A98FF',
        marginTop: 6,
        fontSize: 25,
        marginLeft: 21,
        marginRight: 21,
        height:28
    },
    QrBg: {
        width: 200,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 3,
        marginTop: 30,
        alignSelf: 'center',
        elevation: 2
    },
    QrImg: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        margin: 5
    },
    QrLoading: {
        width: 27,
        height: 27,
        alignSelf: 'center',
        margin: 32
    },
    CloseBtn: {
        width: 96,
        height: 26,
        borderRadius: 17,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 13,
        backgroundColor: '#fff',
        elevation: 5
    }
});

interface State {
    modalShow: boolean;
    countDown: number;
    loadEnd: boolean;
}
type ViewModel = DemoViewModel


interface DemoProps {
    demoViewModel: ViewModel | undefined | null;
    showSkipView?: boolean;
}

const { width, height, scale } = Dimensions.get('screen');
const TAG = 'QRCodeView';
@observer
export class QRCodeView extends React.Component<DemoProps, State> {
    private sn = SystemInfo.getDeviceSn();

    private qrUrl = '';
    private spinValue: any;
    private timer: any;
    private demoViewModel: ViewModel;
    private showSkipView: boolean;

    public constructor(props: any) {
        super(props);
        this.demoViewModel = props.demoViewModel;
        this.showSkipView = props.showSkipView;
        console.log("-----------------------------------" + JSON.stringify(this.demoViewModel.showSpeechText));
        this.spinValue = new Animated.Value(0);
        this.state = {
            modalShow: true,
            countDown: 30,
            loadEnd: false
        };

        this.timer = setInterval((): void => {
            this.setState(previousState => {
                var prev = previousState.countDown;
                console.log(TAG, 'prev:' + prev--);
                if (prev == 0) {
                    clearTimeout(this.timer);

                    this.setState(previousState => {
                        return {
                            modalShow: false
                        };
                    });
                }
                return {
                    countDown: prev
                };
            });
        }, 1000);
        this.qrUrl ='weixin://wxpay/bizpayurl?pr=YTvXv8Jzz';
        // RobotSettingApi.getRobotInt("robot_setting_system_environment")
        //     .then((result: number): void => {
        //         console.log('type:', result);
        //         //0正式   1测试   2灰度
        //         if (result === 0) {
        //             if(homeStore.getControlSilent){// 静默模式
        //                 this.qrUrl =
        //                     'https://mini-wx.ainirobot.com/api/xcx/qrcode?sn=' +
        //                     this.sn +
        //                     '&manager_id=12345678&auto_agree=true&allow_control=true&silent_control=true&cyclic_use=true&expiration=60' +
        //                     '&auth_key=0TA1D2NIOSPRY75LE3QZHWK9XJBGM68U&share_from=robot&time=' +
        //                     new Date().getTime();
        //             }else {
        //                 this.qrUrl =
        //                     'https://mini-wx.ainirobot.com/api/xcx/qrcode?sn=' +
        //                     this.sn +
        //                     '&manager_id=12345678&auto_agree=true&allow_control=true&auth_key=0TA1D2NIOSPRY75LE3QZHWK9XJBGM68U&share_from=robot&time=' +
        //                     new Date().getTime();
        //             }
        //         } else {
        //             if(homeStore.getControlSilent){// 静默模式
        //                 this.qrUrl =
        //                     'https://dev-mini-rc.ainirobot.com/api/xcx/qrcode?sn=' +
        //                     this.sn +
        //                     '&manager_id=12345678&auto_agree=true&allow_control=true&silent_control=true&cyclic_use=true&expiration=60' +
        //                     '&auth_key=demo_key&share_from=robot&time=' +
        //                     new Date().getTime();
        //             }else {
        //                 this.qrUrl =
        //                     'https://dev-mini-rc.ainirobot.com/api/xcx/qrcode?sn=' +
        //                     this.sn +
        //                     '&manager_id=12345678&auto_agree=true&allow_control=true&auth_key=demo_key&share_from=robot&time=' +
        //                     new Date().getTime();
        //             }
        //         }
        //     })
        //     .catch((e: any): void => {
        //         console.log('type err:', e);
        //     });

    }

    public componentWillUnmount(): void {
        // homeStore.setControlModalShow(false);
        // homeStore.setControlSilent(false);
        console.log(TAG, 'componentWillUnmount modalShow:',this.state.modalShow);
        clearTimeout(this.timer);
    }


    public componentDidMount(): void{
        console.log(TAG, 'componentDidMount ');
        this.spin();
    }
    //旋转方法
    private spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 4000,
            easing: Easing.linear
        }).start(() => this.spin())
    }

    public render(): React.ReactChild {
        const { modalShow, loadEnd } = this.state;
        // homeStore.setControlModalShow(modalShow);
        console.log(TAG,'render modalShow:' + modalShow + 'loadEnd:' + loadEnd);
        console.log(TAG,'isProd:' + 'qrUrllll:' + this.qrUrl);
        //映射 0-1的值 映射 成 0 - 360 度
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        })

        return (
            <Modal
                animationType="slide"
                visible={modalShow}
                presentationStyle={'overFullScreen'}
                transparent={true}
                onDismiss={(): void => {
                    clearTimeout(this.timer);
                }}
            >
                {/* <TouchableOpacity
                    activeOpacity={1}
                    onPress={(): void => {
                        console.log(TAG, 'close touch');
                        this.setState(previousState => {
                            return {
                                modalShow: false
                            };
                        });
                    }}
                > */}
                    <View
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <View style={styles.QrMain}>
                            <View style={styles.QrTitleMain}>
                                {/* <Image
                                    style={styles.Wechat}
                                    source={require('../../img/newRecommend/wechat.png')}
                                ></Image> */}
                                <Text style={styles.QrTiTle}>
                                    微信扫码
                                </Text>
                            </View>
                            <Text style={styles.Qr2Title}>
                                {this.state.countDown}s
                            </Text>
                            <View style={styles.QrBg}>
                                <QRCode
                                    //style={styles.QrImg}
                                    value={'https://me.csdn.net/weixin_37695006'}
                                    size={195}
                                    // bgColor="purple"
                                    // fgColor="white"
                                />
                                {/* <ImageBackground
                                    style={styles.QrImg}
                                    source={require('../../img/newRecommend/wechat.png')}
                                    onLoadEnd={(): void => {
                                        console.log(TAG, 'onLoadEnd');
                                        this.setState(previousState => {
                                            return {
                                                loadEnd: true
                                            };
                                        });
                                    }}
                                >
                                    {loadEnd ? null : (
                                        <Animated.Image
                                            style={[styles.QrLoading,{transform: [{ rotate:spin}]}]}
                                            source={require('../../img/newRecommend/loading.png')}
                                        ></Animated.Image>
                                    )}
                                </ImageBackground> */}
                            </View>
                            {/* <TouchableOpacity
                                activeOpacity={1}
                                onPress={(): void => {
                                    console.log(TAG, 'close touch');
                                    this.setState(previousState => {
                                        return {
                                            modalShow: false
                                        };
                                    });
                                }}
                            >
                                <View style={styles.CloseBtn}>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: '#202A37FF',
                                            textAlign: 'center'
                                        }}
                                    >
                                        关闭({this.state.countDown}s)
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                {/* </TouchableOpacity> */}
            </Modal>
        );
    }
}
