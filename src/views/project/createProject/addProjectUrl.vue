import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <!--    url和文件上传-->
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <div class="project-title">
                <span class="title-head"> Import {{this.currentProjectDetail.projectName}}'s File !</span>
            </div>
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
                                <Card class='upload-options' title="Options" icon="ios-options" :padding="0" shadow>
                                    <CellGroup>
                                        <Cell class="import-from-git" title="Import from github "/>
                                        <Cell class="upload-local" title="Upload local" to="/addProjectFile"/>
                                    </CellGroup>
                                </Card>
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="导航"
                                                      :style="collapseStyle">
                                        <p>输入你想导入的github项目信息</p>
                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
                            <div slot="secondPane" class="second-pane"
                                 style="padding-right: 30px;width: 100%;text-align: left">
                                <div class="header-title-right"><span @click="cancelCreate"> Cancel</span></div>
                                <createProjectUrl></createProjectUrl>
                            </div>
                        </rs-panes>

                    </div>
                </div>
            </div>


        </div>

    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import createProjectUrl from "../components/createProjectUrl";
    import {Modal} from "ant-design-vue";


    export default {
        name: "addProjectUrl",
        components: {
            createProjectUrl,
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
                'addProjectVisible',
                'currentProjectId',
                'currentProjectDetail',
                'connectResVisible',
                'size',
                'minSize'
            ])
        },
        async mounted() {
        },
        methods: {
            ...mapMutations([
                'set_currentProjectId',
                'set_addProjectVisible',
            ]),
            ...mapActions([
                'deleteProject',
                'getProjectList'
            ]),
            jumpToDetail() {
                this.set_currentProjectId(this.projectId);
                this.$router.push({name: 'projectDetail'})
            },
            jumpToCreate() {
                this.$router.push('addProject')
            },
            cancelCreate() {
                Modal.confirm({
                    title: '取消创建项目',
                    content: '确认取消创建该项目？',
                    onOk: () => {
                        this.deleteProject();
                        this.getProjectList(this.userId);
                        this.$router.push({name: 'projectList'})
                    },
                    onCancel: () => {
                        console.log('点击了取消');
                    },
                });
            },
            jumpToCreateIssue() {
                this.$router.push({name: 'createIssue'})
            }

        },
    }
</script>

<style scoped>
    .ivu-card-head p, .ivu-card-head-inner {
        color: #fff;
    }

    .upload-options {
        margin-bottom: 12px;
        width: 300px;
        background-color: #354A51
    }

    .import-from-git {
        color: #DBF5E0;
    }

    .header-title-right {
        position: absolute;
        right: 90px;
        top: 20px;
    }

</style>
