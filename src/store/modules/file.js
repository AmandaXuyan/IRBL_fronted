// import router from '@/router'
// import {  setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
// eslint-disable-next-line no-unused-vars
import { message } from 'ant-design-vue'
import {
    getFileByTreeAPI
} from '@/api/file'


const file = {
    state: {
        codes:'<div>This is codes</div>',
        fileLanguage:"html",
    },
    mutations:{
        set_codes:function(state, data) {
            state.codes = data
        },
        set_fileLanguage:function(state, data) {
            state.fileLanguage = data
        },

    },
    actions:{
        // eslint-disable-next-line no-unused-vars
        getFileByTree: async({commit, state},path) => {
            const data = {fileName:path}
            const res = await getFileByTreeAPI(data);
            if(res){
                commit('set_codes', res.fileContent);
                commit('set_fileLanguage', res.fileLanguage)
            }
        },

    }

}

export default file
