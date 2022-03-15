<template>
    <div class="issue-md-editor">

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";


    export default {
        name: "issueModal",
        components:{

        },
        data(){
            return{
                text: '',
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


        },
    }
</script>


<style scoped>

</style>
