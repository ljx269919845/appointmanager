export class Image {

    constructor(
        public imageId?: string,
        public imageUrl?: string,
        public thumbnailUrl?: string,
        public hrefUrl?: string,
        public sort?: number
    ) {

    }

}

export class ImageOpt {

    constructor(
        public index: number,
        public base: number
    ) {

    }

}

export class ImageExtendInfo {
    constructor(
        public imageId: string,
        public hrefUrl: string,
        public resourceUID: string,
        public imageDesc: string
    ) {

    }
}

export class ImageResortInfo {
    constructor(
        public owner: string,
        public targetId: string,
        public imagesInfos: ImageExtendInfo[]
    ) {
    }
}
