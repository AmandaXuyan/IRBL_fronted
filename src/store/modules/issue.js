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
    getIssueListAPI
} from '@/api/issue'


const issue =  {
    state: {
        currentIssueId:'',
        issueList: [],
        historyIssueList:[],
        currentIssueDetail:{},
        issueListLoading:false,
        issueModalVisible:false,
        searchResult:{},

    },
    mutations:{
        set_issueList:function(state, data) {
            state.issueList = data
        },
        set_issueListLoading: function(state, data) {
            state.issueListLoading = data
        },
        set_currentIssueId: function(state, data) {
            state.currentProjectId = data
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
        getIssueList: async({commit, state},userId) => {
            const res = await getIssueListAPI(userId)
            if(res){
                commit('set_issueList', res)
                commit('set_issueListLoading', false)
            }
        },
        // eslint-disable-next-line no-unused-vars
        deleteIssue: async({ state, dispatch }, issueId) => {
            const res = await deleteIssueAPI(issueId)
            if(res) {
                dispatch('getIssueList')
                message.success('删除成功')
            }else{
                message.error('删除失败')
            }
        },
        // eslint-disable-next-line no-unused-vars
        updateIssue: async({ state, commit }, data) => {
            const res = await updateIssueAPI(data)
            console.log(res)
            if(res){
                message.success('保存成功')
                commit('set_currentIssueDetail',res)
                commit('set_currentProjectId',res.id)
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
            const res = await searchIssueAPI(data)
            console.log(res)
            if(res){
                message.success('搜索成功')
                commit('set_searchResult',res)
            }
        },


    }
}

export default issue
