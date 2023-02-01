import { filemage, geturldata } from "../utils/index.js"
let file = new filemage()
export class Api {
    async getText(name, suc, parms) {
        let textlist = await this.getApiList('text')
        textlist.forEach(async element => {
            if (element.reg == name) {
                await geturldata({ url: element.url, data: element.data, parms: parms }, (res) => {
                    suc(res.data)
                })
            }
        });
    }
    async getImage(name, suc, parms) {
        let textlist = await this.getApiList('image')
        textlist.forEach(async element => {
            if (element.reg == name) {
                if (element.data == 1) {
                    suc({ data: element.url, isurl: true })
                }
                else if (element.data != 1) {
                    await geturldata({ url: element.url, data: element.data, parms: parms }, (res) => {
                        if (typeof res == "string") {
                            res = { data: res.data, isurl: true }
                        }
                        if (element.islist) {
                            res = { data: res.data, islist: true }
                        }
                        suc(res)
                    })
                }
            }
        });
    }
    async getRecord(name, suc, parms) {
        let textlist = await this.getApiList('record')
        textlist.forEach(async element => {
            if (element.name == name) {
                if (element.data == 1) {
                    suc({ res: element.url, isurl: true })
                }
                else if (element.data != 1) {
                    await geturldata(element.url, element.data, (res) => {
                        if (typeof res == "string") {
                            res = { res: res, isurl: true }
                        }
                        if (element.islist) {
                            res = { res: res, islist: true }
                        }
                        suc(res)
                    }, parms)
                }
            }
        });
    }

    async getVideo(name, suc, parms) {
        let textlist = await this.getApiList('video')
        textlist.forEach(async element => {
            if (element.reg == name) {
                if (element.data != 2) {
                    await geturldata({ url: element.url, data: element.data, parms: parms }, (res) => {
                        suc(res.data)
                    })
                } else {
                    suc(element.url)
                }
            }
        });
    }

    async getapi(url, data, suc, parms) {
        await geturldata({ url: url, data: data, parms: parms }, (res) => {
            suc(res.data)
        })
    }

    async getApiList(type) {
        if (type == 'text') {
            let { textapi } = await file.getyamlJson('resources/data/api/text')
            return textapi
        } else if (type == 'image') {
            let { imagelist } = await file.getyamlJson('resources/data/api/image')
            return imagelist
        }
        else if (type == 'record') {
            let { recordapi } = await file.getyamlJson('resources/data/api/record')
            return recordapi
        }
        else if (type == 'video') {
            let { videoapi } = await file.getyamlJson('resources/data/api/video')
            return videoapi
        }
    }
}
