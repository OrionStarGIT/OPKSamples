export class WeakBlackListStrategy{

    private name: string;
    public constructor(name: string) {
        this.name = name;
    }

    public filter(msg: string): boolean {
        return false;
    }

}