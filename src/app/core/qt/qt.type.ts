
export class QtResponseModel {
    public requstId: string;
    constructor(
        public callFuncName: string,
        public signName: string,
        public callParams?: any,
        public data?: any
    ) {
        // this.requstId = '' + Date.now();
        this.requstId = signName;
    }
}