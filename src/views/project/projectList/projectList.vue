import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <Affix class="layout-se-header" style="width:100%;background-color:#354A51 " :offset-top="60">
                <div class="se-header-bread">
                    <span class="se-header-title"> My Projects</span>
                </div>
            </Affix>
            <div class="layout-content" >
                <div class="side-content" style="margin-bottom: 22px">
                <span class="side-content-tool">
                    <a-icon type="plus-circle" @click="jumpToCreate"/>
                </span>
                </div>
                <div class="main-content" style="margin-left: 50px;margin-bottom: 22px">
                    <div class="split-content" style="color: #fff">
                        <rs-panes split-to="columns"
                                  style="left:50px"
                                  :allow-resize="true"
                                  size=200
                                  min-size=100
                                  class="panes-wrap">
                            <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="Project Detail"
                                                      :style="collapseStyle" v-if="this.panelLeftFirst">
                                        <span> todo: add项目详情API:id={{this.currentProjectId}}</span>

                                    </a-collapse-panel>
                                    <a-collapse-panel key="2" header="This is panel header 2" :disabled="false " :style="collapseStyle">
                                        <p>A dog is a type of domesticated animal. Known for its loyalty a</p>
                                    </a-collapse-panel>
                                    <a-collapse-panel key="3" header="This is panel header 3" :style="collapseStyle">
                                        <p>A dog is a type of domesticated animal. Known for its loyalty a</p>
                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
                            <div slot="secondPane" class="second-pane" ref="element" style="padding-right: 30px;width: 100%;text-align: left;">
                                <div class="scroll-content">
                                    <div class="tool-bar" style="margin-top: 20px">
                                        <Button @click="searchIssue1()" >searchIssue</Button>
                                    </div>
                                    <div class="projectList" v-for="item in projectList" :key="item.id">
                                        <List >
                                            <projectItem :project-name="item.projectName"
                                                         :id="item.id"
                                                         :project-description="item.projectDescription"
                                                         :githubRepoName="item.githubRepoName"
                                            ></projectItem>
                                        </List>
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
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import layout2 from '../../../components/layout2/layout2'
    import projectItem from '../components/projectItem'
    export default {
        name: "projectList",
        components:{
            layout2,
            projectItem,


        },
        data(){
            return{
                //todo:改id
                projectId:'',
                searchIssueForm:{
                    id:1,
                    keywords:"",
                },
                split1:0.5,
                movieList: [
                    {
                        name: 'The Shawshank Redemption',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
                    },],
                randomMovieList: [],
                collapseStyle:"background: #354A51;color:#fff;border-radius: 0px;margin-bottom: 24px;border: 1;border-color:#658885;overflow: hidden",

            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'token',
                'projectList',
                'projectListLoading',
                'addProjectVisible',
                'uploadVisible',
                'currentProjectId',
                'panelLeftFirst'
            ])
        },
        async mounted() {
            await this.getProjectList(this.userId);
            this.set_panelLeftFirst(false);

        },
        methods:{
            ...mapMutations([
                'set_projectList',
                'set_ProjectListLoading',
                'set_uploadVisible',
                'set_currentProjectId',
                'set_addProjectVisible',
                'set_panelLeftFirst'
            ]),
            ...mapActions([
                'getProjectList',
                'searchIssue'

            ]),
            jumpToDetail(){
                this.set_currentProjectId(this.projectId);
                this.$router.push({ name: 'projectDetail', params: { projectId: this.projectId }})
            },

            searchIssue1(){
                this.searchIssue(this.searchIssueForm)
            },
            jumpToCreate(){
                this.set_addProjectVisible(true);
                this.$router.push( 'addProject');
            },
            selected(id){
                this.activeName = id;
            },


        },
    }
</script>

<style scoped>



</style>
