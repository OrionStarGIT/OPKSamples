import { ImageProps } from 'react-native';
import I18n from "../../source/res/I18n";

export enum DrawerID {
    meal = 'meal',
    cruise = 'cruise',
    welcome = 'welcome',
    settings = 'settings',
    leading = 'leading',
    plate = 'plate',
    divider = 'divider',
    endTask = 'endTask',
    desk = 'desk',
    featureSwitch = 'featureSwitch',
}

export enum ItemType {
    DEFAULT,
    ONLY_TEXT,
    MINER_DEFAULT,
    GRID,
}

export enum SecondaryType {
    selected,
}

export interface DrawerItemBean {
    image?: ImageProps;
    text?: string;
    id: DrawerID;
    isShow: boolean;
    itemType?: ItemType;
    isShowNewIcon?: boolean;
    isSecondary?: boolean;
    isShowSecondary?: boolean;
    secondaryData?: DrawerSecondaryItemBean[];
    secondaryType?: SecondaryType;
    gridData?: GridItemBean[];
    disableClickCloseDrawer?: boolean;
}

export interface DrawerSecondaryItemBean {
    id: DrawerID;
    text: string;
    selectedImage: ImageProps;
    normalImage: ImageProps;
    isSelected?: boolean;
    disableClickCloseDrawer?: boolean;
}

export interface GridItemBean {
    text: string;
    id: DrawerID;
    image?: ImageProps;
}

export default {
    desk: [
        {
            id: DrawerID.featureSwitch,
            isShowRightForwardIcon: true,
            isShow: true,
        },
        {
            text: I18n.settings,
            id: DrawerID.settings,
            isShow: true,
        },
    ],
    task: [
        {
            text: I18n.endTask,
            id: DrawerID.endTask,
            isShow: true,
        },
    ],
    featureData: [
        {text: I18n.meal, id: DrawerID.meal},
        {text: I18n.welcome, id: DrawerID.welcome},
        {text: I18n.cruise, id: DrawerID.cruise},
        {text: I18n.leading, id: DrawerID.leading},
        {text: I18n.deskService, id: DrawerID.desk},
        {text: I18n.plateRecycling, id: DrawerID.plate}
    ]
};

export interface FeatureItemBean {
    text: string;
    id: DrawerID;
}

