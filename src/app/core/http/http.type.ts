export class HttpRequestConfig {
    constructor(public json) {}
}

export interface ParamType {
    [key: string]: any;
}

export class RequestModel {
    constructor(
        public url,
        public method: string,
        public urlParams?: ParamType | null | undefined,
        public queryParams?: ParamType | null | undefined,
        public body?: ParamType | null | undefined,
        public beginTime?: number
    ) {}
}

export class ResponseModel {
    constructor(
        public code?: string,
        public msg?: string,
        public data?: any,
        public response?: any,
        public endTime?: number,
        public castTime?: number,
        public success = false,
        public isCached = false
    ) {}
}

// http hook types
export enum HTTP_HOOKS {
    ADD_HEADER,
    HTTP_BEGIN,
    HTTP_SUCCESS,
    HTTP_FALIES,
    HTTP_ERROR,
    HTTP_END
}

export interface HttpHookFunc {
    (RequestModel, ResponseModel): void;
}

export interface HttpHooks {
    [key: string]: Array<HttpHookFunc>;
}
