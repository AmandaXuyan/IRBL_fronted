<template>
    <div class="createProject">
        <layout></layout>
        create!
    </div>
</template>

<script>
    import layout from '../../../components/layout2/layout2'
    import {mapActions, mapGetters, mapMutations} from "vuex";
    export default {
        name: "createPage",
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
            jumpToList(){
                this.$router.push({ name: 'projectList'})
            },

        },
    }
</script>

<style scoped>

</style>
