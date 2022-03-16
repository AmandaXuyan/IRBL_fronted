// import router from '@/router'
// import {  setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import {
    addByConfigAPI,
    addByFileAPI,
    deleteProjectAPI,
    updateProjectAPI,
    getAllProjectAPI,
    getProjectDetailByIdAPI
} from '@/api/project'


const project =  {
    state: {
        projectList: [],
        projectListLoading: true,
        currentProjectId:'',
        currentProjectDetail:{},
        projectModalVisible:false,
        uploadVisible:false,
    },
    mutations:{
        set_projectList:function(state, data) {
            state.projectList = data
        },
        set_projectListLoading: function(state, data) {
            state.projectListLoading = data
        },
        set_currentProjectId: function(state, data) {
            state.currentProjectId = data
        },
        set_currentProjectDetail: function(state, data) {
            state.currentProjectDetail = {
                ...state.currentProjectDetail,
                ...data,
            }
        },
        set_projectModalVisible: function(state, data) {
            state.projectModalVisible = data
        },
        set_uploadVisible:function(state, data) {
            state.uploadVisible = data
        },
    },
    actions:{
        // eslint-disable-next-line no-unused-vars
        getProjectList: async({commit, state},userId) => {
            console.log("getProject/userId:----"+userId)
            const data={'id':userId};
            const res = await getAllProjectAPI(data)
            console.log(res)
            if(res){
                commit('set_projectList', res)
                commit('set_projectListLoading', false)
            }
        },
        getProjectDetailById: async({commit, state}) => {
            console.log("getProjectDetailById:----"+state.currentProjectId)
            const res = await getProjectDetailByIdAPI({
                projectId: state.currentProjectId
            })
            if(res){
                commit('set_currentProjectDetail', res)
            }
        },
        // eslint-disable-next-line no-unused-vars
        addByConfig: async({ state, commit }, data) => {
            console.log("addByConfig:----"+data)
            const res = await addByConfigAPI(data)
            console.log(res)
            if(res){
                message.success('创建成功')
                commit('set_projectModalVisible', false)
                commit('set_currentProjectDetail',res)
                commit('set_currentProjectId',res.id)
            }
        },
        // eslint-disable-next-line no-unused-vars
        addByFile: async({ state, commit }, data) => {
            const res = await addByFileAPI(data)
            console.log(res)
            if(res){
                message.success('创建成功')
                commit('set_uploadVisible', false)
                commit('set_currentProjectDetail',res)
                commit('set_currentProjectId',res.id)
            }
        },
        // eslint-disable-next-line no-unused-vars
        updateProject: async({ state, commit }, data) => {
            const res = await updateProjectAPI(data)
            console.log(res)
            if(res){
                message.success('保存成功')
                commit('set_currentProjectDetail',res)
            }
        },

        // eslint-disable-next-line no-unused-vars
        deleteProject: async({ state, dispatch }, projectId) => {
            console.log("deleteProject:----"+projectId)
            const res = await deleteProjectAPI(projectId)
            if(res) {
                dispatch('getProjectList')
                message.success('删除成功')
            }else{
                message.error('删除失败')
            }
        },


    }
}

export default project
