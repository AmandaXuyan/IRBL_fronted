import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <div class="project-title" @click="jumpToProject" style="cursor:pointer;">
<!--                Issue：{{this.currentProjectDetail.projectName}}{{this.currentIssueDetail.title}} &#45;&#45;-->
                <span class="title-head">Project: {{this.currentProjectDetail.projectName}} - Issues</span>
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
                    <span class="side-content-tool">
                        <Poptip trigger="hover" content="write all local issues to Github" placement="right">
                    <a-icon type="github" @click="writeBack1"/>
                        </Poptip>
                </span>
<!--                    <span class="side-content-tool">-->
<!--                        <Poptip trigger="hover" content="save github issue" placement="right">-->
<!--                    <a-icon type="cloud-download" @click="saveGithubIssue"/>-->
<!--                        </Poptip>-->
<!--                </span>-->

                </div>
                <div class="main-content" style="margin-left: 50px;margin-bottom: 22px">
                    <div class="split-content" style="color: #fff">
                        <!--                        左右分栏-->
                        <rs-panes split-to="columns"
                                  style="left:50px"
                                  :allow-resize="true"
                                  :size=this.size
                                  :min-size=this.minSize
                                  class="panes-wrap">
                            <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                                <!--                                左边上下第一个分栏-->
<!--                                <rs-panes split-to="rows"-->
<!--                                          :allow-resize="true"-->
<!--                                          :size=this.size-->
<!--                                          :min-size=this.minSize-->
<!--                                          class="panes-wrap">-->
<!--                                    <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">-->
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
                                                <Option v-for="item in issueList" :value="item.id" :key="item.value"
                                                        :v-model="chosenIssue"
                                                        style="max-height: 80px">
                                                    {{item.title}}
                                                </Option>
                                            </Select>
                                            <Divider style="margin-top: 3px;margin-bottom: 0"></Divider>
                                        </div>
                                        <a-collapse default-active-key="1" :bordered="false"
                                                    style="background-color: #354A51">
                                            <a-collapse-panel key="1" header="Local Issues" :style="collapseStyle">
                                                <div class="no-issue" v-if="issueList.length===0">
                                                    <span>点击左边按钮, 创建一个本地issue吧</span>
                                                </div>

                                                <div style="height: 650px">
                                                    <vue-scroll>
                                                        <div class="issueList" v-for="item in issueList" :key="item.id"
                                                             style="margin-right: 20px;max-height: 250px">
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
                                    </div>
<!--                                    <div slot="secondPane" class="second-pane" ref="element"-->
<!--                                         style="padding-right: 30px;width: 100%;text-align: left;">-->
<!--                                        &lt;!&ndash;                                        左边上下第二个分栏&ndash;&gt;-->

<!--&lt;!&ndash;                                        <a-collapse default-active-key="1" :bordered="false"&ndash;&gt;-->
<!--&lt;!&ndash;                                                    style="background-color: #354A51">&ndash;&gt;-->
<!--&lt;!&ndash;                                            <a-collapse-panel key="1" header="Github Issues"&ndash;&gt;-->
<!--&lt;!&ndash;                                                              :style="collapseStyle">&ndash;&gt;-->
<!--&lt;!&ndash;                                                <div style="height: 300px">&ndash;&gt;-->
<!--&lt;!&ndash;                                                    <vue-scroll>&ndash;&gt;-->
<!--&lt;!&ndash;                                                        <div class="issueList" v-for="item in gitIssueList"&ndash;&gt;-->
<!--&lt;!&ndash;                                                             :key="item.title"&ndash;&gt;-->
<!--&lt;!&ndash;                                                             style="max-height: 250px">&ndash;&gt;-->
<!--&lt;!&ndash;                                                            <List>&ndash;&gt;-->
<!--&lt;!&ndash;                                                                <ListItem class="issueItem-one">&ndash;&gt;-->
<!--&lt;!&ndash;                                                                    <ListItemMeta :title="item.title"/>&ndash;&gt;-->
<!--&lt;!&ndash;                                                                </ListItem>&ndash;&gt;-->
<!--&lt;!&ndash;                                                            </List>&ndash;&gt;-->
<!--&lt;!&ndash;                                                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                                                    </vue-scroll>&ndash;&gt;-->
<!--&lt;!&ndash;                                                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                                            </a-collapse-panel>&ndash;&gt;-->
<!--&lt;!&ndash;                                        </a-collapse>&ndash;&gt;-->
<!--                                        <a-collapse default-active-key="1" :bordered="false"-->
<!--                                                    style="background-color: #354A51">-->
<!--                                            <a-collapse-panel key="1" header="Issue Detail"-->
<!--                                                              :style="collapseStyle" v-if="this.panelLeftFirst">-->
<!--                                                <span> todo: issue详情API:id={{this.currentIssueId}}</span>-->
<!--                                            </a-collapse-panel>-->
<!--                                        </a-collapse>-->

<!--                                    </div>-->
<!--                                </rs-panes>-->
<!--                            </div>-->
                            <div slot="secondPane" class="second-pane" ref="element"
                                 style="padding-right: 30px;width: 100%;text-align: left;" >
                                <div class="scroll-content">
                                    <Menu mode="horizontal" :active-name=this.pageName @on-select="choosePage" style="height: 35px;line-height: 35px">
                                        <MenuItem name="1">
                                            <Icon type="ios-paper" />
                                            Local Issues
                                        </MenuItem>
                                        <MenuItem name="2">
                                            <Icon type="ios-people" />
                                            Github Issues
                                        </MenuItem>
                                        <MenuItem name="3">
                                            <Icon type="ios-construct" />
                                            Issue Relations
                                        </MenuItem>
                                    </Menu>
                                    <div class="page-content" style="height: 730px">
                                        <vue-scroll>
                                        <issue-detail-show v-if="this.pageName==1"></issue-detail-show>
                                        <githubIssueList v-if="this.pageName==2"></githubIssueList>
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
    import IssueDetailShow from "../components/issueDetailShow";
    import githubIssueList from "../components/githubIssueList";
    import IssueItem from "../components/issueItem";
    import {message} from 'ant-design-vue';

    export default {
        name: "issueList",
        components: {
            IssueItem,
            IssueDetailShow,
            layout2,
            githubIssueList,

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
                collapseStyle: "background: #354A51;color:#fff;border-radius: 0px;border: 1;border-bottom:0;border-color:#658885;overflow: hidden",
                chosenIssue: '',
                model11: '',
                isGithubIssue:false,
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
                'currentIssueDetail',
                'gitIssueList',
                'pageName'
            ])
        },
        async mounted() {
            this.set_panelLeftFirst(false);
            // await this.getGithubIssue();
            await this.getIssueList(this.currentProjectId);
            await this.getAllIssueRelation(this.currentProjectId);
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
                'set_pageName'
            ]),
            ...mapActions([
                'searchIssue',
                'addIssue',
                'deleteIssue',
                'getIssueList',
                'getIssueDetailById',
                'getRepoAllIssues',
                'getAllIssueRelation',
                'writeBack'
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
                this.$router.push({name: 'createIssue'});
                this.set_issueEditVisible(false);
            }
            ,
            jumpToProject(){
                this.set_currentIssueDetail({});
                this.set_currentIssueId(0);
                this.$router.push({name: 'projectDetail'});
            },
            $imgAdd(pos, $file) {
                console.log(pos, $file);
            },
            async getChosenIssue(ops) {
                this.set_currentIssueId(ops);
                await this.getIssueDetailById();
                if(this.pageName!=1){
                    this.choosePage(1);
                }

            },
            clearIssue() {
                this.set_panelLeftFirst(false);
            },
            async getGithubIssue() {
                console.log(this.currentProjectId);
                if(this.currentProjectDetail.githubRepoName==null){
                    message.warning('该项目没有github相关信息')
                }
                else{
                    await this.getRepoAllIssues(this.currentProjectId);
                    this.isGithubIssue=true;
                }

            },
            saveGithubIssue() {
                if(!this.isGithubIssue){
                    message.error('请先获取github issue!')
                }else{
                    console.log('to do')
                }

            },
            async choosePage(data){
                console.log(data);
                await this.set_pageName(data);
                if(data==3){
                    this.$router.push({name: 'connectDetail'})
                }else(
                    this.$router.replace({
                        path:'/supplierAll',
                        name:'supplierAll'
                    })
                )
            },
            async writeBack1(){
                await this.writeBack(this.currentProjectId);
                await this.set_pageName(2);
            }
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
