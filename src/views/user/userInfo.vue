<template>
    <div class="userInfo">
        <layout></layout>

        <h1>userInfo!</h1>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import layout from '../../components/layout2/layout2'
    export default {
        name: "userInfo",
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
