<template>
    <div class="project-infor">
        <div class="add-header">
            <span class="add-header-title">Basic Information</span>
            <div class="add-first">
                <div class="add-title-style">
                    <span style="margin-right: 30px"> Project Name</span>
                    <Input v-model="this.currentProjectDetail.projectName"
                           disabled
                           :placeholder="this.currentProjectDetail.projectName"
                           style="width: auto" v-if="!updateProVisible"/>
                    <Input v-model="projectName"
                           maxlength="10"
                           show-word-limit
                           :placeholder="this.currentProjectDetail.projectName" style="width: auto"
                            v-if="updateProVisible"
                    />
                </div>
                <div class="add-title-style">
                    <span style="margin-right: 30px"> Project Description</span>
                    <Input v-model="this.currentProjectDetail.projectDescription"
                           type="textarea"
                           disabled
                           :autosize="{minRows: 2,maxRows: 5}"
                           style="width: auto"
                           :placeholder="this.currentProjectDetail.projectDescription"
                           v-if="!updateProVisible"
                    />
                    <Input v-model="projectDescription"
                           type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           style="width: auto"
                           :placeholder="this.currentProjectDetail.projectDescription"
                           v-if="updateProVisible"
                    />
                </div>
                <div class="add-title-style">
                    <span style="margin-right: 30px"> Repository Owner</span>
                    <Input v-model="this.currentProjectDetail.githubRepoOwner"
                           disabled
                           :placeholder="this.currentProjectDetail.githubRepoOwner"
                           style="width: auto" />
                </div>
                <div class="add-title-style">
                    <span style="margin-right: 30px"> Repository Name</span>
                    <Input v-model="this.currentProjectDetail.githubRepoName"
                           disabled
                           :placeholder="this.currentProjectDetail.githubRepoName"
                           style="width: auto" />
                </div>
            </div>
            <div class="button-update">
            <Button @click="toUpdate" v-if="!updateProVisible">修改项目信息</Button>
            <Button @click="updateProject1" v-if="updateProVisible" style="margin-right: 30px">保存</Button>
                <Button @click="cancelUpdate" v-if="updateProVisible">取消</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {message} from 'ant-design-vue'
    export default {
        name: "projectDetailInf",
        components:{

        },
        data(){
            return{
                projectName:'',
                projectDescription:'',
                updateProVisible:false,
                projectUpdate:{
                    id:0,
                    projectName:'',
                    projectDescription:'',
                },

            };
        },
        computed:{
            ...mapGetters([
                'currentProjectId',
                'currentProjectDetail',
            ])
        },
        async mounted() {

        },
        methods:{
            ...mapMutations([
                'set_currentProjectDetail',

            ]),
            ...mapActions([
                'updateProject'
            ]),
            toUpdate(){
                this.updateProVisible=true;
            },
            updateProject1(){
                this.projectUpdate.id=this.currentProjectId;
                this.projectUpdate.projectName=this.projectName;
                this.projectUpdate.projectDescription=this.projectDescription;
                if(this.projectName==''){
                    message.info('project name 不能为空！')
                }else{
                    this.updateProject(this.projectUpdate);
                    this.set_currentProjectDetail(this.projectUpdate);
                    this.updateProVisible=false;
                    this.reset();
                }
            },
            cancelUpdate(){
                this.updateProVisible=false;
            },
            reset(){
                this.projectUpdate={
                        id:0,
                        projectName:'',
                        projectDescription:'',
                }
            }


        },
    }
</script>

<style scoped>
    .project-infor{
        margin-left: 120px;
        margin-top: 60px;
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
        margin-top: 20px;
    }
    .add-input{
        margin-bottom: 20px;
    }
    .button-update{
        margin-top: 50px;
    }



</style>
