<template>
    <div class="layoutPage">
        <h1>logoutPage!</h1>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "logoutPage",
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
