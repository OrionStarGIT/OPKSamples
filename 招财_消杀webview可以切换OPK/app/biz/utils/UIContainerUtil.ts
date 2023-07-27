import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AppManager } from 'orionos-eve-core';
import React, { ReactElement } from 'react';
import { DrawerID, DrawerItemBean, DrawerSecondaryItemBean, FeatureItemBean } from '../drawer/DrawerData';

export class UIContainerUtil {
    /**
     *
     * @param key
     * @param props
     */
    public static create(
        key: 'tip_drawer' | 'tip_POP' | 'video_and_image' | 'image' | 'video',
        props?: {
            type?: string;
            appid?: string;
            msgId?: string;
            style?: ViewStyle;
            ref?: (ref: any) => void;
            playBehavior?: 'immediately' | 'wait_face';
            isAutoSwitch?: boolean;
            onFullShow?: () => void;
            onFullDismiss?: () => void;
        }
    ) {
        if (!props) {
            props = {};
        }
        if (!props.appid) {
            //自动注入当前appid
            Object.defineProperty(props, 'appid', {
                value: AppManager.getAppId(),
                enumerable: true,
                configurable: true
            });
        }

        return this.createView(key, props);
    }

    public static createDrawer(
        props: {
            data: DrawerItemBean[];
            onDrawerOpen?: () => void;
            onDrawerClose?: () => void;
            isShowDrawer?: boolean;
            ref?: any;
            defaultCount?: number;
            itemClick?: (id: DrawerID, isChargingDisable?: boolean) => void;
            onSecondaryItemClick?: (item: DrawerItemBean, secondaryItem: DrawerSecondaryItemBean) => void;
            backgroundSource?: any;
            drawerBtnStyle?: StyleProp<any>;
            drawerIcon?: NodeRequire;
            isCharging?: boolean;
            style?: StyleProp<any>;
            footerView?: React.ReactElement;
            curFeature?: string;
            children: React.ReactElement;
        }
    ): React.ReactElement {
        return this.createView('drawer', props);
    }

    public static createClickForHelperView(props?: {
        style?: ViewStyle;
    }): ReactElement {
        return this.createView('helper_view', props);
    }

    public static createOpkNavigationView(props: {
        data: FeatureItemBean[];
        curFeature?: string | undefined;  //当前处于哪个应用中
        onBack?: () => void;
        onClickOpkItem?: (id: DrawerID) => void;
    }): ReactElement {
        return this.createView('opk_navigation_view', props);
    }

    public static createSystemSettingView(props?: {
        textTitleStyle?: TextStyle;
        bgColors?: string[];
        imageBgSource?: ImageSourcePropType;
        contentStyle?: ViewStyle;
    }): ReactElement {
        return this.createView('system_setting', props);
    }

    public static createSystemSettingDetailView(): ReactElement {
        return this.createView('system_setting_detail', {});
    }

    public static createToolBar(props: {
        title: string;
        isHideBack?: boolean;
        style?: ViewStyle;
        onBack?: () => void;
    }): ReactElement {
        return this.createView('tool_bar', props);
    }

    public static createView(
        key: 'tip_drawer' | 'tip_POP' | 'video_and_image' | 'image'
            | 'video' | 'circle_progress' | 'drawer' | 'helper_view'
            | 'tool_bar' | 'system_setting' | 'system_setting_detail'
            |'opk_navigation_view',
        props: any
    ) {
        // @ts-ignore
        return global.create?.(key, props);
    }

    public static isDrawerOpen() {
        // @ts-ignore
        return global.drawerModel?.isDrawerOpen();
    }

    public static closeDrawer() {
        // @ts-ignore
        global.drawerModel?.setIsDrawerOpen(false);
    }

    public static openDrawer() {
        // @ts-ignore
        global.drawerModel?.setIsDrawerOpen(true);
    };
}