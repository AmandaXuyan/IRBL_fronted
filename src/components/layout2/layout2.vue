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
                    BLIT
                </div>
                <div class="layout-nav">
                    <Menu-item name="projectList" @mouseenter.native="mouseOver" @mouseleave.native="mouseLeave">
                        Projects
                    </Menu-item>
                    <Menu-item name="issueList" v-if="this.issueShowVisible">
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
                <span class="create-header" @click="goToActivePage('addProject')">Create Project</span>
                <div class="layout-right">
                    <a @click="goToActivePage('main')" class="right-link">Home</a>
                    <a @click="loginOut" class="right-link" v-if="!this.visibleLogin" >Log Out</a>
                    <a class="right-link">|</a>
                    <a class="right-link" @click="goToActivePage('userInfo')">Hi, {{this.userInfo.userName}} !</a>
                </div>
            </Menu>
            <Affix class="layout-pop" style="width:100%" :offset-top="60" v-if="visiblePop" @mouseenter.native="mouseOver" @mouseleave.native="mouseLeave">
                <div class="nav-menu">
                    <div class="nav-menu-project">
                        <navMenu icon-name="md-folder-open" icon-title="List" page-name="projectList"/>
                        <navMenu icon-name="md-add" icon-title="Create" page-name="addProject"/>
                    </div>
                </div>
            </Affix>
        </Affix>

<!--        <Affix class="layout-se-header" style="width:100%" :offset-top="60">-->
<!--            <div class="se-header-bread">-->

<!--            </div>-->
<!--        </Affix>-->
<!--        <div class="layout-content" >-->
<!--            <div class="side-content" style="margin-bottom: 22px">-->
<!--                <span class="side-content-tool">-->
<!--                    <a-icon type="plus-circle" />-->
<!--                </span>-->
<!--            </div>-->
<!--            <div class="main-content" style="margin-left: 50px;margin-bottom: 22px">-->
<!--                <div class="split-content" style="color: #fff">-->
<!--                    <rs-panes style="left:50px"-->
<!--                                  size=200-->
<!--                                  min-size=100-->
<!--                                  resizerBorderColor="#658885"-->
<!--                                  resizerColor="#658885"-->
<!--                                  split-to="columns"-->
<!--                                  :allow-resize="true"-->
<!--                                  class="split-panes-wrap">-->
<!--                        <div slot="split-content-left">-->

<!--                        </div>-->
<!--                        <div slot="split-content-right">-->

<!--                        </div>-->
<!--                    </rs-panes>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

        <div class="bottom-content">
            <span class="copyright"> NJUSE</span>
        </div>
    </div>


</template>
<style src="./index.less" lang="less"></style>
<script>
    import { SelfBuildingSquareSpinner } from 'epic-spinners';
    import {mapGetters, mapMutations} from 'vuex';
    import navMenu from '../nav-menu'
    import {Modal} from 'ant-design-vue'


    export default {
        name: "layoutTwo",
        components: {
            SelfBuildingSquareSpinner,
            navMenu,

        },
        data() {
            return {
                activePage: '',
                localUserName: {},

            };
        },
        computed: {
            ...mapGetters({
                userInfo: 'userInfo',
                visibleLogin:'visibleLogin',
                visiblePop:'visiblePop',
                issueShowVisible:'issueShowVisible',
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
                'set_visiblePop',
                'set_userId',
                'reset_state',
                'set_tabList',
                'set_issueShowVisible',
                'set_currentProjectId',
                'set_pageName',
                'set_treeData'
            ]),
            loginOut() {
                Modal.confirm({
                    title: '退出',
                    content: '确认退出？',
                    onOk: () => {
                        localStorage.setItem('token', null); // 将token清空
                        this.reset_state();
                        this.set_tabList([]);
                        this.set_treeData(null);
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
                if(key ==='projectList'){
                    this.set_issueShowVisible(false);
                    this.set_currentProjectId(0);
                }
                this.set_tabList([]);
                this.set_pageName(1);
                this.$router.push({ name: key})
            },
            //次菜单栏跳转页面
            mouseOver(){
                this.set_visiblePop(true);
            },
            mouseLeave(){
                this.set_visiblePop(false);
            },

        },
    }
</script>

<style scoped>


</style>
