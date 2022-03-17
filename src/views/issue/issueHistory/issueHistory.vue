<template>
    <div class="issueHistory">
        <layout></layout>

        <h1>issueHistory!</h1>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import layout from '../../../components/layout2/layout2'
    export default {
        name: "issueHistory",
        components:{
            layout,
        },
        data(){
            return{

            };
        },
        computed:{
            ...mapGetters([
            ])
        },
        async mounted() {
        },
        methods:{
            ...mapMutations([

            ]),
            ...mapActions([
            ]),
            jumpToDetail(){
                this.$router.push({ name: 'projectDetail', params: { projectId: this.projectId }})
            },
        },
    }
</script>

<style scoped>

</style>
