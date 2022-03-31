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
                                <!--                                <List header="Header" footer="Footer" border size="small">-->
                                <!--                                    <ListItem class="list-pro" v-for="(p, index) in this.projectList" :key="index">{{p.projectName}}</ListItem>-->
                                <!--                                </List>-->
<!--                                <div class="no-curr-project">-->
<!--                                    <Select v-model="model11"-->
<!--                                            filterable-->
<!--                                            clearable-->
<!--                                            placeholder="选择所在项目"-->
<!--                                            ref="issueSelect"-->
<!--                                            style="border-bottom: 1px"-->
<!--                                            @on-change="getChosenProject"-->
<!--                                            @on-clear="clearIssue"-->
<!--                                    >-->
<!--                                        <Option value="0" selected="selected" style="display: none;"></Option>-->
<!--                                        <Option v-for="item in projectList" :value="item.id"  :key="item.value"-->
<!--                                                :v-model="chosenProject"-->
<!--                                                style="max-height: 80px">-->
<!--                                            {{item.projectName}}-->
<!--                                        </Option>-->
<!--                                    </Select>-->
<!--                                    <Divider style="margin-top: 3px;margin-bottom: 0"></Divider>-->
<!--                                </div>-->
                                <div class="no-curr-project" v-if="chosenProject===0">
                                    <span>请选择Issue所在项目</span>
                                    <Select v-model="model11" filterable placeholder="选择所在项目">
                                        <Option v-for="item in this.projectList" :value="item.id" :key="item.value"
                                                v-model="chosenProject" on-change="getChosenProject">
                                            {{item.projectName}}
                                        </Option>
                                    </Select>
                                </div>
                                <div class="chosen-project" v-if="chosenProject!==0">
                                    <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                        <a-collapse-panel key="1" header="所在项目" :style="collapseStyle">
                                            <div>
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
            await this.getProjectDetailById();
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
            async getChosenProject(){
                this.set_currentProjectId(this.chosenProject);
                await this.getProjectDetailById();
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
