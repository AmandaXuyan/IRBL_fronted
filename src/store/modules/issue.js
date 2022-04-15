// import router from '@/router'
// import {  setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import {message} from 'ant-design-vue'
import {
    addIssueAPI,
    deleteIssueAPI,
    updateIssueAPI,
    searchIssueAPI,
    getIssueListAPI,
    getIssueAdviceAPI,
    getRepoAllIssuesAPI,
    saveRepoAllIssuesAPI,
    getIssueDetailByIdAPI,
    writeBackSingleAPI,
    getBugLocationAPI,
    getAllIssueRelationAPI,
    writeBackAPI
} from '@/api/issue'


const issue = {
    state: {
        currentIssueId: 0,
        issueList: [],
        gitIssueList: [],
        currentIssueDetail: {},
        issueListLoading: false,
        searchResult: {},
        issueAdviceList: [],
        issueDetailVisible: false,
        issueEditVisible: false,
        currentGraph: '',
        pageName: 1,
        bugLocationList: null,
        issueRelations:null,

    },
    mutations: {
        set_issueList: function (state, data) {
            state.issueList = data
        },
        set_issueListLoading: function (state, data) {
            state.issueListLoading = data
        },
        set_currentIssueId: function (state, data) {
            state.currentIssueId = data
        },
        set_currentIssueDetail: function (state, data) {
            state.currentIssueDetail = {
                ...state.currentIssueDetail,
                ...data,
            }
        },
        set_issueDetailVisible: function (state, data) {
            state.issueDetailVisible = data
        },
        set_gitIssueList: function (state, data) {
            state.gitIssueList = data
        },
        set_searchResult: function (state, data) {
            state.searchResult = data
        },
        set_issueAdviceList: function (state, data) {
            state.issueAdviceList = data
        },
        set_issueEditVisible: function (state, data) {
            state.issueEditVisible = data
        },
        set_currentGraph: function (state, data) {
            state.currentGraph = data
        },
        set_pageName: function (state, data) {
            state.pageName = data
        },
        set_bugLocationList: function (state, data) {
            state.bugLocationList = data
        },
        set_issueRelations: function (state, data) {
            state.issueRelations = data
        },

    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        addIssue: async ({state, diapatch, commit}, data) => {
            const res = await addIssueAPI(data);
            console.log("addIssue-----" + res);
            if (res) {
                message.success('创建成功');
                await commit('set_currentIssueDetail', res);
                await commit('set_currentIssueId', res.id);
                await diapatch('getIssueList', res.id);

            }
        },
        // eslint-disable-next-line no-unused-vars
        getIssueList: async ({commit, state}, id) => {
            const data = {id: id};
            console.log(data);
            const res = await getIssueListAPI(data);
            console.log(res);
            if (res) {
                commit('set_issueList', res);
                commit('set_issueListLoading', false)
            }
        },
        // eslint-disable-next-line no-unused-vars
        getRepoAllIssues: async ({commit, state}, id) => {
            const data = {id: id};
            console.log(data);
            const res = await getRepoAllIssuesAPI(data);
            // console.log(res);
            if (res) {
                commit('set_gitIssueList', res);
                console.log(state.gitIssueList)

            }
        },
        // eslint-disable-next-line no-unused-vars
        deleteIssue: async ({state, dispatch, commit}) => {
            const data = {id: state.currentIssueId};
            const res = await deleteIssueAPI(data);
            if (res) {
                dispatch('getIssueList', state.currentIssueDetail.projectId);
                message.success('删除成功')
            } else {
                message.error('删除失败')
            }
        },
        // eslint-disable-next-line no-unused-vars
        updateIssue: async ({state, commit, dispatch}, data) => {
            console.log(data);
            const res = await updateIssueAPI(data);
            console.log(res);
            if (res) {
                message.success('保存成功');
                dispatch('getIssueList', res.projectId);
                commit('set_currentIssueDetail', res);
                commit('set_currentProjectId', res.projectId)
            }
        },
        getIssueDetailById: async ({commit, state}) => {
            const data = {id: state.currentIssueId};
            const res = await getIssueDetailByIdAPI(data)
            if (res) {
                commit('set_currentIssueDetail', res);
            }
        },


        // eslint-disable-next-line no-unused-vars
        searchIssue: async ({state, commit}, data) => {
            console.log(data)
            const res = await searchIssueAPI(data)
            console.log(res)
            if (res) {
                message.success('搜索成功');
                commit('set_searchResult', res)
            }
        },

        // eslint-disable-next-line no-unused-vars
        getIssueAdvice: async ({commit, state}, id) => {
            const data = {id: id};
            const res = await getIssueAdviceAPI(data)
            if (res) {
                console.log('advice!');
                console.log(res);
                commit('set_issueAdviceList', res)
            }
        },

        // eslint-disable-next-line no-unused-vars
        writeBackSingle: async ({commit, state}, id) => {
            const data = {id: id};
            const res = await writeBackSingleAPI(data)
            if (res) {
                message.success('写回成功');

            }
        },

        // eslint-disable-next-line no-unused-vars
        writeBack:async ({commit, state}, id) => {
            const data = {id: id};
            const res = await writeBackAPI(data);
            if (res) {
                message.success('写回成功');
            }
        },

        // eslint-disable-next-line no-unused-vars
        saveRepoAllIssues: async ({commit}, id) => {
            const data = {id: id};
            console.log(data)
            const res = await saveRepoAllIssuesAPI(data)
            if (res) {
                message.success('保存成功')
            }
        },
        getBugLocation: async ({commit}, id) => {
            const data = {id: id, page: 1};
            console.log(data);
            const res = await getBugLocationAPI(data);
            if (res) {
                commit('set_bugLocationList', res);
                console.log(res);
                message.success('Bug Location Success')
            }
        },
        getAllIssueRelation:async ({commit}, id) => {
            const data = {projectId: id, page: 1};
            console.log(data);
            const res = await getAllIssueRelationAPI(data);
            if (res) {
                commit('set_issueRelations', res);
                console.log(res);
                // message.success('Issue Relation Success')
            }
        },


    }
}

export default issue
