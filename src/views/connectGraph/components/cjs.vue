<template>
    <div style="position: relative; height: 100%; width: 100%; z-index: 1;">
        <div id="cytoscape_id" style="height: 85%; width: 100%; z-index: 2;"></div>
        <div id="cytoolgraph_id" style="position: absolute; left: 5pt; top: 5pt; z-index: 2; background-color: #354A51;">
            <div>
                <RadioGroup v-model="graph" @on-change="changeTo">
                    <Radio label="1">
                        <span>graph1</span>
                    </Radio>
                    <Radio label="2">
                        <span>graph2</span>
                    </Radio>
                </RadioGroup>
            </div>
        </div>
        <div id="cytoolbar_id" style="position: absolute; left: 125pt; top: 5pt; z-index: 2; background-color: #658885;">
            <div class="tools">
                <div class="center-center">
                    <Icon style="font-size: 32px; cursor: pointer;" title="剪枝" type="ios-cut-outline"
                          @click="cutGraphShow"/>
                </div>
            </div>
            <div class="tools">
                <div class="center-center">
                    <Icon style="font-size: 32px; cursor: pointer;" title="放大" type="ios-add-circle-outline"
                          @click="magnifying()"/>
                </div>
            </div>
            <div class="tools">
                <div class="center-center">
                    <Icon style="font-size: 32px; cursor: pointer;" title="缩小" type="ios-remove-circle-outline"
                          @click="contractible()"/>
                </div>
            </div>
            <div class="tools">
                <div class="center-center">
                    <Icon style="font-size: 32px; cursor: pointer;" title="合适大小" type="ios-resize" @click="resize()"/>
                </div>
            </div>
            <div class="tools">
                <div class="center-center">
                    <Icon style="font-size: 32px; cursor: pointer;" title="高亮邻居" type="ios-color-wand-outline"
                          @click="highlight()"/>
                </div>
            </div>
            <div class="tools">
                <div class="center-center">
                    <Icon style="font-size: 32px; cursor: pointer;" title="刷新布局" type="ios-sync"
                          @click="refresh({name: 'cola'})"/>
                </div>
            </div>
            <div class="tools">
                <div class="center-center">
                    <Icon style="font-size: 32px; cursor: pointer;" title="网格布局" type="ios-apps-outline"
                          @click="refresh({name: 'grid'})"/>
                </div>
            </div>
            <div class="tools">
                <div class="center-center">
                    <Icon style="font-size: 32px; cursor: pointer;" title="环形布局" type="ios-globe-outline"
                          @click="refresh({name: 'circle'})"/>
                </div>
            </div>
        </div>
        <div class="tips" style="z-index: 3;position: absolute; left: 5pt; top: 50pt" v-if="!issueCardVisible">
            <span style="color: #42b983">💡You can long press the node to get more information.</span>
        </div>
        <div class="issue-cards" v-if="issueCardVisible">
            <Card style="width:400px;z-index: 3;position: absolute; left: 5pt; top: 50pt">
                <p slot="title">
                    <Icon type="ios-bug-outline"/>
                    Issue Detail
                </p>
                <a href="#" slot="extra" @click.prevent="closeIssue">
                    <Icon type="ios-close"/>
                </a>
                <div class="card-content" style="height: 400px">
                    <span>{{this.relationIssueInf.title}}</span>
                    <div class="markdown1" style="margin-top: 10px">
                        <mavon-editor
                                :value="this.relationIssueInf.description"
                                defaultOpen="preview"
                                :boxShadow="false"
                                previewBackground="#354A51"
                                style="z-index:1;height:350px;border: 1px solid #d9d9d9;color: #fff"
                                :editable="false"
                                :subfield="false"
                                :toolbarsFlag="false"
                                :externalLink="false"
                        >
                        </mavon-editor>
                    </div>

                </div>

            </Card>
        </div>
    </div>
</template>

<script>
    import cytoscape from 'cytoscape';
    import cxtmenu from 'cytoscape-cxtmenu';
    import cola from 'cytoscape-cola';
    import avsdf from 'cytoscape-avsdf';
    import coseBilkent from 'cytoscape-cose-bilkent';
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "CJS",
        components: {},
        beforeCreate() {
            this.$cy && this.$cy.destroyed() && this.$cy.destroy();
            delete this.$cy;
        },
        beforeDestroy() {
            this.$cy && this.$cy.destroyed() && this.$cy.destroy();
            delete this.$cy;
        },
        watch: {},
        props: {},
        mounted() {
            if(this.graphNumber==="1"){
                this.graph="1";
            }else{
                this.graph="2";
            }
            this.set_issueCardVisible(false);
            this.set_relationIssueInf(null);
            // Cxtmenu圆形菜单主要依赖组件
            if (!cytoscape().cxtmenu) {
                cytoscape.use(cxtmenu);
                cytoscape.use(cola);
                cytoscape.use(avsdf);
                cytoscape.use(coseBilkent);
            }
            this.$cy = cytoscape({
                // initial viewport state:
                zoom: 1,
                pan: {x: 0, y: 0},
                minZoom: 1e-50,
                maxZoom: 1e50,
                zoomingEnabled: true,
                userZoomingEnabled: true,
                panningEnabled: true,
                userPanningEnabled: true,
                boxSelectionEnabled: true,
                selectionType: 'single',
                touchTapThreshold: 8,
                desktopTapThreshold: 4,
                autolock: false,
                autoungrabify: false,
                autounselectify: false,
                headless: false,
                styleEnabled: true,
                hideEdgesOnViewport: true,
                hideLabelsOnViewport: true,
                textureOnViewport: true,
                motionBlur: true,
                motionBlurOpacity: 0.2,
                wheelSensitivity: 0.3,
                pixelRatio: 'auto',
                container: document.getElementById('cytoscape_id'),
                // 一个指定布局选项的普通对象.
                layout: {name: 'random'},
            });
            // Cxtmenu圆形菜单--开始
            this.$cy.cxtmenu({
                menuRadius: 80,
                selector: 'node',
                // eslint-disable-next-line no-unused-vars
                commands: (element) => {
                    return [
                        {
                            fillColor: 'rgba(200, 200, 200, 0.75)',
                            content: '<span class="fa fa-flash fa-2x">Detail</span>',
                            contentStyle: {},
                            select: (ele) => this.getIssueInf([ele.id()]),
                            enabled: true,
                        },

                        {
                            content: 'Highlight',
                            select: (ele) => this.lightOn([ele.id()]),
                            enabled: true,
                        },
                    ]
                },
                fillColor: '#658885', activeFillColor: '#49A8AC',
                activePadding: 10, indicatorSize: 14,
                separatorWidth: 4, spotlightPadding: 10,
                minSpotlightRadius: 10, maxSpotlightRadius: 14,
                openMenuEvents: 'cxttapstart taphold',
                itemColor: 'white', itemTextShadowColor: '#354A51',
                zIndex: 9999, atMouse: true,
            });
            //Cxtmenu圆形菜单--结束
            // 不同节点的样式
            this.$cy
                .style()
                .selector('.issue')
                .css({
                    'background-color': '#49A8AC',
                    'content': 'data(name)',
                    'border-color': '#49A8AC',
                    'border-width': "5px",
                    'color': '#DBF5E0',
                    'font-size': '10pt',
                })
                .selector('.word')
                .css({
                    'background-color': '#77c94f',
                    'content': 'data(name)',
                    'border-color': '#77c94f',
                    'border-width': "6px",
                    'target-endpoint':'inside-to-node',
                    'color': '#fcb16f',
                    'shape':'star',
                    'font-size': '16pt',

                })
                // // .style({'background-color': '#00FF00', 'border-color': '#00FF00', 'border-width': "1px",})
                .selector('.relation')
                .css({
                    'target-arrow-color': '#999999', /*箭头颜色*/
                    'curve-style': 'bezier', /*线条样式曲线*/
                    'line-color': '#999999', /*线条颜色*/
                    'width': '1px', /*线条宽度*/
                    'label': '',
                })
                .selector('.relation2')
                .css({
                    'target-arrow-color': '#999999', /*箭头颜色*/
                    'curve-style': 'unhundled-bezier', /*线条样式曲线*/
                    'line-style':'dashed',
                    'line-color': '#999999', /*线条颜色*/
                    'line-dash-offset': '1',
                    'width': '1px', /*线条宽度*/
                    'label': 'data(name)',
                })
            ;
            // 通用的样式
            this.$cy.style()
                /*未选择节点样式*/
                .selector('node')
                .style({
                    'label': 'data(name)',
                    'width': '8pt',
                    'height': '8pt',

                })
                /*已选择节点样式*/
                .selector('node:selected')
                .style({'border-color': '#c84e40', 'border-width': "1px",})
                /*未选择节点样式*/
                .selector('edge')
                .style({
                    'target-arrow-shape': 'none', /*箭头样式*/
                    'target-arrow-size': '1px', /*箭头大小*/
                    'target-arrow-color': '#999999', /*箭头颜色*/
                    'curve-style': 'bezier', /*线条样式曲线*/
                    'line-color': '#999999', /*线条颜色*/
                    'width': '1px', /*线条宽度*/
                    'font-size': '10px', /*标签字体大小*/
                    'color': '#658885', /*标签字体颜色*/
                    'text-outline-color': 'white', /*文本轮廓颜色*/
                    'text-outline-width': '1px', /*文本轮廓宽度*/
                    'text-rotation': 'autorotate', /*标签方向*/
                })
                /*已选择节点样式*/
                .selector('edge:selected')
                .style({
                    'color': '#3165fc', /*标签字体大小*/
                    'target-arrow-color': '#61bffc', /*箭头颜色*/
                    'line-color': '#61bffc', /*线条颜色*/
                })
                /*高亮样式*/
                .selector('.light-off')
                .style({'opacity': '0.1',})
            ;
        },
        data() {
            return {
                graph:'1',
                isCut:false,
            }
        },
        computed: {
            ...mapGetters([
                'relationIssueInf',
                'issueCardVisible',
                'keywordsEle',
                'currentProjectId',
                'highlightList',
                'highlightEdgeList',
                'graphNumber'

            ])
        },
        methods: {
            ...mapMutations([
                'set_currentIssueId',
                'set_relationIssueInf',
                'set_issueCardVisible',
                'set_graphNumber',
                'set_keywordsEle'
            ]),
            ...mapActions([
                'relationGetIssueDetailById',
                'getKeywords',
                'getHighlightList',
                'getAllIssueRelation'
            ]),

            /**
             * eles : Array or Map.
             * node_eg: {group: 'nodes', data: {id: 'nid1', name: 'name1', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
             * edge_eg: {group: 'edges', data: {id: 'eid1', name: 'name1', source: 'A', target: 'B', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
             * node_eg: [
             *   {group: 'nodes', data: {id: 'nid1', name: 'name1', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
             *   {group: 'nodes', data: {id: 'nid2', name: 'name2', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
             * ];
             * edge_eg: [
             *   {group: 'edges', data: {id: 'eid1', name: 'name1', source: 'nid1', target: 'nid2', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
             *   {group: 'edges', data: {id: 'eid2', name: 'name1', source: 'nid2', target: 'nid3', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
             * ];
             * @param eles 元素集合.
             */

            /**
             * 增加节点
             */
            addEles(eles) {
                if (eles) {
                    this.$cy.startBatch();
                    this.$cy.batch(() => {
                        let elements = ((Array.isArray ? Array.isArray(eles) : null != eles && eles instanceof Array) ? eles : [eles]);
                        let filterElements = elements.filter(__ => !this.$cy.getElementById(__.data.id).length);
                        this.$cy.add(filterElements);
                        this.refresh();
                    });
                    this.$cy.endBatch();
                }
            },
            /**
             * 删除选择的内容(可能是顶点, 也可能是关系)
             */
            delEles() {
                this.$cy.startBatch();
                this.$cy.batch(() => {
                    let selectedEles = this.$cy.elements(':selected');
                    // 未选择不进行操作
                    if (!selectedEles || 1 > selectedEles.length) {
                        return false;
                    }
                    selectedEles.remove();
                });
                this.$cy.endBatch();
            },
            /**
             *  展示issue具体内容
             **/
            async getIssueInf(ele) {
                let element = this.$cy.getElementById(ele);
                let id = element.data().id;
                await this.set_currentIssueId(id);
                await this.relationGetIssueDetailById();
            },
            closeIssue() {
                this.set_relationIssueInf(null);
                this.set_issueCardVisible(false);
            },
            /**
             * todo: 获得剪枝图，高亮，并显示关键词
             **/
            async cutGraphShow(){
                if(!this.isCut){
                    //获取关键词，点的class为.word；边的class为.relation2
                    await this.getKeywords(this.currentProjectId);
                    await this.cutLightOn();
                    // this.set_keywordsEle(null);
                    this.isCut=true;
                }else{
                    this.cutLightOff();
                    this.isCut=false;
                    this.$router.replace({
                        path:'/supplierAll3',
                        name:'supplierAll3'
                    })
                }



            },
            cutLightOff(){
                this.$cy.startBatch();
                this.$cy.batch(() => {
                    this.$cy.elements().removeClass("light-off") /*移除样式*/;

                });
                this.$cy.endBatch();
            },
            /**
             * todo: 高亮.
             * @param ele 某元素ID
             * elements是需要高亮的id的list，如['108','111']，那点和边的id会有一样的吗
             */
            async cutLightOn() {
                this.$cy.startBatch();
                this.$cy.batch(() => {
                    this.$cy.elements().addClass("light-off"); //*添加样式*/
                    let elements = this.highlightList;
                    //获得要高亮的3个array
                    elements.forEach(__ => {
                        this.$cy.getElementById(__).removeClass("light-off");

                    });
                    for (var i in this.highlightEdgeList){
                        console.log(this.highlightEdgeList[i]);
                        this.$cy.edges(this.highlightEdgeList[i]).removeClass("light-off");
                    }
                    // this.$cy.edges('edge[source="99"][target="100"]').removeClass("light-off");

                });
                this.$cy.endBatch();
                await this.addEles(this.keywordsEle);
            },

            async changeTo(data){
                console.log(data);
                if (data==="1"){
                    await this.set_graphNumber('1');
                }else{
                    await this.set_graphNumber('2');
                }
                await this.getAllIssueRelation(this.currentProjectId);
                this.$router.replace({
                    path:'/supplierAll3',
                    name:'supplierAll3'
                })
            },

            /***************************工具栏************************/
            /**
             * 缩放大小.
             * @param zoom 增减幅度.
             */
            zoom(zoom) {
                /** 获取已选择内容 */
                let selectedEles = this.$cy.elements('node:selected');
                let selectedEle = selectedEles && selectedEles.length ? selectedEles[0] : null;
                let pan = this.$cy.pan();
                let [x, y] = selectedEle ? [selectedEle.position('x'), selectedEle.position('y')] : [pan.x, pan.y];
                let level = this.$cy.zoom() + zoom;
                (level > this.$cy.maxZoom) && (level = this.$cy.maxZoom);
                (level < this.$cy.minZoom) && (level = this.$cy.minZoom);
                this.$cy.zoom({level: level, renderedPosition: {x: x, y: y}});
            },
            /** 放大 */
            magnifying() {
                this.zoom(0.3);
            },
            /** 缩小 */
            contractible() {
                this.zoom(-0.3);
            },
            /** 合适大小 */
            resize() {
                this.$cy.fit();
            },
            /**
             * 高亮.
             * @param ele 某元素ID
             */
            lightOn(ele) {
                this.$cy.startBatch();
                this.$cy.batch(() => {
                    this.$cy.elements().addClass("light-off"); //*添加样式*/
                    let elements = ((Array.isArray ? Array.isArray(ele) : null != ele && ele instanceof Array) ? ele : [ele]);
                    elements.forEach(__ => {
                        this.$cy.getElementById(__).removeClass("light-off");
                        this.$cy.getElementById(__).neighborhood().removeClass("light-off");
                    });
                });
                this.$cy.once('click', () => this.lightOff());
                this.$cy.endBatch();
            },
            /**
             * 取消高亮.
             */
            lightOff() {
                this.$cy.startBatch();
                this.$cy.batch(() => this.$cy.elements().removeClass("light-off") /*移除样式*/);
                this.$cy.endBatch();
            },
            /** 高亮邻居 */
            highlight() {
                /** 获取已选择内容 */
                let selectedEles = this.$cy.elements('node:selected');
                /** 获取已选择内容中得第一个, 没有选择为null */
                let selectedEle = selectedEles && selectedEles.length ? selectedEles[0] : null;
                (selectedEle) && (this.lightOn(selectedEle.id()));
            },
            /**
             * 刷新布局.
             * name取值范围:
             * ['grid', 'circle', 'cola', 'avsdf', 'cose-bilkent', ]
             * @param {name = 'cola......', randomize = true | false, animate = true | false}
             */
            refresh({name = 'cola', randomize = false, animate = true} = {}) {
                this.$cy.layout({name: name, randomize: randomize, animate: animate,}).run();
            },
            /***************************工具栏************************/
        },
    }
</script>
<style scoped>
    .tools {
        display: inline-block;
        height: 45px;
        width: 45px;
        vertical-align: middle;
    }

    .center-center {
        height: 100%;
        display: flex;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
    }
</style>

