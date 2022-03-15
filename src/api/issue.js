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

export function deleteIssueAPI(issueId) {
    return axios({
        url: `${api.issuePre}/${issueId}/delete`,
        method: 'GET',
    })
}

//更新某个issue?
export function updateIssueAPI(data){
    return axios({
        url: `${api.issuePre}/${data.id}/update`,
        method: 'POST',
        data
    })
}

export function getHistoryIssuesAPI(userId) {
    return axios({
        url: `${api.issuePre}/${userId}/historyIssues`,
        method: 'get',
    })
}

export function searchIssueAPI(content) {
    return axios({
        url: `${api.issuePre}/${content}/search`,
        method: 'GET',
    })
}


export function getIssueListAPI(userId) {
    return axios({
        url: `${api.issuePre}/${userId}/issueList`,
        method: 'get',
    })
}
