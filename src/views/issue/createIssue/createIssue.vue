<template>
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <div class="layout-content">
                <div class="side-content" style="margin-bottom: 22px;width: 50px">
                <span class="side-content-tool">
                    <a-icon type="plus-circle" @click="jumpToCreate"/>
                </span>
                    <span class="side-content-tool">
                    <a-icon type="form" @click="jumpToCreateIssue"/>
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
                                <!--                                <List header="Header" footer="Footer" border size="small">-->
                                <!--                                    <ListItem class="list-pro" v-for="(p, index) in this.projectList" :key="index">{{p.projectName}}</ListItem>-->
                                <!--                                </List>-->
                                <div class="no-curr-project" v-if="chosenProject===0">
                                    <span>请选择Issue所在项目</span>
                                    <Select v-model="model11" filterable>
                                        <Option v-for="item in this.projectList" :value="item.id" :key="item.value"
                                                v-model="chosenProject" on-change="getChosenProject">
                                            {{item.projectName}}
                                        </Option>
                                    </Select>
                                </div>
                                <div class="chosen-project" v-if="chosenProject!==0">
                                    <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                        <a-collapse-panel key="1" header="所在项目" :style="collapseStyle">
                                            <div  style="margin-top: 20px">
                                             {{currentProjectDetail.projectName}}
                                            </div>
                                        </a-collapse-panel>
                                    </a-collapse>
                                </div>


                            </div>
                            <div slot="secondPane" class="second-pane"
                                 style="padding-right: 30px;width: 100%;text-align: left">
                                <createIss></createIss>
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
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import createIss from "../components/createIss";
    import {Modal} from "ant-design-vue";

    export default {
        name: "createIssue",
        components: {
            createIss,
        },
        data() {
            return {
                //todo:改id
                projectId: '',
                chosenProject: this.currentProjectId,
                split1: 0.5,
                collapseStyle: "background: #354A51;color:#fff;border-radius: 0px;margin-bottom: 24px;border: 1;border-color:#658885;overflow: hidden"
                ,
                model11: '',
            };
        },
        computed: {
            ...mapGetters([
                'userId',
                'addProjectVisible',
                'currentProjectId',
                'size',
                'minSize',
                'projectList',
                'currentProjectDetail'

            ])
        },
        async mounted() {
            await this.getProjectList(this.userId);
        },
        methods: {
            ...mapMutations([
                'set_currentProjectId',
                'set_addProjectVisible',
            ]),
            ...mapActions([
                'deleteIssue',
                'getProjectList',
                'getProjectDetailById',

            ]),
            jumpToCreate() {
                this.$router.push({name: 'addProject'})
            },
            cancelCreate() {
                Modal.confirm({
                    title: '取消创建Issue',
                    content: '确认取消创建该Issue？',
                    onOk: () => {
                        // this.deleteIssue();
                        this.$router.push({name: 'issueList'})
                    },
                    onCancel: () => {
                        console.log('点击了取消');
                    },
                });
            },
            jumpToCreateIssue() {
                this.$router.push({name: 'createIssue'})
            },
            getChosenProject(){
                this.set_currentProjectId(this.chosenProject);
                this.getProjectDetailById();
            }
        },
    }
</script>

<style scoped>
    .se-header-title {
        position: absolute;
        left: 72px;
        margin-top: 10px;
        font-size: 15px;
        color: #EBFFEF;
    }

    .se-header-title-right {
        position: absolute;
        right: 35px;
        margin-top: 10px;
        font-size: 15px;
        color: #EBFFEF;
        cursor: pointer;
    }

    .list-pro :hover {
        background-color: #658885;
    }

</style>
