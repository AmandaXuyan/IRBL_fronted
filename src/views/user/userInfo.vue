<template>
    <div class="userInfo">


        <h1>userInfo!</h1>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    export default {
        name: "userInfo",
        components:{

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
