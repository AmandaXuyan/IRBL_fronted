<template>
    <div class="graph-card">
        <a-card hoverable style="width: 250px;background-color: #658885" @click="jumpToGraph">
            <template #cover>
                <img
                        alt="example"
                        :src=imgSrc
                />
            </template>
            <template #actions>
                <Icon type="ios-bug-outline" />
                <Icon type="ios-bulb-outline" />

            </template>
            <a-card-meta :title=cardTitle :description=cardDes>
                <template #avatar>
                <Icon type="md-git-network" />
                </template>
            </a-card-meta>
        </a-card>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    export default {
        name: "graph-card",
        components: {


        },
        props: {
            cardTitle: {
                type: String,
                default: 'card title'
            },
            cardDes: {
                type: String,
                default: 'card description'
            },
            imgSrc: {
                type: String,
                default: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
            },
            graphId: {
                type: String,
                default: 'graphId'
            },

        },
        data() {
            return {

            };
        },

        computed: {
            ...mapGetters([
                'currentGraph'
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_currentGraph',
            ]),
            ...mapActions([]),
            jumpToGraph() {
                this.set_currentGraph(this.graphId);
                this.$router.push({name: 'connectDetail'})

            },

        },
    };

</script>

<style scoped>
    .graph-card{
        margin: 30px;
        display:inline-block;
    }


</style>
