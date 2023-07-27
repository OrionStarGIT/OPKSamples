import React, { ReactNode, RefObject } from "react";
import { observer } from 'mobx-react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, WebView} from "react-native";
import { TaskPendingViewModel } from "./TaskPendingViewModel";
import { ToolBar } from "../views/ToolBar";
// import { TaskDialog } from "../views/TaskDialog";
// import { ToastView } from "../views/ToastView";
import I18n from "../../source/res/I18n";
// import { TaskBean, TaskType } from "../TaskInterface";
// import { dateFormat } from "../../base/util/DateUtil";
// import { TakeRet } from "../repository/TaskApi";
// import { LoadingView } from "../views/LoadingView";
// import { TimerPickModal } from "../views/TimerPickModal";
// import { StringUtil } from "../../base/util/StringUtil";
import { UIContainerUtil } from "../utils/UIContainerUtil";

const styles = StyleSheet.create({
    flatList: {
        paddingLeft: 17,
        paddingRight: 17,
        marginBottom: 88,
    },
    itemView: {
        width: 308,
        height: 108,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 6,
    },
    icon: {
        width: 59,
        height: 29,
        position: 'absolute',
        left: -4,
        top: -5,
        alignItems: 'center',
    },
    taskTypeText: {
        fontSize: 9,
        color: 'white',
        marginTop: 5,
    },
    time: {
        position: 'absolute',
        right: 6,
        top: 6,
        color: '#555D61',
        fontSize: 9,
    },
    contentView: {
        width: '100%',
        paddingLeft: 9,
        paddingRight: 9,
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 14,
        color: '#272727',
        fontWeight: 'bold',
        lineHeight: 17,
        textAlignVertical: 'center',
    },
    highLightText: {
        lineHeight: 17,
        fontSize: 14,
        color: '#2D86FD',
        marginLeft: 1,
        marginRight: 1,
        fontWeight: 'normal',
    },
    btnContainer: {
        position: 'absolute',
        bottom: 9,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    pureBtnContainer: {
        backgroundColor: '#2D86FD',
        width: 114,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    bareBtnContainer: {
        borderColor: '#2D86FD',
        borderWidth: 1.1,
        width: 114,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginLeft: 9,
    },
    whiteBtnText: {
        color: 'white',
        fontSize: 10,
    },
    blueBtnText: {
        color: '#2D86FD',
        fontSize: 10,
    },
    replyContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 43,
    },
    replyBtnText: {
        fontSize: 18,
        color: 'white',
        width: 286,
        height: 46,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 24,
        backgroundColor: '#CCD2D6'
    },
    deleteContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 26,
        height: 26,
        alignItems: 'center',
    },
    delete: {
        width: 26,
        height: 26,
    },
    otherPullText: {
        fontSize: 11,
        color: 'rgba(85,93,97,0.3)'
    },
    cannotArriveTip: {
        fontSize: 8,
        color: 'rgba(85,93,97,0.3)',
        bottom: 2,
        left: 40,
        position: 'absolute'
    }
});

interface TaskPendingScreenProps {
    viewModel: TaskPendingViewModel;
}

@observer
export class TaskPendingScreen extends React.Component<TaskPendingScreenProps>{

    private viewModel: TaskPendingViewModel;
    private dialogRefMap: Map<number, any>;
    private readonly pickerTierRefMap: Map<number, any>;
    // private readonly toastRef: RefObject<ToastView>;
    // private readonly loadingRef: RefObject<LoadingView>;


    public constructor(props: TaskPendingScreenProps) {
        super(props);

        this.viewModel = props.viewModel;
        this.dialogRefMap = new Map();
        // this.toastRef = React.createRef();
        // this.loadingRef = React.createRef();
        this.pickerTierRefMap = new Map();
    }

    public componentWillUnmount(): void {
        this.dialogRefMap.clear();
        this.pickerTierRefMap.clear();
    }

    public render(): React.ReactNode {
        return (
            UIContainerUtil.createDrawer({
                isShowDrawer: true,
                data: this.viewModel.drawerData,
                itemClick: this.viewModel.drawerItemClick,
                backgroundSource: require('../../../img/com_bg.png'),
                children: (
                    <>
                        <WebView
                            style={{ width: '100%', height: '100%' }}
                            automaticallyAdjustContentInsets={true}
                            allowsInlineMediaPlayback={true}
                            source={{ uri: 'https://www.sina.com.cn/' }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            decelerationRate="normal"
                            startInLoadingState={true}
                            mixedContentMode="compatibility"
                        />
                        {/* <ToolBar
                            title={I18n.toDoTask}
                            isHideBack={true}
                            style={{ marginTop: 51, marginBottom: 5 }}
                        />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            overScrollMode={"never"}
                            extraData={JSON.stringify(this.viewModel.data)}
                            style={styles.flatList}
                            data={this.viewModel.data}
                            renderItem={({item, index}) => {
                                return (
                                    this.renderItem(item, index)
                                );
                            }}
                        />
                        <View style={styles.replyContainer}>
                            <TouchableOpacity
                                onPress={this.viewModel.confirm}
                                disabled={this.viewModel.isDisableBtnComplete}
                            >
                                <Text
                                    style={
                                        [styles.replyBtnText, {
                                            backgroundColor: this.viewModel.isDisableBtnComplete
                                                ? '#CCD2D6'
                                                : '#00E193'
                                        }]
                                    }
                                >
                                    {I18n.replyCustomer}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {this.toastView()}
                        {this.loadingView()} */}
                    </>
                )
            })
        );
    }

    // private renderItem(item: TaskBean, index: number) {
    //     return (
    //         <View
    //             style={[styles.itemView, {
    //                 height: this.itemHeight(item)
    //             }]}
    //         >
    //             <ImageBackground
    //                 style={styles.icon}
    //                 source={
    //                     this.isGray(item)
    //                         ? require('../../../img/taskpending/gray_icon.png')
    //                         : this.viewModel.getImage(item)
    //                 }
    //             >
    //                 <Text style={[styles.taskTypeText, this.opacity(item)]}>
    //                     {this.viewModel.getTaskTypeName(item.task_type)}
    //                 </Text>
    //             </ImageBackground>
    //             <Text style={[styles.time, this.opacity(item)]}>
    //                 {dateFormat(item.task_time * 1000,'hh:mm:ss')}
    //             </Text>
    //             {this.getItemContentView(item)}
    //             {this.handleTaskBtn(item, index)}
    //             {this.isGray(item) ? null : (
    //                 <TouchableOpacity
    //                     style={styles.deleteContainer}
    //                     onPress={() => this.showTaskDialog(index)}
    //                 >
    //                     <Image
    //                         style={styles.delete}
    //                         source={require('../../../img/delete_btn.png')}
    //                     />
    //                 </TouchableOpacity>
    //             )}
    //             {this.cancelDialog(item, index)}
    //             {this.tierPickerView(item, index)}
    //             {this.cannotArriveTip(item)}
    //         </View>
    //     );
    // }

    // private getItemContentView(item: TaskBean) {
    //     if (item.isCancel) {
    //         return this.titleView(item);
    //     }
    //     switch (item.task_type) {
    //         case TaskType.zcb_ask_hurry:
    //         case TaskType.zcb_clear_table:
    //         case TaskType.zcb_call_waiter:
    //             return this.highAndTitleView(item);
    //         case TaskType.zcb_need_tableware:
    //             return this.highTitleHighView(item);
    //     }
    // }

    // private highTitleHighView(item: TaskBean) {
    //     return (
    //         <View
    //             style={styles.contentView}
    //         >
    //             <Text
    //                 numberOfLines={3}
    //                 style={[styles.itemTitle, this.opacity(item)]}
    //             >
    //                 <Text style={styles.highLightText}>
    //                     {item.task_data.from_pos_name}
    //                 </Text>
    //                 {this.viewModel.getItemTitle(item)}
    //                 <Text style={styles.highLightText}>
    //                     {this.viewModel.getTablewareText(item)}
    //                 </Text>
    //             </Text>
    //         </View>
    //     );
    // }

    // //高亮桌号+固定标题
    // private highAndTitleView(item: TaskBean) {
    //     return (
    //         <View
    //             style={styles.contentView}
    //         >
    //             <Text style={[styles.itemTitle, this.opacity(item)]}>
    //                 <Text
    //                     style={styles.highLightText}
    //                     numberOfLines={3}
    //                 >
    //                     {item.task_data.from_pos_name}
    //                 </Text>
    //                 {this.viewModel.getItemTitle(item)}
    //             </Text>
    //         </View>
    //     );
    // }

    // private titleView(item: TaskBean) {
    //     return (
    //         <View
    //             style={styles.contentView}
    //         >
    //             <Text
    //                 style={[styles.itemTitle, this.opacity(item)]}
    //                 numberOfLines={3}
    //             >
    //                 {this.viewModel.getItemTitle(item)}
    //             </Text>
    //         </View>
    //     );
    // }

    // private handleTaskBtn(item: TaskBean, index: number) {
    //     if (item.isCancel) {
    //         return null;
    //     }
    //     if (item.isRobotReply || item.isNoNeedRobotReply) {
    //         return (
    //             <View
    //                 style={styles.btnContainer}
    //             >
    //                 <Text style={styles.otherPullText}>
    //                     {this.viewModel.getHandleBtnText(item)}
    //                 </Text>
    //             </View>
    //         );
    //     }
    //     if (item.isTake) {
    //         return (
    //             <View
    //                 style={[styles.btnContainer, {
    //                     bottom: item.availableArrive ? styles.btnContainer.bottom : 15
    //                 }]}
    //             >
    //                 <TouchableOpacity
    //                     style={[styles.pureBtnContainer, {
    //                         opacity: item.availableArrive ? 1 : 0.3
    //                     }]}
    //                     disabled={!item.availableArrive}
    //                     onPress={() => {
    //                         if (item.task_type === TaskType.zcb_need_tableware) {
    //                             this.showTierPicker(index);
    //                         } else {
    //                             this.viewModel.robotReply(item);
    //                         }
    //                     }}
    //                 >
    //                     <Text style={styles.whiteBtnText}>
    //                         {this.viewModel.getHandleBtnTextArray(item)[0]}
    //                     </Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity
    //                     style={styles.bareBtnContainer}
    //                     disabled={this.isGray(item)}
    //                     onPress={() => {
    //                         this.viewModel.noNeedRobotReply(item).then((value) => {
    //                             if (!value) {
    //                                 this.showToast(I18n.netError);
    //                             }
    //                         });
    //                     }}
    //                 >
    //                     <Text style={styles.blueBtnText}>
    //                         {this.viewModel.getHandleBtnTextArray(item)[1]}
    //                     </Text>
    //                 </TouchableOpacity>
    //             </View>
    //         );
    //     }
    //     return (
    //         <View
    //             style={styles.btnContainer}
    //         >
    //             <TouchableOpacity
    //                 style={styles.pureBtnContainer}
    //                 disabled={this.isGray(item)}
    //                 onPress={() => {
    //                     this.showLoading(true);
    //                     this.viewModel.takeTask(item).then((value) => {
    //                         this.showLoading(false);
    //                         if (value !== TakeRet.OK) {
    //                             this.showToast(StringUtil.getString(I18n.errorToast, value));
    //                         }
    //                     });
    //                 }}
    //             >
    //                 <Text style={styles.whiteBtnText}>
    //                     {this.viewModel.getHandleBtnText(item)}
    //                 </Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }

    // private cancelDialog(item: TaskBean, index: number): ReactNode {
    //     return (
    //         <TaskDialog
    //             ref={(ref) => this.dialogRefMap.set(index, ref)}
    //             style={{ height: 183 }}
    //             title={I18n.cancelTask}
    //             subTitle={I18n.cancelTaskWarn}
    //             onConfirm={() => {
    //                 this.viewModel.cancelTask(item).then((value) => {
    //                     if (value) {
    //                         this.showToast(I18n.taskCancelSuccess);
    //                     }
    //                 });
    //             }}
    //         />
    //     );
    // }

    // private toastView(): ReactNode {
    //     return (
    //         <ToastView
    //             ref={this.toastRef}
    //         />
    //     );
    // }

    // private loadingView(): ReactNode {
    //     return (
    //         <LoadingView
    //             ref={this.loadingRef}
    //         />
    //     );
    // }

    // private tierPickerView(item: TaskBean, index: number): React.ReactNode {
    //     return (
    //         <TimerPickModal
    //             ref={(ref) => this.pickerTierRefMap.set(index, ref)}
    //             title={I18n.tierPickTitle}
    //             subTitle={I18n.tierPickSubTitle}
    //             data={this.viewModel.floors}
    //             firstIndex={0}
    //             onConfirm={(pickIndex: number) => {
    //                 item.tier = pickIndex + 1;
    //                 this.viewModel.robotReply(item);
    //             }}
    //         />
    //     );
    // }

    // private cannotArriveTip(item: TaskBean): React.ReactNode {
    //     if (item.availableArrive || !item.isTake || item.isNoNeedRobotReply) {
    //         return null;
    //     }
    //     return (
    //         <Text style={styles.cannotArriveTip}>
    //             {I18n.cannotArriveTip}
    //         </Text>
    //     );
    // }

    // private showTierPicker(index: number): void {
    //     this.pickerTierRefMap.get(index)?.show();
    // }

    // private showTaskDialog(index: number): void {
    //     let dialogRef = this.dialogRefMap.get(index);
    //     if (dialogRef) {
    //         dialogRef.show();
    //     }
    // }

    // private showLoading(isShow: boolean) {
    //     if (isShow) {
    //         this.loadingRef.current?.show();
    //     } else {
    //         this.loadingRef.current?.dismiss();
    //     }
    // }

    // private showToast(text: string): void {
    //     this.toastRef.current?.show(text);
    // }

    // private opacity(item: TaskBean) {
    //     return {opacity: this.isGray(item) ? 0.3 : 1};
    // }

    // private isGray(item: TaskBean): boolean {
    //     return !!item.isCancel
    //         || !!item.isRobotReply
    //         || !!item.isNoNeedRobotReply;
    // }

    // private itemHeight(item: TaskBean): number {
    //     return item.availableArrive ? styles.itemView.height : 114
    // }
}