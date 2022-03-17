import { axios } from '@/utils/request'

const api = {
    projectPre: '/api/project'
}

export function addProjectAPI(data){
    return axios({
        url:`${api.projectPre}/add`,
        method: 'POST',
        data
    })
}

export function addProjectUrlAPI(data){
    return axios({
        url:`${api.projectPre}/addProjectUrl`,
        method: 'POST',
        data
    })
}

export function addByFileAPI(data){
    return axios({
        url:`${api.projectPre}/addProjectFile`,
        method: 'POST',
        data
    })
}

export function deleteProjectAPI(data) {
    return axios({
        url: `${api.projectPre}/delete`,
        method: 'DELETE',
        params:data
    })
}

//更新某个项目
export function updateProjectAPI(data){
    return axios({
        url: `${api.projectPre}/${data.id}/update`,
        method: 'POST',
        data
    })
}

export function getAllProjectAPI(data) {
    return axios({
        url: `${api.projectPre}/allProjects`,
        method: 'get',
        params:data
    })
}

//todo:currentProjectDetail 获得某个项目详细信息
export function getProjectDetailByIdAPI(param) {
    return axios({
        url: `${api.projectPre}/${param.id}/detail`,
        method: 'GET',
    })
}



