import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <div class="projectListPage">
        <div class="page-content">
            <layout2/>
            <div class="project-title" @click="jumpToProject" style="cursor:pointer;">
                <!--                Issue：{{this.currentProjectDetail.projectName}}{{this.currentIssueDetail.title}} &#45;&#45;-->
                <span class="title-head">Project: {{this.currentProjectDetail.projectName}} &nbsp;{{this.currentProjectDetail.tag}} - Issues</span>
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
                                  :size=split1
                                  :max-size=split1
                                  class="panes-wrap">
                            <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                            </div>
                            <div slot="secondPane" class="second-pane" ref="element"
                                 style="height: 100%;width: 100%;text-align: left;">
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
                                <div style="height: 100%; width: 100%;">
                                    <CJS ref="ref_CJS"></CJS>
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
    import layout2 from '../../components/layout2/layout2'
    import CJS from './components/cjs';

    export default {
        name: "connectDetail",
        components: {
            layout2,
            CJS
        },
        data() {
            return {
                //todo:改id
                projectId: '',
                split1: 0,
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
                'issueRelations',
                'relationIssueInf',
                'currentProjectDetail'
            ])
        },
        async mounted() {
            this.addEles();
        },
        methods: {
            ...mapMutations([
                'set_addProjectVisible',
                'set_pageName',
                'set_currentIssueDetail',
                'set_currentIssueId',

            ]),
            ...mapActions([]),
            jumpToCreate() {
                this.set_addProjectVisible(true);
                this.$router.push('addProject');
            },
            selected(id) {
                this.activeName = id;
            },
            jumpToCreateIssue() {
                this.$router.push({name: 'createIssue'})
            },
            addEles() {
                this.$refs['ref_CJS'].addEles(this.issueRelations);
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
            jumpToProject(){
                this.set_currentIssueDetail({});
                this.set_currentIssueId(0);
                this.$router.push({name: 'projectDetail'});
            },


        },
    }
</script>

<style scoped>


</style>
