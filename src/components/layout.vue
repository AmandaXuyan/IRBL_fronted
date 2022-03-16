<template>
    <div class="layout">
        <div id="side-layout">
            <a-layout id="components-layout-side" style="min-height: 100vh " >
                <a-layout-sider v-model="collapsed" collapsible >
                    <div class="logo" />
                    <a-menu class="menu" theme="dark" :default-selected-keys="['1']" mode="inline" >
                        <a-menu-item key="1">
                            <router-link to="/">
                            <a-icon type="bank" />
                            <span>HOME</span>
                            </router-link>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <router-link to="/project/projectList">
                            <a-icon type="code" />
                            <span>PROJECTS</span>
                            </router-link>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <router-link to="/issue/issueList">
                            <a-icon type="solution" />
                            <span>ISSUES</span>
                            </router-link>
                        </a-menu-item>
                        <a-menu-item key="4" >
                            <router-link to="/issue/issueHistory">
                            <a-icon type="history" />
                            <span >RECORDS</span>
                            </router-link>
                        </a-menu-item>
                        <a-menu-item key="5" @click="jumpToUserInfo">
                            <router-link to="/user/info">
                                <a-icon type="user" />
                                <span>USER</span>
                            </router-link>
                        </a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <a-layout>
                    <a-layout-header class="header" style="background: #fff; padding: 0" >
                        <router-link to="/login">Login</router-link><router-view/>

                    </a-layout-header>
                    <a-layout-content class="content" style="margin: 0 16px;background: #EBFFEF">

                    </a-layout-content>

                </a-layout>
            </a-layout>
        </div>

    </div>
</template>

<script>
    import { mapGetters,mapActions, mapMutations  } from 'vuex';

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: "layout",
        components: {

        },
        data() {
            return {
                collapsed: false,
            };
        },
        computed: {
            ...mapGetters([
                'userId'
            ]),
        },
        mounted() {

        },
        methods: {
            ...mapMutations([

            ]),
            ...mapActions([

            ]),
            jumpToUserInfo(){
                this.$router.push({ name: 'userInfo', params: { userId: this.userId }})
            }

        },


    }
</script>

<style scoped lang="less">
    #components-layout-side
    .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
    .header{
        height: 64px;
        min-width: 800px;
        z-index: 1;
    }
    .content{
        display: flex;
        height: 100%;
        /*justify-content:center;*/
    }


</style>

