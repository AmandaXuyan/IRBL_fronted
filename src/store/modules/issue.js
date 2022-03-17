// import router from '@/router'
// import {  setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import{
    addIssueAPI,
    deleteIssueAPI,
    updateIssueAPI,
    getHistoryIssuesAPI,
    searchIssueAPI,
    getIssueListAPI,
    getIssueAdviceAPI,
    getRepoAllIssuesAPI,
    saveRepoAllIssuesAPI
} from '@/api/issue'


const issue =  {
    state: {
        currentIssueId:0,
        issueList: [],
        historyIssueList:[],
        currentIssueDetail:{},
        issueListLoading:false,
        issueModalVisible:false,
        searchResult:{},
        issueAdviceList:[]

    },
    mutations:{
        set_issueList:function(state, data) {
            state.issueList = data
        },
        set_issueListLoading: function(state, data) {
            state.issueListLoading = data
        },
        set_currentIssueId: function(state, data) {
            state.currentIssueId = data
        },
        set_currentIssueDetail: function(state, data) {
            state.currentIssueDetail = {
                ...state.currentIssueDetail,
                ...data,
            }
        },
        set_issueModalVisible: function(state, data) {
            state.issueModalVisible = data
        },
        set_historyIssueList:function(state, data) {
            state.historyIssueList = data
        },
        set_searchResult:function(state, data) {
            state.searchResult = data
        },
        set_issueAdviceList:function(state, data) {
            state.set_issueAdviceList = data
        },

    },
    actions:{
        // eslint-disable-next-line no-unused-vars
        addIssue: async({ state, commit }, data) => {
            const res = await addIssueAPI(data)
            console.log(res)
            if(res){
                message.success('创建成功')
                commit('set_issueModalVisible', false)
                commit('set_currentIssueDetail',res)
                commit('set_currentIssueId',res.id)
            }
        },
        // eslint-disable-next-line no-unused-vars
        getIssueList: async({commit, state},id) => {
            const data={id:id};
            console.log(data)
            const res = await getIssueListAPI(data)
            if(res){
                commit('set_issueList', res)
                commit('set_issueListLoading', false)
            }
        },
        // eslint-disable-next-line no-unused-vars
        getRepoAllIssues:async({commit, state},id) => {
            const data={id:id};
            console.log(data)
            const res = await getRepoAllIssuesAPI(data)
            if(res){
                commit('set_issueList', res)

            }
        },
        // eslint-disable-next-line no-unused-vars
        deleteIssue: async({ state, dispatch }, data) => {
            const res = await deleteIssueAPI(data)
            if(res) {
                dispatch('getIssueList')
                message.success('删除成功')
            }else{
                message.error('删除失败')
            }
        },
        // eslint-disable-next-line no-unused-vars
        updateIssue: async({ state, commit }, data) => {
            console.log(data)
            const res = await updateIssueAPI(data)
            console.log(res)
            if(res){
                message.success('保存成功')
                commit('set_currentIssueDetail',res)
                commit('set_currentProjectId',res.projectId)
            }
        },

        // eslint-disable-next-line no-unused-vars
        getHistoryIssues: async({commit, state},userId) => {
            const res = await getHistoryIssuesAPI(userId)
            if(res){
                commit('set_historyIssueList', res)
            }
        },

        // eslint-disable-next-line no-unused-vars
        searchIssue: async({ state, commit }, data) => {
            console.log(data)
            const res = await searchIssueAPI(data)
            console.log(res)
            if(res){
                message.success('搜索成功')
                commit('set_searchResult',res)
            }
        },

        // eslint-disable-next-line no-unused-vars
        getIssueAdvice: async({commit, state},id) => {
            const data={id:id};
            console.log(data)
            const res = await getIssueAdviceAPI(data)
            if(res){
                commit('set_issueAdviceList', res)
            }
        },

        // eslint-disable-next-line no-unused-vars
        saveRepoAllIssues:async({commit},id) => {
            const data={id:id};
            console.log(data)
            const res = await saveRepoAllIssuesAPI(data)
            if(res){
                message.success('保存成功')
            }
        },





    }
}

export default issue
