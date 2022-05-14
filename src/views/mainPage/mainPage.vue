<template>
    <div class="mainPage">
        <layout2></layout2>
        <div class="scroll-out" >
            <!--            <vue-scroll>-->
            <div class="main-content">
                <div class="carousel-intro"
                     style="height:300px;max-width: 100%;position: relative;display: block;margin: auto;border-bottom: 1px #DBF5E0;">
                    <Carousel
                              height="300px"
                              v-model="value2"
                              style="z-index: 2"
                              loop>
                        <CarouselItem>
                            <div class="demo-carousel"><img src="../../assets/head.jpg" style="height: 300px;width: 100%">
                            </div>
                        </CarouselItem>
                    </Carousel>
                </div>
                <div class="card-list">
                    <div class="card-list" style="margin-top: 20px">
                            <a-card hoverable style="width: 350px;margin: 30px;background-color: #658885;display:inline-block;" >
                                <template #cover>
                                    <img
                                            alt="example"
                                            src="../../assets/bugLocate.png"
                                    />
                                </template>
                                <a-card-meta title="缺陷定位" description="提供与缺陷相关的推荐文件列表与可视化图表,帮助开发者快速、准确地通过 issue 和源代码找到与bug相关的代码文件">
                                    <template #avatar>
                                        <Icon type="ios-bug-outline" />
                                    </template>
                                </a-card-meta>
                            </a-card>
                            <a-card hoverable style="width: 350px;background-color: #658885;display:inline-block;margin: 30px;" >
                                <template #cover>
                                    <img
                                            alt="example"
                                            src="../../assets/cutR.png"
                                    />
                                </template>
                                <a-card-meta title="查看issue依赖关系" description="分析开源项目的依赖关系，生成依赖剪枝图与关于开发分支的关键词，帮助开发者更好地理解项目代码">
                                    <template #avatar>
                                        <Icon type="md-git-network" />
                                    </template>
                                </a-card-meta>
                            </a-card>
                            <a-card hoverable style="width: 350px;background-color: #658885;display:inline-block;margin: 30px;" >
                                <template #cover>
                                    <img
                                            alt="example"
                                            src="../../assets/issueRe.png"
                                    />
                                </template>
                                <a-card-meta title="issue重构" description="使用Bee自动识别在线开发平台的自然语言、源代码信息等软件工程文本表达样式，进行提取重构">
                                    <template #avatar>
                                        <Icon type="md-git-compare" />
                                    </template>
                                </a-card-meta>
                            </a-card>
                        </div>

                    </div>
                </div>

            <!--            </vue-scroll>-->
        </div>

    </div>


</template>
<style src="./index.less" lang="less"></style>

<script>
    import layout2 from "../../components/layout2/layout2";
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "mainPage",
        components: {
            layout2,
        },
        data() {
            return {
                value2: 0,

            };
        },
        computed: {
            ...mapGetters([
                'issueRelations'
            ])
        },
        async mounted() {
            // await this.getAllIssueRelation(6);
        },
        methods: {
            ...mapMutations([
            ]),
            ...mapActions([
                'getAllIssueRelation'

            ]),



        },
    }
</script>

<style scoped>
    .footer {
        position: absolute;
        background: #EBFFEF;
        bottom: 0;
        height: 100px;
        line-height: 100px;
        text-align: center;
        width: 80%

    }
    .graph-card{
        margin: 30px;
        display:inline-block;
    }


</style>
