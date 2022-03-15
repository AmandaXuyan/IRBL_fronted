<template>
<div class="main">

</div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        name: "testForLay",
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

<style  scoped>

</style>
