import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <div class="project-title" @click="jumpToIssue" style="cursor:pointer;">
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
                </div>
                <div class="main-content" style="margin-left: 50px;margin-bottom: 22px">
                    <div class="split-content" style="color: #fff">
                        <rs-panes split-to="columns"
                                  style="left:50px"
                                  :allow-resize="true"
                                  :size=400
                                  :min-size=this.minSize
                                  class="panes-wrap">
                            <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51"  >
                                    <a-collapse-panel key="1" header="Tips"
                                                      :style="collapseStyle">
                                        <div class="next-list">
                                            <span style="color: #42b983"> 💡如果对结果不满意？</span>
                                            <div></div>
                                            <span style="color: #42b983;cursor: pointer" @click="reBugLocation2" v-if="!isNext"> &nbsp;&nbsp;&nbsp;&nbsp;➡️&nbsp;点击得到下一批结果</span>
                                            <span style="color: #42b983" v-if="isNext"> &nbsp;&nbsp;&nbsp;&nbsp;➡️&nbsp;已无更多结果</span>
                                        </div>
                                        <div class="reconstruct" v-if="!this.isRetry">
                                        <span style="color: #42b983;cursor: pointer" @click="reBugLocation"> &nbsp;&nbsp;&nbsp;&nbsp;➡️&nbsp;重构Issue，再进行Bug Locate试试</span>
                                        </div>
                                        <div class="reconstruct" v-if="this.isRetry">
                                            <span style="color: #42b983"> &nbsp;&nbsp;&nbsp;&nbsp;➡️&nbsp;issue已重构</span>
                                            <div></div>
                                            <span style="color: #42b983;cursor: pointer" v-if="isNext" @click="jumpToIssue">&nbsp;&nbsp;&nbsp;&nbsp;➡️&nbsp;点击返回 </span>
                                        </div>

                                    </a-collapse-panel>
                                </a-collapse>
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="Issue Detail"
                                                      :style="collapseStyle">
                                        <div class="issue-detail">
                                            <!--                                            <span>title: {{this.currentIssueDetail.title}}</span>-->
                                            <!--                                            <div></div>-->
                                            <!--                                            <span v-if="this.currentIssueDetail.userName!=null">author: {{this.currentIssueDetail.userName}}</span>-->
                                            <div class="markdown-issue" style="height: 600px">
                                                <span style="color: #DBF5E0">{{this.currentIssueDetail.title}}</span>
                                                <div></div>
                                                <vue-scroll>
                                                    <mavon-editor
                                                            :value="this.currentIssueDetail.description"
                                                            defaultOpen="preview"
                                                            :boxShadow="false"
                                                            previewBackground="#354A51"
                                                            style="z-index:1;height:auto;border: 1px solid #d9d9d9;color: #fff;margin-top: 10px"
                                                            :editable="false"
                                                            :subfield="false"
                                                            :toolbarsFlag="false"
                                                            :externalLink="false"
                                                    >
                                                    </mavon-editor>
                                                </vue-scroll>
                                            </div>
                                        </div>

                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
                            <div slot="secondPane" class="second-pane" ref="element"
                                 style="padding-right: 70px;width: 100%;text-align: left;">
                                <!-- 右边两行分栏  start                             -->
                                <rs-panes split-to="rows"
                                          :allow-resize="true"
                                          :size=300
                                          :min-size=this.minSize
                                          class="panes-wrap">
                                    <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                                        <!-- 右上角result list和chart-->
                                        <rs-panes split-to="columns"
                                                  :allow-resize="true"
                                                  :size=650
                                                  :min-size=this.minSize
                                                  class="panes-wrap">
                                            <div slot="firstPane" class="first-pane"
                                                 style="width: 100%;text-align: left">
                                                <result-list></result-list>
                                            </div>
                                            <div slot="secondPane" class="second-pane" ref="element"
                                                 style="padding-right: 70px;width: 100%;text-align: left;">
                                                <div>
                                                    <span style="position: absolute;top:10px;left:35px;color: #DBF5E0">缺陷定位相似度分数柱状图</span>
                                                </div>
                                                <line-chart></line-chart>
                                            </div>
                                        </rs-panes>
                                        <!--右上角result list和chart end -->
                                    </div>
                                    <div slot="secondPane" class="second-pane" ref="element"
                                         style="padding-right: 70px;width: 100%;text-align: left;">
                                        <result-detail></result-detail>

                                    </div>
                                </rs-panes>
                                <!-- 右边两行分栏   end                            -->

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
    import ResultList from "./components/resultList";
    import ResultDetail from "./components/resultDetail";
    import LineChart from "./components/lineChart";


    export default {
        name: "bugLocation",
        components: {
            LineChart,
            ResultDetail,
            ResultList,
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
                'addProjectVisible',
                'uploadVisible',
                'currentProjectId',
                'size',
                'minSize',
                'bugLocationList',
                'currentProjectDetail',
                'currentIssueDetail',
                'currentIssueId',
                'isRetry',
                'isNext'
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_addProjectVisible',
                'set_isRetry',
                'set_isNext'
            ]),
            ...mapActions([
                'getBugLocation'
            ]),
            jumpToCreate() {
                this.set_addProjectVisible(true);
                this.set_isRetry(false);
                this.$router.push('addProject');
            },
            selected(id) {
                this.activeName = id;
            },
            jumpToCreateIssue() {
                this.$router.push({name: 'createIssue'});
                this.set_isRetry(false);
            },
            jumpToIssue() {
                this.$router.push({name: 'issueList'});
                this.set_isRetry(false);
            },
            async reBugLocation(){
                this.set_isRetry(true);
                this.set_isNext(false);
                await this.getBugLocation({id:this.currentIssueId,page:2});
                await this.$router.replace({
                    path: '/supplierAll2',
                    name: 'supplierAll2'
                })
            },
            async reBugLocation2(){
                this.set_isNext(true);
                await this.getBugLocation({id:this.currentIssueId,page:2});
                await this.$router.replace({
                    path: '/supplierAll2',
                    name: 'supplierAll2'
                })
            }


        },
    }
</script>

<style scoped>


</style>
