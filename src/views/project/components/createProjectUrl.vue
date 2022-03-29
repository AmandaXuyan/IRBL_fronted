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
                    <div class="add-header-desccription">
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
                <div class="create-header" @click="connectGithub1">
                    Connect
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
                githubRepoName:'',
                accountName:'',
                personalAccessToken:'',
                projectUrl: '',
                addProjectUrlForm: {
                    userId: 0,
                    projectId: 0,
                    githubRepoOwner: '',
                    githubRepoName:'',
                    accountName:'',
                    personalAccessToken:'',
                },

            };
        },
        computed: {
            ...mapGetters([
                'userId',
                'currentProjectId',
                'currentProjectDetail',
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_currentProjectId',

            ]),
            ...mapActions([
                'addProjectUrl',

            ]),
            jumpToDetail() {

                this.$router.push({name: 'projectDetail'})
            },
            connectGithub1() {
                if (this.githubRepoOwner === ''|| this.githubRepoName === '') {
                    message.info('请把信息填写完整')
                } else {
                    this.addProjectUrlForm.projectId = this.currentProjectId;
                    this.addProjectUrlForm.userId = this.userId;
                    this.addProjectUrlForm.githubRepoOwner = this.githubRepoOwner;
                    this.addProjectUrlForm.githubRepoName = this.githubRepoName;
                    this.addProjectUrlForm.accountName = this.accountName;
                    this.addProjectUrlForm.personalAccessToken = this.personalAccessToken;
                    console.log(this.addProjectUrlForm);
                    this.addProjectUrl(this.addProjectUrlForm);
                    // this.$router.push({ name: 'addProjectUrlCommit'})
                    this.$router.push({name: 'projectDetail'});
                }
            },

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
