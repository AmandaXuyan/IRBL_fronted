import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <!--    url和文件上传-->
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <Affix class="layout-se-header" style="width:100%;background-color:#354A51 " :offset-top="60">
                <div class="se-header-bread">
                    <span class="se-header-title" >Project  {{this.currentProjectDetail.projectName}}</span>
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
                                                      :style="collapseStyle">
                                        <span> todo: add项目详情API:id={{this.currentProjectId}}</span>

                                    </a-collapse-panel>
                                    <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                        <a-collapse-panel key="1" header="Files" :disabled="false" :style="collapseStyle">
                                            <projectTree></projectTree>
                                        </a-collapse-panel>
                                    </a-collapse>
                                    <a-collapse-panel key="3" header="Issues" :style="collapseStyle">
                                        <p>A dog is a type of domesticated animal. Known for its loyalty a</p>
                                    </a-collapse-panel>
                                </a-collapse>

                            </div>
                            <div slot="secondPane" class="second-pane" style="padding-right: 30px;width: 100%;text-align: left">
                                <div class="toolbar">
                                    <li>
                                        <Button @click="updateProject1()" >updateProject</Button>
                                        <Button @click="getRepoAllIssues1()" >getRepoAllIssues</Button>
                                        <Button @click="saveRepoAllIssues1()" >saveRepoAllIssues</Button>
                                    </li>

                                </div>
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
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import projectTree from "../components/projectTree";


    export default {
        name: "projectDetail",
        components:{
            projectTree,
        },
        data(){
            return{
                //todo:改id
                projectId:'',
                split1:0.5,
                collapseStyle:"background: #354A51;color:#fff;border-radius: 0px;margin-bottom: 0px;border: 1;border-color:#658885;overflow: hidden",
                projectUpdate:{
                    id:0,
                    projectName:'',
                    projectDescription:'',
                },


            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'addProjectVisible',
                'currentProjectId',
                'currentProjectDetail',
                'panelLeftFirst'
            ])
        },
        async mounted() {
        },
        methods:{
            ...mapMutations([
                'set_currentProjectId',
                'set_addProjectVisible',
                'set_panelLeftFirst',
            ]),
            ...mapActions([
                'updateProject',
                'getRepoAllIssues',
                'saveRepoAllIssues'
            ]),
            jumpToDetail(){
                this.set_currentProjectId(this.projectId);
                this.$router.push({name:'projectDetail'})
            },
            jumpToCreate(){
                this.$router.push( 'addProject')
            },
            jumpToList(){
                this.$router.push({ name: 'projectList'})
            },
            updateProject1(){
                this.updateProject(this.projectUpdate);
            },
            getRepoAllIssues1(){
                this.getRepoAllIssues(this.currentProjectId);
            },
            saveRepoAllIssues1(){
                this.saveRepoAllIssues(this.currentProjectId);
            }
        },
    }
</script>

<style scoped>
    .se-header-title{
        position: absolute;
        left:72px;
        margin-top: 10px;
        font-size: 15px;
        color: #EBFFEF;
    }
    .toolbar{
        margin: 0px;
        color: #6a8bad;
        font-size: 18px;
        height: 58px;
        padding-right: 85%;
    }

</style>
