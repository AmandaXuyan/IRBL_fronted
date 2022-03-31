import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <div class="project-title">
                <span class="title-head">Issue：{{this.currentProjectDetail.projectName}} -- {{this.currentIssueDetail.title}}</span>
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
                                <div class="no-curr-project">
                                    <Select v-model="model11"
                                            filterable
                                            clearable
                                            placeholder="🔍 搜索issue"
                                            ref="issueSelect"
                                            style="border-bottom: 1px"
                                            @on-change="getChosenIssue"
                                            @on-clear="clearIssue"
                                    >
                                        <Option value="0" selected="selected" style="display: none;"></Option>
                                        <Option v-for="item in issueList" :value="item.id"  :key="item.value"
                                                :v-model="chosenIssue"
                                                style="max-height: 80px">
                                            {{item.title}}
                                        </Option>
                                    </Select>
                                    <Divider style="margin-top: 3px;margin-bottom: 0"></Divider>
                                </div>
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="Issues" :style="collapseStyle">
                                        <div class="no-issue" v-if="issueList.length===0">
                                            <span>点击左边按钮, 创建一个issue吧</span>
                                        </div>
                                        <div style="height: 250px">
                                            <vue-scroll >
                                                <div class="issueList" v-for="item in issueList" :key="item.id" style="margin-right: 20px;max-height: 250px">
                                                    <List>
                                                        <issue-item :title="item.title"
                                                                    :id="item.id"
                                                                    :project-id="item.projectId"
                                                                    :description="item.description"
                                                        ></issue-item>
                                                    </List>
                                                </div>
                                            </vue-scroll>
                                        </div>
                                    </a-collapse-panel>
                                </a-collapse>
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="Project Detail"
                                                      :style="collapseStyle" v-if="this.panelLeftFirst">
                                        <span> todo: issue详情API:id={{this.currentIssueId}}</span>
                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
                            <div slot="secondPane" class="second-pane" ref="element"
                                 style="padding-right: 30px;width: 100%;text-align: left;">
                                <div class="scroll-content">
                                    <issue-detail-show></issue-detail-show>
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
    import IssueDetailShow from "../components/issueDetailShow";
    import IssueItem from "../components/issueItem";

    export default {
        name: "issueList",
        components: {
            IssueItem,
            IssueDetailShow,
            layout2,

        },
        data() {
            return {
                //todo:改id
                issueId: 0,
                searchIssueForm: {
                    id: 1,
                    keywords: "",
                },
                split1: 0.5,
                collapseStyle: "background: #354A51;color:#fff;border-radius: 0px;border: 1;border-color:#658885;overflow: hidden",
                chosenIssue: '',
                model11:'',
            };
        },
        computed: {
            ...mapGetters([
                'userId',
                'currentProjectId',
                'panelLeftFirst',
                'currentIssueId',
                'size',
                'minSize',
                'issueList',
                'currentProjectDetail',
                'issueDetailVisible',
                'currentIssueDetail'
            ])
        },
        async mounted() {
            this.set_panelLeftFirst(false);
            // await this.getIssueList(this.currentProjectId);
            // console.log(this.currentProjectId);
        },
        // watch:{
        //     modal11:{
        //         getChosenIssue(){
        //             this.set_currentIssueId(this.modal11);
        //             this.getIssueDetailById();
        //         },
        //     }
        // },

        methods: {
            ...mapMutations([
                'set_currentProjectId',
                'set_addProjectVisible',
                'set_panelLeftFirst',
                'set_currentIssueId',
                'set_currentIssueDetail',
                'set_issueDetailVisible',
                'set_issueEditVisible',
            ]),
            ...mapActions([
                'searchIssue',
                'addIssue',
                'deleteIssue',
                'getIssueList',
                'getIssueDetailById'
            ]),
            searchIssue1() {
                this.searchIssue(this.searchIssueForm)
            },
            jumpToCreate() {
                this.set_currentIssueDetail({});
                this.$router.push('addIssue');
                this.set_issueEditVisible(false);
            },
            selected(id) {
                this.activeName = id;
            },
            addIssue1() {
                this.set_currentIssueDetail({});
                this.$router.push({name: 'createIssue',});
                this.set_issueEditVisible(false);
                this.addIssue(this.addIssueForm);
                // this.set_issueModalVisible(true);
            },
            deleteIssue1() {
                this.set_currentIssueDetail({});
                this.deleteIssue(this.deleteIssueForm);

            },
            jumpToCreateIssue() {
                this.set_currentIssueDetail({});
                this.$router.push({name: 'createIssue'})
                this.set_issueEditVisible(false);
            }
            ,
            $imgAdd(pos, $file) {
                console.log(pos, $file);
            },
            async getChosenIssue(ops){
                this.set_currentIssueId(ops);
                await this.getIssueDetailById();
            },
            clearIssue(){
                this.set_panelLeftFirst(false);
            },
        },
    }
</script>

<style scoped>
    .ivu-table .rowClassName td {
        background-color: #354A51;
        color: #fff;
        border: 0px;
    }


</style>
