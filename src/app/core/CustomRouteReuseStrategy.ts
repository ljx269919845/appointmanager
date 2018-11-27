import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { ComponentRef } from "@angular/core"

export class CustomRouteReuseStrategy implements RouteReuseStrategy {

    private handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // console.log("shouldDetach", route);
        return route.data.reload === false;
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.handlers[this.getFullPath(route)] = handle;
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // console.warn("shouldAttach",this.getFullPath(route));
        return !!route.routeConfig && !!this.handlers[this.getFullPath(route)];
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return this.handlers[this.getFullPath(route)];
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // console.warn("retrieve", this.getFullPath(future));
        this.clearWhenJumpOut(future, curr);
        // console.warn("after clearHanlers",this.handlers);
        return future.routeConfig === curr.routeConfig;
    }

    private clearWhenJumpOut(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
        let futurePath = this.getFullPath(future);
        let currPath = this.getFullPath(curr);
        if (futurePath.indexOf(currPath) < 0) {
            let handle: DetachedRouteHandle = this.handlers[currPath];
            if (handle) {
                let componentRef: ComponentRef<any> = handle["componentRef"] as ComponentRef<any>;
                if (componentRef) {
                    componentRef.destroy();
                    delete this.handlers[currPath];
                }
            }
        }
    }

    /**
     * 清除掉多余的 路由回调，当跳出当前路由的时候
     * @param route 
     */
    // private clearHanlers(route: ActivatedRouteSnapshot) {
    //     let path: string = this.getFullPath(route);
    //     if (!path) {
    //         return;
    //     }
    //     for (let indexName in this.handlers) {
    //         // 路径匹配不在当前路由
    //         if (path.indexOf(indexName) < 0) {
    //             let handle: DetachedRouteHandle = this.handlers[indexName];
    //             if (handle) {
    //                 let componentRef:ComponentRef<any> = handle["componentRef"] as ComponentRef<any>;
    //                 if(componentRef){
    //                     componentRef.destroy();
    //                     delete this.handlers[indexName];
    //                 }
    //             }
    //         }
    //     }
    // }


    private getFullPath(route: ActivatedRouteSnapshot): string {
        // let fullPath = "";
        // if(route.pathFromRoot && route.pathFromRoot.length > 0){
        //     for(let i = 0;i < route.pathFromRoot.length; i ++){
        //         if(route.pathFromRoot[i].routeConfig){
        //             fullPath += ("/" + route.pathFromRoot[i].routeConfig.path);
        //         }
        //     }
        // }
        // return fullPath;
        return route["_routerState"].url;
    }
}