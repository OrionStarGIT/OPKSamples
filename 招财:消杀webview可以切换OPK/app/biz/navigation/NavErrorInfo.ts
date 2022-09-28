import { ModalCannotArriveProps } from "./modal/ModalCannotArrivePoint";

export class NavErrorInfo implements ModalCannotArriveProps{
    public visible: boolean = true;
    public title: string;
    public subTitle: string;
    public errorCode: string;
    public hintText: string;
    public confirmText: string
    public cancelText: string;


    public constructor(title: string, subTitle: string, errorCode: string, hintText: string, confirmText: string, cancelText: string) {
        this.title = title;
        this.subTitle = subTitle;
        this.errorCode = errorCode;
        this.hintText = hintText;
        this.confirmText = confirmText;
        this.cancelText = cancelText;
    }

    public static make() {
        return new NavErrorInfo('', '', '', '', '', '');
    }
}