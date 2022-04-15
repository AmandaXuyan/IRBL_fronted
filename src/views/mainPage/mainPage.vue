<template>
    <div class="mainPage">
        <layout2></layout2>
        <div class="scroll-out" style="height: 1000px">
            <!--            <vue-scroll>-->
            <div class="main-content">
                <div class="carousel-intro"
                     style="height:300px;max-width: 100%;position: relative;display: block;margin: auto;">
                    <Carousel autoplay
                              height="300px"
                              v-model="value2"
                              style="z-index: 2"
                              loop>
                        <CarouselItem>
                            <div class="demo-carousel"><img src="../../assets/1.png" style="height: 300px;width: 100%">
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel"><img src="../../assets/1.png" style="height: 300px;width: 100%"></div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel"><img src="../../assets/1.png" style="height: 300px;width: 100%"></div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel"><img src="../../assets/1.png" style="height: 300px;width: 100%"></div>
                        </CarouselItem>
                    </Carousel>
                </div>
                <div class="card-list" style="height:800px">
                    <div class="card-list" style="margin: 20px 0px auto auto;display:inline-block;">
                        <graphCard></graphCard>
                        <graphCard></graphCard>
                        <graphCard></graphCard>
                        <graphCard></graphCard>
                    </div>
                    <div class="card-list" style="margin: 20px 0px auto auto;display:inline-block;">
                        <graphCard></graphCard>
                        <graphCard></graphCard>
                        <graphCard></graphCard>
                        <graphCard></graphCard>
                    </div>
                    <div class="card-list" style="margin: 20px 0px auto auto;display:inline-block;">
                        <graphCard></graphCard>
                        <graphCard></graphCard>

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
    import graphCard from "./components/graph-card"
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "mainPage",
        components: {
            layout2,
            graphCard
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


</style>
