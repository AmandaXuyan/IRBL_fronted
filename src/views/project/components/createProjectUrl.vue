<template>
    <div class="create-project-url" >
        <div class="happy-scroll-content">
        <div class="add-header">
            <span class="add-header-title">Import File From Github</span>
            <div class="add-header-desccription">
            <span >
                 You can import a existing project from 'github.com' or upload a local project.
            </span>
            </div>
            <Divider style="background-color: #658885"/>
            <div class="add-first">
                <div class="add-title-style">
                    <span> Github URL</span>
                </div>
                <div class="add-header-desccription" style="margin-bottom: 5px">
            <span >
                Use Git or checkout with SVN using the web URL.
            </span>
                </div>
                <div class="add-input">
                    <Input v-model="projectUrl"
                           placeholder="Paste your URL here" style="width: 400px" />
                </div>

            </div>
            <div class="create-header" @click="connectGithub1">
                Connect
            </div>
        </div>
        </div>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import 'vue-happy-scroll/docs/happy-scroll.css'
    import {message} from 'ant-design-vue'

    export default {
        name: "createProjectUrl",
        components: {

        },
        props:[],
        data(){
        return{
            id:this.currentProjectId,
            projectUrl:'',
            addProjectUrlForm:{
                userId:0,
                projectId:0,
                url:''
            },

        };
    },
    computed:{
    ...mapGetters([
            'userId',
            'currentProjectId',
        'currentProjectDetail',
        ])
    },
    async mounted() {

    },
    methods:{
    ...mapMutations([
            'set_currentProjectId',

        ]),
    ...mapActions([
        'addProjectUrl',

        ]),
            jumpToDetail(){

            this.$router.push({ name: 'projectDetail'})
        },
        connectGithub1(){
        if(this.projectUrl==''){
            message.info('请先填写URL')
        }
        else
            {
            this.addProjectUrlForm.projectId=this.currentProjectId;
            this.addProjectUrlForm.userId=this.userId;
            this.addProjectUrlForm.url=this.projectUrl;
            this.addProjectUrl(this.addProjectUrlForm);
            this.$router.push({ name: 'addProjectUrlCommit'})
        }
        },

    },
    }
</script>

<style scoped>
    .create-project-url{
        margin-left: 140px;
        margin-top: 90px;
        margin-right: 100px;
    }
    .add-header-title{
        color: #DBF5E0;
        font-size: 26px;
        font-weight: 400;
        flex: 1 1 auto;

    }
    .add-header-desccription{
        color: #fff;
        font-size: 13px;

    }
    .add-title-style{
        color: #DBF5E0;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 5px;
    }
    .add-input{
        margin-bottom: 20px;
    }
    .create-header{
        width: 80px;
        text-align: center;
        margin-left: 5px;
        margin-top: 40px;
    }


</style>
