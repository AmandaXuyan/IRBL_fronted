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
                                  size=0
                                  max-size="0"
                                  class="panes-wrap">
                            <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                                <a-collapse default-active-key="1" :bordered="false" style="background-color: #354A51">
                                    <a-collapse-panel key="1" header="导航"
                                                      :style="collapseStyle">
                                        <span> issue连通图页面！</span>
                                    </a-collapse-panel>
                                </a-collapse>
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
                'issueRelations'
            ])
        },
        async mounted() {
            this.addEles();
        },
        methods: {
            ...mapMutations([
                'set_addProjectVisible',
                'set_pageName'
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
            addEles1() {
                this.$refs['ref_CJS'].addEles([
                    {
                        group: 'nodes',
                        data: {'id': '鲁A123456', 'name': '鲁A123456',},
                        classes: 'classes-A',
                        position: {x: 200, y: 50}
                    },
                    {
                        group: 'nodes',
                        data: {'id': '鲁B123456', 'name': '鲁B123456',},
                        classes: 'classes-A',
                        position: {x: 500, y: 50}
                    },
                    {
                        group: 'nodes',
                        data: {'id': '鲁C123456', 'name': '鲁C123456',},
                        classes: 'classes-A',
                        display: 'hide',
                        position: {x: 200, y: 150}
                    },
                    {
                        group: 'nodes',
                        data: {'id': '鲁D123456', 'name': '鲁D123456',},
                        classes: 'classes-A',
                        position: {x: 500, y: 150}
                    },
                    {
                        group: 'nodes',
                        data: {'id': '小王', 'name': '小王',},
                        classes: 'classes-B',
                        position: {x: 100, y: 100}
                    },
                    {
                        group: 'nodes',
                        data: {'id': '小赵', 'name': '小赵',},
                        classes: 'classes-B',
                        position: {x: 400, y: 100}
                    },
                    {
                        group: 'nodes',
                        data: {'id': '川川某公司', 'name': '川川某公司',},
                        classes: 'classes-C',
                        display: 'hide',
                        position: {x: 300, y: 100}
                    },
                    {
                        group: 'nodes',
                        data: {'id': '京京某单位', 'name': '京京某单位',},
                        classes: 'classes-D',
                        position: {x: 300, y: 200}
                    },
                    {
                        group: 'edges',
                        data: {id: 'e0', name: '拥有', source: '小王', target: '鲁A123456'},
                        classes: 'relationB'
                    },
                    {
                        group: 'edges',
                        data: {id: 'e1', name: '拥有', source: '小赵', target: '鲁B123456'},
                        classes: 'relationB'
                    },
                    {
                        group: 'edges',
                        data: {id: 'e2', name: '拥有', source: '小王', target: '鲁C123456'},
                        classes: 'relationA'
                    },
                    {
                        group: 'edges',
                        data: {id: 'e3', name: '拥有', source: '小赵', target: '鲁D123456'},
                        classes: 'relationA'
                    },
                    {group: 'edges', data: {id: 'e4', name: '就职', source: '小王', target: '川川某公司'}, classes: 'relationA'},
                    {group: 'edges', data: {id: 'e5', name: '就职', source: '小赵', target: '川川某公司'}, classes: 'relationA'},
                    {
                        group: 'edges',
                        data: {id: 'e6', name: '租用', source: '川川某公司', target: '鲁A123456'},
                        classes: 'relationA'
                    },
                    {
                        group: 'edges',
                        data: {id: 'e7', name: '租用', source: '川川某公司', target: '鲁B123456'},
                        classes: 'relationA'
                    }
                ]);
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
            }


        },
    }
</script>

<style scoped>


</style>
