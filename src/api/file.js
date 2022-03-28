import {axios} from "@/utils/request";
const api = {
    filePre: '/api/file'
}

/**
 * todo: 通过树形控件点击从后端获取文件内容
 * @param data{userId,projectId,flieId,fileName}
 * @returns {AxiosPromise}
 */
export function getFileByTreeAPI(data) {
    return axios({
        url: `${api.filePre}/downloadFile`,
        method: 'GET',
        params:data
    })
}
