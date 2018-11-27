import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingBoxObj } from '../loading-box/loading-box.component';
import { PromptBoxObj } from '../prompt-box/prompt-box.component';
import { ConfirmCancelBoxObj } from '../confirm-cancel-box/confirm-cancel-box.component';
import { ImageMagnifyBoxObj } from '../image-magnify-box/image-magnify-box.component';
import { SubjectService, SUBJECT } from '../../../core/subject';

export class ConfirmCancelBoxCallBackObj {
    constructor(
        public name: string,
        public btnYes?: string,
        public btnNo?: string,
        public yesFn?: () => {},
        public noFn?: () => {}) {
    }
}

/*
----------- 弹框使用方法 -----------
this.pss.pubscript(SUBJECT.GLOBAL_LOADING, true);
this.pss.pubscript(SUBJECT.GLOBAL_LOADING, false);
this.pss.pubscript(SUBJECT.GLOBAL_PROMPT, '操作成功');
this.pss.pubscript(SUBJECT.GLOBAL_PROMPT_ERROR, '操作失败');
this.pss.pubscript(SUBJECT.GLOBAL_CONFIRM_CANCEL, {name:'',yesFn:this.clickYes.bind(this)});
this.pss.pubscript(SUBJECT.GLOBAL_HANDDLE_ERROR, error);
this.pss.pubscript(SUBJECT.GLOBAL_HANDDLE_ERROR, '操作失败');
this.pss.pubscript(SUBJECT.GLOBAL_IMAGE, imgUrl);
*/

@Component({
    selector: 'tl-pop-up-box',
    templateUrl: './pop-up-box.component.html',
    styleUrls: ['./pop-up-box.component.css']
})
export class PopUpBoxComponent implements OnInit, OnDestroy {

    public loadingBoxObj: LoadingBoxObj;
    public promptBoxObj: PromptBoxObj;
    public confirmCancelBoxObj: ConfirmCancelBoxObj;
    public imageMagnifyBoxObj: ImageMagnifyBoxObj;

    private callBackYesFn: () => {};
    private callBackNoFn: () => {};

    private loadingSub;
    private promptSub;
    private promptErrorSub;
    private cancelSub;
    private handleSub;
    private imageSub;

    constructor(
        private pss: SubjectService
    ) {
        this.loadingBoxInit();
        this.promptsBoxInit();
        this.confirmCancelBoxInit();
        this.imageMagnifyBoxInit();
    }

    ngOnInit() {
        this.loadingSub = this.pss.subscript(SUBJECT.GLOBAL_LOADING).subscribe((bool: boolean) => {
            this.showLoadingBox(bool);
        });
        this.promptSub = this.pss.subscript(SUBJECT.GLOBAL_PROMPT).subscribe((name: string) => {
            this.showPromptBox(name);
        });
        this.promptErrorSub = this.pss.subscript(SUBJECT.GLOBAL_PROMPT_ERROR).subscribe((name: string) => {
            this.showPromptBox(name, true);
        });
        this.cancelSub = this.pss.subscript(SUBJECT.GLOBAL_CONFIRM_CANCEL).subscribe((confirmCancelBoxCallBackObj: ConfirmCancelBoxCallBackObj) => {
            this.callBackYesFn = confirmCancelBoxCallBackObj.yesFn;
            this.callBackNoFn = confirmCancelBoxCallBackObj.noFn;
            this.showConfirmCancelBox(confirmCancelBoxCallBackObj);
        });
        this.handleSub = this.pss.subscript(SUBJECT.GLOBAL_HANDDLE_ERROR).subscribe((error: any) => {
            this.handleError(error);
        });
        // this.pss.subscript('handle-failed', (failed:any)=> {
        //    this.confirmCancelBoxCallBackObj = undefined;
        //    this.handleFailed(failed);
        // });
        this.imageSub = this.pss.subscript(SUBJECT.GLOBAL_IMAGE).subscribe((imgUrl: string) => {
            this.showImageMagnifyBox(imgUrl);
        });
    }

    ngOnDestroy() {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        this.loadingSub.unsubscribe();
        this.promptSub.unsubscribe();
        this.promptErrorSub.unsubscribe();
        this.cancelSub.unsubscribe();
        this.handleSub.unsubscribe();
        this.imageSub.unsubscribe();
    }

    // 确认 confirm-cancel-box确认取消弹出框
    clickYes(event) {
        if (typeof this.callBackYesFn === 'function') {
            this.callBackYesFn();
        }
        this.callBackYesFn = undefined;
    }

    // 取消 confirm-cancel-box确认取消弹出框
    clickNo(event) {
        if (typeof this.callBackNoFn === 'function') {
            this.callBackNoFn();
        }
        this.callBackNoFn = undefined;
    }

    // handleFailed(failedObj) {
    //    console.log(failedObj);
    //    let name = '失败 : ' + failedObj.code + ' ' + failedObj.msg;
    //    this.showConfirmCancelBox(name, true);
    // }

    handleError(error) {
        let name;
        if (typeof error === 'string') {
            name = error;
            this.showConfirmCancelBox({ name: name }, true);
            return;
        } else if (error.code === '99999999') {
            name = '网络异常';
        } else if (error.code === '11111111') {
            name = '系统异常';
        } else {
            name = '提示 : 操作失败';
        }
        this.showPromptBox(name, true);
    }

    // 显示加载菊花
    showLoadingBox(bool: boolean) {
        this.loadingBoxObj.visible = bool;
        if (bool === true) {
            setTimeout(() => {
                this.loadingBoxObj && (this.loadingBoxObj.visible = false);
            }, 3000);
        }
    }

    // 显示提示框
    showPromptBox(name?: string, error?: boolean) {
        if (name) {
            this.promptBoxObj.name = name;
        }
        if (error) {
            this.promptBoxObj.error = error;
        }
        this.promptBoxObj.visible = true;
    }

    // 显示确认取消弹出框
    showConfirmCancelBox(obj?: any, error?: boolean) {
        console.log(obj);
        if (obj.name) {
            this.confirmCancelBoxObj.header = obj.name;
        }
        let btnYes = '确认';
        let btnNo = '取消';
        if (obj.btnYes) {
            btnYes = obj.btnYes;
        }
        if (obj.btnNo) {
            btnNo = obj.btnNo;
        }
        this.confirmCancelBoxObj.btnYes = error ? undefined : btnYes;
        this.confirmCancelBoxObj.btnNo = error ? '关闭' : btnNo;
        this.confirmCancelBoxObj.visible = true;
    }

    // 显示 放大图片
    showImageMagnifyBox(imgUrl: string) {
        this.imageMagnifyBoxObj.imgUrl = imgUrl;
        this.imageMagnifyBoxObj.visible = true;
    }

    // 加载菊花初始化
    loadingBoxInit() {
        this.loadingBoxObj = new LoadingBoxObj();
    }

    // 提示框初始化
    promptsBoxInit() {
        this.promptBoxObj = new PromptBoxObj('操作失败');
    }

    // 确认取消弹出框初始化
    confirmCancelBoxInit() {
        this.confirmCancelBoxObj = new ConfirmCancelBoxObj('提示', '确认', '取消');
    }

    // 确认取消弹出框初始化
    imageMagnifyBoxInit() {
        this.imageMagnifyBoxObj = new ImageMagnifyBoxObj(400, 400);
    }
}
