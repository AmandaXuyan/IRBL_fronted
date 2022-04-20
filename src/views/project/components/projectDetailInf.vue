<template>
    <div class="project-infor">
        <div class="add-header">
            <span class="add-header-title">Basic Information</span>
            <div class="add-first">
                <div class="add-header-desccription" style="margin-top: 10px"
                     v-if="this.currentProjectDetail.personalAccessToken===''">
                    <span>⚠️️ This project is not configured with a personal access token, and some functions on github issues will not be available. </span>
                    <div/>
                    <span>⚠️️️ You can click the icon to add your token &nbsp;</span>
                    <Icon type="ios-build" @click="toAddToken" style="cursor: pointer"/>
                </div>
                <div class="add-title-style" >
                    <span style="margin-right: 30px"> Project Name:</span>
                    <Input v-model="this.currentProjectDetail.projectName"
                           disabled
                           :placeholder="this.currentProjectDetail.projectName"
                           style="width: auto;margin-left: 75px" v-if="!updateProVisible"/>
                    <Input v-model="projectName"
                           maxlength="10"
                           show-word-limit
                           :placeholder="this.currentProjectDetail.projectName" style="width: auto;;margin-left: 75px"
                           v-if="updateProVisible"
                    />
                    <span style="margin-right: 30px;font-weight: 400;font-size: 14px;"> &nbsp;{{this.currentProjectDetail.tag}}</span>
                </div>
                <div class="add-title-style">
                    <span style="margin-right: 30px"> Project Description:</span>
                    <Input v-model="this.currentProjectDetail.projectDescription"
                           type="textarea"
                           disabled
                           :autosize="{minRows: 2,maxRows: 5}"
                           style="width: auto;margin-left: 33px"
                           :placeholder="this.currentProjectDetail.projectDescription"
                           v-if="!updateProVisible"
                    />
                    <Input v-model="projectDescription"
                           type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           style="width: auto;margin-left: 33px"
                           :placeholder="this.currentProjectDetail.projectDescription"
                           v-if="updateProVisible"
                    />
                </div>
                <div class="add-title-style">
                    <span style="margin-right: 30px"> Repository Owner: </span>
                    <span style="font-weight: 500;margin-left: 42px">{{this.currentProjectDetail.githubRepoOwner}}</span>
                </div>
                <div class="add-title-style">
                    <span style="margin-right: 30px"> Repository Name: </span>
                    <span style="font-weight: 500;margin-left: 48px">{{this.currentProjectDetail.githubRepoName}}</span>
                </div>
                <div class="add-title-style" v-if="this.currentProjectDetail.accountName!==''">
                    <span style="margin-right: 30px"> Account Name: </span>
                    <span style="font-weight: 500;margin-left: 68px">{{this.currentProjectDetail.accountName}}</span>
                </div>
                <div class="add-title-style" v-if="this.currentProjectDetail.personalAccessToken!==''" >
                    <span style="margin-right: 30px"> Personal Access Token: </span>
                    <span style="font-weight: 500;margin-left:8px">{{this.currentProjectDetail.personalAccessToken}}</span>
                </div>

                <div class="add-title-style" v-if="addTokenVisible">
                    <span> Your Account Name</span>
                    <Input v-model="accountName"
                           placeholder="enter account name..." style="width: 200px;margin-left: 20px"/>
                </div>
                <div class="add-title-style" v-if="addTokenVisible">
                    <span> Personal Access Token</span>
                    <Input v-model="personalAccessToken"
                           placeholder="enter token..." style="width: 400px;margin-left: 20px"/>
                </div>
            </div>
            <div class="button-update">
                <Button @click="toUpdate" v-if="!updateProVisible&&!addTokenVisible">修改项目信息</Button>
                <Button @click="updateProject1" v-if="updateProVisible" style="margin-right: 30px">保存</Button>
                <Button @click="cancelUpdate" v-if="updateProVisible">取消</Button>
                <Button @click="addToken" v-if="addTokenVisible" style="margin-right: 30px"> 保存</Button>
                <Button @click="cancelAddToken" v-if="addTokenVisible" >取消</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {message} from 'ant-design-vue'

    export default {
        name: "projectDetailInf",
        components: {},
        data() {
            return {
                projectName: '',
                projectDescription: '',
                updateProVisible: false,
                projectUpdate: {},
                accountName: '',
                personalAccessToken: '',

            };
        },
        computed: {
            ...mapGetters([
                'currentProjectId',
                'currentProjectDetail',
                'addTokenVisible'
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_currentProjectDetail',
                'set_addTokenVisible'

            ]),
            ...mapActions([
                'updateProject'
            ]),
            toUpdate() {
                this.updateProVisible = true;
            },
            updateProject1() {
                if (this.projectName == '') {
                    message.info('project name 不能为空！')
                } else {
                    this.projectUpdate = this.currentProjectDetail;
                    this.projectUpdate.projectName = this.projectName;
                    this.projectUpdate.projectDescription = this.projectDescription;
                    this.updateProject(this.projectUpdate);
                    // this.set_currentProjectDetail(this.projectUpdate);
                    this.updateProVisible = false;
                    this.reset();
                }
            },
            cancelUpdate() {
                this.updateProVisible = false;
            },
            reset() {
                this.projectUpdate = null;
            },
            toAddToken() {
                this.set_addTokenVisible(true);
            },
            addToken() {
                if (this.accountName === '' || this.personalAccessToken === '') {
                    message.info('请把信息填写完整！')
                } else {
                    this.projectUpdate = this.currentProjectDetail;
                    this.projectUpdate.accountName = this.accountName;
                    this.projectUpdate.personalAccessToken = this.personalAccessToken;
                    this.updateProject(this.projectUpdate);
                    this.set_addTokenVisible(false);
                    this.reset();
                }
            },
            cancelAddToken() {
                this.set_addTokenVisible(false);
            }


        },
    }
</script>

<style scoped>
    .project-infor {
        margin-left: 120px;
        margin-top: 60px;
        margin-right: 100px;
    }

    .add-header-title {
        color: #DBF5E0;
        font-size: 26px;
        font-weight: 400;
        flex: 1 1 auto;

    }

    .add-header-desccription {
        color: #fff;
        font-size: 13px;

    }

    .add-title-style {
        color: #DBF5E0;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 5px;
        margin-top: 20px;
    }

    .add-input {
        margin-bottom: 20px;
    }

    .button-update {
        margin-top: 50px;
    }


</style>
