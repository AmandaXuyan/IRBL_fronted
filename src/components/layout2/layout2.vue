<template>
    <div class="layout">
        <Affix class="layout-top">
            <Menu mode="horizontal" theme="primary" :active-name="activePage" @on-select="goToActivePage">
                <div class="layout-logo">
                    <self-building-square-spinner
                            :animation-duration="10000"
                            :size="30"
                            color="#fff"
                    />
                </div>
                <div class="layout-title" @click="goToActivePage('main')">
                    IRBL
                </div>
                <div class="layout-nav">
                    <Menu-item name="projectList">
                        Projects
                    </Menu-item>
                    <Menu-item name="issueList">
                        Issues
                    </Menu-item>
                    <Menu-item name="issueHistory">
                        Records
                    </Menu-item>
                    <Menu-item name="userInfo">
                        User
                    </Menu-item>
                    <Menu-item name="loginPage" v-if="this.visibleLogin">
                        Sign In
                    </Menu-item>
                </div>
                <span class="create-header" @click="goToActivePage('createProject')">Create Project</span>
                <div class="layout-right">
                    <a @click="goToActivePage()" class="right-link">Home</a>
                    <a @click="loginOut" class="right-link" v-if="!this.visibleLogin" >Log Out</a>
                    <a class="right-link">|</a>
                    <a class="right-link" >Hi, {{this.userInfo.userName}} !</a>
                </div>
            </Menu>

        </Affix>
<!--        <Affix class="layout-pop" :offset-top="60" v-if="visiblePop">-->
<!--            sss-->
<!--        </Affix>-->

    </div>

</template>
<style src="./index.less" lang="less"></style>
<script>
    import { SelfBuildingSquareSpinner } from 'epic-spinners';
    import {mapGetters, mapMutations} from 'vuex';
    export default {
        name: "layoutTwo",
        components: {
            SelfBuildingSquareSpinner,
        },
        data() {
            return {
                activePage: '',
                localUserName: {},
                visiblePop:true,

            };
        },
        computed: {
            ...mapGetters({
                userInfo: 'userInfo',
                visibleLogin:'visibleLogin'
            }),
        },
        mounted() {
            const hash = window.location.hash.split('/');
            if (hash[1] && hash[1] !== '') {
                this.activePage = hash[1].split('?')[0];
            }
            console.log(this.userInfo)
        },
        methods: {
            ...mapMutations([
                'set_visibleLogin',
            ]),
            loginOut() {
                this.$Modal.confirm({
                    title: '退出',
                    content: '<h2>确认退出？</h2>',
                    onOk: () => {
                        localStorage.setItem('token', null); // 将token清空
                        this.$router.push({name:'main'});
                        this.set_visibleLogin(true);
                    },
                    onCancel: () => {
                        console.log('点击了取消');
                    },
                });
            },
            goToActivePage(key) {
                // this.$router.push(`/${key}`);
                this.$router.push({ name: key})
            },

        },
    }
</script>

<style scoped>

</style>
