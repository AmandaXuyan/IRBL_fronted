<template>
    <div class="projectDetail">
        <div class="toolbar">
            <li>
                <Button>getDetail</Button>
            </li>
            <li>
                <Button @click="updateProject1()" >updateProject</Button>
            </li>

        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "projectDetail",
        components:{

        },
        data(){
            return{
                projectUpdate:{},
            };
        },
        computed:{
            ...mapGetters([
                'currentProjectId',
                'currentProjectDetail'
            ])
        },
        async mounted() {
            await this.getProjectDetailById();
        },
        methods:{
            ...mapMutations([

            ]),
            ...mapActions([
                'getProjectDetailById',
                'updateProject'
            ]),
            jumpToList(){
                this.$router.push({ name: 'projectList'})
            },
            updateProject1(){
                this.updateProject(this.projectUpdate);
            }

        },
    }
</script>

<style scoped>
    .toolbar{
        margin: 0px;
        color: #6a8bad;
        font-size: 18px;
        height: 58px;
        padding-right: 85%;
    }

</style>
