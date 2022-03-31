import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <div class="layout-content">
                <div class="side-content" style="margin-bottom: 22px;width: 50px">
                <span class="side-content-tool">
                    <Poptip trigger="hover" content="create project" placement="right">
                    <a-icon type="plus-circle" @click="jumpToCreate"/>
                    </Poptip>
                </span>
                    <span class="side-content-tool">
                        <Poptip trigger="hover" content="create issue" placement="right">
                    <a-icon type="form" @click="jumpToCreateIssue"/>
                        </Poptip>
                </span>
                </div>
                <div class="main-content" style="margin-left: 50px;margin-bottom: 22px">
                    <div class="split-content" style="color: #fff">
                        <rs-panes split-to="columns"
                                  style="left:50px"
                                  :allow-resize="true"
                                  :size=this.size
                                  :min-size=this.minSize
                                  class="panes-wrap">
                            <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="导航"
                                                      :style="collapseStyle">
                                        <span> 欢迎来到个人页面！</span>
                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
                            <div slot="secondPane" class="second-pane" ref="element"
                                 style="padding-right: 70px;width: 100%;text-align: left;">

                            </div>
                        </rs-panes>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="./index.less" lang="less"></style>

<script>
    // eslint-disable-next-line no-unused-vars
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import layout2 from '../../components/layout2/layout2'


    export default {
        name: "userInfo",
        components: {
            layout2,



        },
        data() {
            return {
                //todo:改id
                projectId: '',
                split1: 0.5,
                collapseStyle: "background: #354A51;color:#fff;border-radius: 0px;margin-bottom: 24px;border: 1;border-color:#658885;overflow: hidden",

            };
        },
        computed: {
            ...mapGetters([
                'userId',
                'token',
                'projectList',
                'projectListLoading',
                'addProjectVisible',
                'uploadVisible',
                'currentProjectId',

                'size',
                'minSize'
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_projectList',
                'set_ProjectListLoading',
                'set_addProjectVisible',
            ]),
            ...mapActions([
                'getProjectList',

            ]),
            jumpToCreate() {
                this.set_addProjectVisible(true);
                this.$router.push('addProject');
            },
            selected(id) {
                this.activeName = id;
            },
            jumpToCreateIssue() {
                this.$router.push({name: 'createIssue'})
            }


        },
    }
</script>

<style scoped>


</style>
