<template>
    <div class="create-project-url">
        <!--        <div class="happy-scroll-content">-->
        <div class="add-header">
            <span class="add-header-title">Import File From Github</span>
            <div class="add-header-desccription">
            <span>
                 You can import a existing project from 'github.com' or upload a local project.
            </span>
            </div>
            <Divider style="background-color: #658885"/>
            <div class="add-first">
                <div class="add-title-style">
                    <span> Repository Owner</span>
                    <Input v-model="githubRepoOwner"
                           placeholder="enter repository owner..." style="width: 200px;margin-left: 20px"/>
                </div>
                <div class="add-title-style">
                    <span> Repository Name</span>
                    <Input v-model="githubRepoName"
                           placeholder="enter repository name..." style="width: 200px;margin-left: 20px"/>
                </div>
                <Divider style="background-color: #658885"/>
                <div class="add-header-desccription" style="margin-bottom: 20px">
            <span>
                 If you do not fill in the github accout related information, there will be some function about issues that cannot be used.
            </span>
                </div>
                <div class="add-title-style">
                    <span> Your Account Name(optional)</span>
                    <Input v-model="accountName"
                           placeholder="enter account name..." style="width: 200px;margin-left: 20px"/>
                </div>
                <div class="add-title-style">
                    <span> Personal Access Token(optional)</span>
                    <Input v-model="personalAccessToken"
                           placeholder="enter token..." style="width: 200px;margin-left: 20px"/>
                </div>
            </div>
            <div class="create-header" @click="getTags1" v-if="!showTag">
                Connect
            </div>
            <div class="get-tag" v-if="showTag&&tagList.length!==0">
                <Divider style="background-color: #658885"/>
                <div class="add-title-style">
                    <span> Project Tag</span>
                    <Select v-model="model1" style="width: 200px;margin-left: 20px">
                        <Option v-for="item in tagList" :value="item" :key="item">{{ item}}</Option>
                    </Select>

                </div>
                <div class="create-header" @click="connectGithubWithTag">
                    Import
                </div>
            </div>
            <div class="no-tag" v-if="showTag&&tagList.length==0">
                <Divider style="background-color: #658885"/>
                <div class="add-header-desccription" style="margin-bottom: 10px;margin-top: 15px">
            <span>
                Project tag can help you judge the project version. But There are no tags available for this project, you can enter a tag here.
            </span>
                </div>
                <div class="add-title-style">
                    <span> Project Tag (Optional)</span>
                    <Input v-model="tag"
                           placeholder="enter project tag..." style="width: 200px;margin-left: 20px"/>
                </div>
                <div class="create-header" @click="connectGithub1">
                    Import
                </div>

            </div>
        </div>
    </div>
    <!--    </div>-->

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    // import 'vue-happy-scroll/docs/happy-scroll.css'
    import {message} from 'ant-design-vue'

    export default {
        name: "createProjectUrl",
        components: {},
        props: [],
        data() {
            return {
                id: this.currentProjectId,
                githubRepoOwner: '',
                githubRepoName: '',
                accountName: '',
                personalAccessToken: '',
                projectUrl: '',
                addProjectUrlForm: {
                    id: 0,
                    githubRepoOwner: '',
                    githubRepoName: '',
                    accountName: '',
                    personalAccessToken: '',
                    projectName: null,
                    projectDescription: null,
                },
                //to do :改回来
                showTag: false,
                model1: '',
                tag: ''

            };
        },
        computed: {
            ...mapGetters([
                'userId',
                'currentProjectId',
                'currentProjectDetail',
                'tagList',
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_currentProjectId',
                'set_currentProjectDetail',

            ]),
            ...mapActions([
                'addProjectUrl',
                'getTags',
                'addProjectUrlWithTag'

            ]),
            jumpToDetail() {

                this.$router.push({name: 'projectDetail'})
            },
            async connectGithub1() {
                if (this.githubRepoOwner === '' || this.githubRepoName === '') {
                    message.info('请把信息填写完整')
                } else {
                    this.addProjectUrlForm.id = this.currentProjectId;
                    this.addProjectUrlForm.githubRepoOwner = this.githubRepoOwner;
                    this.addProjectUrlForm.githubRepoName = this.githubRepoName;
                    this.addProjectUrlForm.accountName = this.accountName;
                    this.addProjectUrlForm.personalAccessToken = this.personalAccessToken;
                    this.addProjectUrlForm.projectName = this.currentProjectDetail.projectName;
                    this.addProjectUrlForm.projectDescription = this.currentProjectDetail.projectDescription;
                    this.addProjectUrlForm.tag = this.tag;
                    this.set_currentProjectDetail(this.addProjectUrlForm);
                    await this.addProjectUrl(this.addProjectUrlForm);
                    this.showTag = false;
                    this.$router.push({name: 'projectDetail'});
                }
            },
            /**
             * 获得github版本
             */
            async getTags1() {
                if (this.githubRepoOwner === '' || this.githubRepoName === '') {
                    message.info('请把信息填写完整')
                } else {
                    this.addProjectUrlForm.id = this.currentProjectId;
                    this.addProjectUrlForm.githubRepoOwner = this.githubRepoOwner;
                    this.addProjectUrlForm.githubRepoName = this.githubRepoName;
                    this.addProjectUrlForm.accountName = this.accountName;
                    this.addProjectUrlForm.personalAccessToken = this.personalAccessToken;
                    this.addProjectUrlForm.projectName = this.currentProjectDetail.projectName;
                    this.addProjectUrlForm.projectDescription = this.currentProjectDetail.projectDescription;
                    await this.getTags(this.addProjectUrlForm);
                    this.showTag = true;
                }
            },

            async connectGithubWithTag() {
                this.addProjectUrlForm.tag = this.model1;
                this.set_currentProjectDetail(this.addProjectUrlForm);
                await this.addProjectUrlWithTag(this.addProjectUrlForm);
                this.showTag = false;
                this.$router.push({name: 'projectDetail'});
            }

        },
    }
</script>

<style scoped>
    .create-project-url {
        margin-left: 140px;
        margin-top: 90px;
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
        margin-top: 5px;

    }

    .add-title-style {
        color: #DBF5E0;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 10px;
    }

    .add-input {
        margin-bottom: 20px;
    }

    .create-header {
        width: 80px;
        text-align: center;
        margin-left: 5px;
        margin-top: 40px;
    }


</style>
