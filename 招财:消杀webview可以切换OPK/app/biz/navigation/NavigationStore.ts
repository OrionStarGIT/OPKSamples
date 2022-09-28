import { action, observable } from 'mobx';
import { NavErrorInfo } from "./NavErrorInfo";
import { ModalCannotArriveProps } from "./modal/ModalCannotArrivePoint";
import { Log } from "../../base/log/Log";

export enum NavigationErrorType {
    GET_LOST, //找不到路
    FATAL_ERROR, //严重异常
    AVOID_TIMEOUT,
    MULTI_ROBOT_ERROR
}

const TAG = 'NavigationModel'
export class NavigationModel {

    private mIsAvoid: boolean = false;
    private mAvoidTimes: number = 0;

    public state = observable({
        isNavigation: false,
        isShowAvoidScreen: false,
        isArrived: false,
        isCannotArrived: false,
        isOverRun: false,
        isShowDrawer: false,
        isShowBirthdayModal: false,
        currentPoint: '',
        navigationErrorCode: -1,
        navigationErrorType: -1,
        navErrorInfo: NavErrorInfo.make(),
        title: '',
    });

    @action
    public setIsNavigation(isNavigation: boolean) {
        this.state.isNavigation = isNavigation;
    }

    public get isNavigation() {
        return this.state.isNavigation;
    }

    @action
    public setNavErrorCode(code: number): void {
        this.state.navigationErrorCode = code;
    }

    public get navErrorCode(): NavigationErrorType {
        return this.state.navigationErrorCode;
    }

    @action
    public setNavErrorType(type: NavigationErrorType) {
        this.state.navigationErrorType = type;
    }

    public get navErrorType() {
        return this.state.navigationErrorType;
    }

    @action
    public setErrorInfo(info: NavErrorInfo) {
        this.state.navErrorInfo = info;
    }

    public get errorInfo(): ModalCannotArriveProps{
        return this.state.navErrorInfo;
    }

    @action
    public setAvoidScreenShow(isShow: boolean) {
        this.state.isShowAvoidScreen = isShow;
    }

    public get isAvoidScreenShow() {
        return this.state.isShowAvoidScreen;
    }

    public get isAvoid() {
        return this.mIsAvoid;
    }

    public setIsAvoid(isAvoid: boolean) {
        if (this.mIsAvoid != isAvoid) {
            this.setAvoidTimes(0);
        }
        this.mIsAvoid = isAvoid;
    }

    public get getAvoidTimes(): number {
        return this.mAvoidTimes;
    }

    public setAvoidTimes(avoidTimes: number) {
        this.mAvoidTimes = avoidTimes;
    }

    @action
    public setArrive(isArrive: boolean) {
        this.state.isArrived = isArrive;
    }

    public get isArrived() {
        return this.state.isArrived;
    }

    @action
    public setCannotArrive(isCannotArrived: boolean) {
        this.state.isCannotArrived = isCannotArrived;
    }

    public get isCannotArrived() {
        return this.state.isCannotArrived;
    }

    @action
    public setOverRun(isOver: boolean) {
        this.state.isOverRun = isOver;
    }

    public get isOverRun() {
        return this.state.isOverRun;
    }

    @action
    public setShowBirthdayModal(isShow: boolean) {
        this.state.isShowBirthdayModal = isShow;
    }

    public get isShowBirthdayModal(): boolean {
        return this.state.isShowBirthdayModal;
    }

    //设置当前要前往的地点
    @action
    public setCurrentPoint(point: string) {
        Log.d(TAG, 'setCurrentPoint=' + point);
        this.state.currentPoint = point;
    }

    public get currentPoint() {
        return this.state.currentPoint;
    }

    public get isShowDrawer() {
        return this.state.isShowDrawer;
    }

    @action
    public setShowDrawer(isShow: boolean) {
        this.state.isShowDrawer = isShow;
    }

    @action
    public setTitle(title: string) {
        this.state.title = title;
    }

    public get title() {
        return this.state.title;
    }

    public resetState(): void {
        this.setIsNavigation(false);
        this.setAvoidScreenShow(false);
        this.setCannotArrive(false);
        this.setOverRun(false);
    }
}

export const navigationStore = new NavigationModel();