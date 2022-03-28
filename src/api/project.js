import { axios } from '@/utils/request'

const api = {
    projectPre: '/api/project'
}

/**
 * 通过url增加project文件
 * @param data
 * @returns commit记录，projectVO
 */
export function addProjectUrlAPI(data){
    return axios({
        url:`${api.projectPre}/addProjectUrl`,
        method: 'POST',
        data
    })
}

/**
 * 通过上传文件增加project文件
 * @param data
 * @returns {AxiosPromise}
 */
export function addByFileAPI(data){
    return axios({
        url:`${api.projectPre}/addProjectFile`,
        method: 'POST',
        data
    })
}

/**
 * todo: 选择某个commit版本
 * @param data {userId,projectId,commitId}
 * @returns
 */
export function getCommitProjectAPI(data) {
    return axios({
        url: `${api.projectPre}/getCommitProject`,
        method: 'GET',
        params:data
    })
}

/**
 * todo:currentProjectDetail 获得某个项目详细信息
 * @param param{projectId}
 * @returns {AxiosPromise}
 */
export function getProjectDetailByIdAPI(data) {
    return axios({
        url: `${api.projectPre}/get`,
        method: 'GET',
        params:data
    })
}

export function deleteProjectAPI(data) {
    return axios({
        url: `${api.projectPre}/delete`,
        method: 'DELETE',
        params:data
    })
}

//todo: 返回值从true换成update后的信息
export function updateProjectAPI(data){
    return axios({
        url: `${api.projectPre}/update`,
        method: 'POST',
        data
    })
}

export function getAllProjectAPI(data) {
    return axios({
        url: `${api.projectPre}/allProjects`,
        method: 'GET',
        params:data
    })
}

export function addProjectAPI(data){
    return axios({
        url:`${api.projectPre}/add`,
        method: 'POST',
        data
    })
}

export function getFileTreeAPI(data) {
    return axios({
        url: `${api.projectPre}/getFileTree`,
        method: 'GET',
        params:data
    })
}



