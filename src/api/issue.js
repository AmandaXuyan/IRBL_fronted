import { axios } from '@/utils/request'

const api = {
    issuePre: '/api/issue'
}

export function addIssueAPI(data){
    return axios({
        url:`${api.issuePre}/add`,
        method: 'POST',
        data
    })
}

export function deleteIssueAPI(data) {
    return axios({
        url: `${api.issuePre}/delete`,
        method: 'DELETE',
        params:data
    })
}

export function updateIssueAPI(data){
    return axios({
        url: `${api.issuePre}/update`,
        method: 'POST',
        data
    })
}


export function searchIssueAPI(data) {
    return axios({
        url: `${api.issuePre}/search`,
        method: 'GET',
        params:data,
    })
}

/**
 * 获取所有的在本平台创建的issue，以及手动拉取过的github上的issue
 * @param data projectId
 * @returns {*}
 */
export function getIssueListAPI(data) {
    return axios({
        url: `${api.issuePre}/historyIssues`,
        method: 'GET',
        params :data,
    })
}

export function getIssueAdviceAPI(data) {
    return axios({
        url: `${api.issuePre}/advice`,
        method: 'GET',
        params :data,
    })
}

export function getRepoAllIssuesAPI(data) {
    return axios({
        url: `${api.issuePre}/repoIssue`,
        method: 'GET',
        params :data,
    })
}

export function saveRepoAllIssuesAPI(data) {
    return axios({
        url: `${api.issuePre}/storeRepoIssue`,
        method: 'GET',
        params :data,
    })
}

export function getIssueDetailByIdAPI(data) {
    return axios({
        url: `${api.issuePre}/get`,
        method: 'GET',
        params:data
    })
}
