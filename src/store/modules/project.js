// import router from '@/router'
// import {  setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import {
    addProjectAPI,
    addByFileAPI,
    deleteProjectAPI,
    updateProjectAPI,
    getAllProjectAPI,
    getProjectDetailByIdAPI,
    addProjectUrlAPI,
    getFileTreeAPI,
    getTagsAPI,
    addProjectUrlWithTagAPI,
} from '@/api/project'


const project =  {
    state: {
        projectList: [],
        projectListLoading: true,
        currentProjectId: 0,
        currentProjectDetail:{},
        addProjectVisible:false,
        uploadVisible:false,
        panelLeftFirst:false,
        //todo:记得改成false
        connectResVisible:true,
        tabList:[],
        minSize:100,
        size:284,
        activePage:'',
        treeData:[],
        issueShowVisible:false,
        updateProjectPopV:true,
        tagList:[],
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
        set_addProjectVisible: function(state, data) {
            state.projectModalVisible = data
        },
        set_uploadVisible:function(state, data) {
            state.uploadVisible = data
        },
        set_panelLeftFirst:function(state, data) {
            state.panelLeftFirst = data
        },
        set_connectResVisible:function(state, data) {
            state.connectResVisible = data
        },
        set_tabList:function(state, data) {
            state.tabList = data
        },
        set_activePage:function(state, data) {
            state.activePage = data
        },
        set_treeData:function(state, data) {
            state.treeData = data
        },
        set_issueShowVisible:function(state, data) {
            state.issueShowVisible = data
        },
        set_updateProjectPopV:function(state, data) {
            state.updateProjectPopV = data
        },
        set_tagList:function(state, data) {
            state.tagList = data
        },

    },
    actions:{
        // eslint-disable-next-line no-unused-vars
        getProjectList: async({commit, state},userId) => {
            const data={id:userId};
            const res = await getAllProjectAPI(data)
            console.log(res);
            if(res){
                commit('set_projectList', res);
                commit('set_projectListLoading', false)
            }
        },
        getProjectDetailById: async({commit, state}) => {
            const data={id:state.currentProjectId};
            const res = await getProjectDetailByIdAPI(data);
            if(res){
                console.log('getProjectDetailById');
                console.log(res);
                commit('set_currentProjectDetail', res);
                commit('set_issueShowVisible',true)
            }
        },

        // eslint-disable-next-line no-unused-vars
        addProject: async({ state, commit }, data) => {
            const res = await addProjectAPI(data);
            if(res){
                console.log(res);
                message.success('创建成功');
                commit('set_addProjectVisible', false);
                commit('set_currentProjectDetail',res);
                commit('set_currentProjectId',res.id)
            }
        },
        // eslint-disable-next-line no-unused-vars
        addProjectUrl: async({ state, dispatch,commit }, data) => {
            console.log(data);
            const res = await addProjectUrlAPI(data);
            console.log(res);
            if(res){
                message.success('创建成功');
                commit('set_addProjectVisible', false);
                commit('set_currentProjectDetail',res);
                commit('set_connectResVisible',true);
                dispatch('getFileTree',state.currentProjectId)
                // commit('set_currentProjectId',res.id)
            }
        },

        addProjectUrlWithTag: async({ state, dispatch,commit }, data) => {
            console.log(data);
            const res = await addProjectUrlWithTagAPI(data);
            console.log(res);
            if(res){
                message.success('创建成功');
                commit('set_addProjectVisible', false);
                commit('set_currentProjectDetail',res);
                commit('set_connectResVisible',true);
                commit('set_tagList',[]);
                dispatch('getFileTree',state.currentProjectId)
                // commit('set_currentProjectId',res.id)
            }
        },

        // eslint-disable-next-line no-unused-vars
        addByFile: async({ state, commit }, data) => {
            console.log('addByFile');
            console.log(data);
            const res = await addByFileAPI(data)
            console.log(res);
            if(res){
                message.success('导入成功');
                commit('set_uploadVisible', false);
                commit('set_currentProjectDetail',res)
                // commit('set_currentProjectId',res.id)
            }
        },
        // eslint-disable-next-line no-unused-vars
        updateProject: async({ state, commit }, data) => {
            const res = await updateProjectAPI(data);
            if(res){
                message.success('保存成功')
            }
        },

        // eslint-disable-next-line no-unused-vars
        deleteProject: async({ state, dispatch },) => {
            const data={id:state.currentProjectId};
            console.log(data)
            const res = await deleteProjectAPI(data)
            if(res) {
                dispatch('getProjectList')
                message.success('删除成功')
            }else{
                message.error('删除失败')
            }
        },

        // eslint-disable-next-line no-unused-vars
        getFileTree: async({commit, state},projectId) => {
            const data={id:projectId};
            console.log('filetree');
            console.log(data);
            const res = await getFileTreeAPI(data);
            console.log(res);
            if(res){
                commit('set_treeData', res.children)
            }
        },

        getTags: async({commit },data) => {
            const res = await getTagsAPI(data);
            if(res) {
                console.log('getTags');
                console.log(res);
                commit('set_tagList',res);
            }
        },




    }
}

export default project
