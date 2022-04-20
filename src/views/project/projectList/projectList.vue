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
                                    <a-collapse-panel key="1" header="Project Detail"
                                                      :style="collapseStyle" v-if="this.panelLeftFirst">
                                        <span> name : {{this.currentProjectDetail.projectName}} </span>
                                        <div></div>
                                        <span v-if="this.currentProjectDetail.tag!=null"> project tag : {{this.currentProjectDetail.tag}}</span>
                                        <div></div>
                                        <span> description : {{this.currentProjectDetail.projectDescription}}</span>
                                        <div></div>
                                        <span v-if="this.currentProjectDetail.githubRepoName!=null"> repository name : {{this.currentProjectDetail.githubRepoName}}</span>
                                        <div></div>
                                        <span v-if="this.currentProjectDetail.githubRepoOwner!=null"> github owner : {{this.currentProjectDetail.githubRepoOwner}}</span>


                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
                            <div slot="secondPane" class="second-pane" ref="element"
                                 style="padding-right: 70px;width: 100%;text-align: left;">
                                <div class="scroll-content">
                                    <div class="project-list" style="margin-top: 30px">
                                        <span class="project-list-title"
                                              v-if="this.projectList.length!==0" >My Projects</span>
                                    </div>
                                    <div class="no-project" v-if="this.projectList.length===0">
                                        <span class="add-header-title">Please create your first project</span>
                                        <div class="add-header-desccription">
                                            <span class="create-header" @click="jumpToCreate()">Create</span>
                                        </div>
                                    </div>
                                    <div style="height: 750px;margin-top: 20px">
                                        <vue-scroll >
                                            <div class="projectList" v-for="item in projectList" :key="item.id">
                                                <List>
                                                    <projectItem :project-name="item.projectName"
                                                                 :id="item.id"
                                                                 :project-description="item.projectDescription"
                                                                 :githubRepoName="item.githubRepoName"
                                                                 :tag="item.tag"
                                                    ></projectItem>
                                                </List>
                                            </div>
                                        </vue-scroll>
                                    </div>
                                </div>
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
    import layout2 from '../../../components/layout2/layout2'
    import projectItem from '../components/projectItem'

    export default {
        name: "projectList",
        components: {
            layout2,
            projectItem,


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
                'panelLeftFirst',
                'size',
                'minSize',
                'currentProjectDetail'
            ])
        },
        async mounted() {
            await this.getProjectList(this.userId);
            this.set_panelLeftFirst(false);
            this.set_currentIssueDetail(null);
            this.set_currentIssueId(null);
            this.set_currentProjectId(null);

        },
        methods: {
            ...mapMutations([
                'set_projectList',
                'set_ProjectListLoading',
                'set_addProjectVisible',
                'set_panelLeftFirst',
                'set_currentIssueDetail',
                'set_currentIssueId',
                'set_currentProjectId',

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
