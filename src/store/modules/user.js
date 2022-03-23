import router from '@/router'
import {  setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import {
    loginAPI,
    registerAPI,
    getUserInfoAPI,
    updateUserInfoAPI,
} from '@/api/user'

const getDefaultState = () => {
    return {
        userId: 0,
        userInfo: {
            id:0,
            userName:'Tourist',
            email:''
        },
        visibleLogin:true,
        visiblePop:false,


    }
}
const user = {
    state : getDefaultState(),

    mutations: {
        reset_state: function(state) {
            state.token = '',
                state.userId = 0,
                state.visibleLogin=true ,
                state.userInfo = {
                    id:0,
                    userName:'Tourist',
                    email:'',
                }
        },
        set_token: function(state, token){
            state.token = token
        },
        set_email: (state, data) => {
            state.email = data
        },
        set_userId: (state, data) => {
            state.userId = data
        },
        set_userInfo: (state, data) => {
            state.userInfo = {
                ...state.userInfo,
                ...data
            }
        },
        set_visibleLogin: (state, data) => {
            state.visibleLogin = data
        },
        set_visiblePop:(state, data) => {
            state.visiblePop = data
        },
    },

    actions: {
        // eslint-disable-next-line no-unused-vars
        login: async ({ dispatch, commit }, userData) => {
            const res = await loginAPI(userData)
            if(res){
                setToken(res.id)
                commit('set_userId', res.id)
                commit('set_visibleLogin',false)
                commit('set_userInfo',res)
                commit('set_token',res.id)
                // dispatch('getUserInfo')
                router.push({ name: 'projectList'})
            }
        },
        // eslint-disable-next-line no-unused-vars
        register: async({ commit }, data) => {
            const res = await registerAPI(data)
            if(res){
                message.success('注册成功')
            }
        },
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
                getUserInfoAPI(state.userId).then(response => {
                    const data = response
                    if (!data) {
                        reject('登录已过期，请重新登录')
                    }
                    commit('set_userInfo', data)
                    commit('set_userId', data.id)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        updateUserInfo: async({ state, dispatch }, data) => {
            const params = {
                id: state.userId,
                ...data,
            }
            const res = await updateUserInfoAPI(params)
            if(res){
                message.success('修改成功')
                dispatch('getUserInfo')
            }
        },

        logout: async({ commit }) => {
            removeToken()
            resetRouter()
            commit('reset_state')
        },
        // remove token
        resetToken({ commit }) {
            return new Promise(resolve => {
                removeToken() // must remove  token  first
                commit('reset_state')
                resolve()
            })
        },
    }
}

export default user
