<template>
    <div class="issueDetail">
        <h1>issueDetail!</h1>
        <Button @click="updateIssue1()" >updateIssue</Button>
        <Button @click="getIssueAdvice1()" >getIssueAdvice</Button>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "issueDetail",
        components:{

        },
        data(){
            return{
                updateIssueForm:{
                    title:'',
                    description:'',
                    projectId:'',
                    issueName:''
                }

            };
        },
        computed:{
            ...mapGetters([
                'currentIssueId',
                'issueAdviceList'
            ])
        },
        async mounted() {
        },
        methods:{
            ...mapMutations([

            ]),
            ...mapActions([
                'updateIssue',
                'getIssueAdvice',
            ]),
            jumpToDetail(){
                this.$router.push({ name: 'projectDetail', params: { projectId: this.projectId }})
            },
            updateIssue1(){
                this.updateIssue(this.updateIssueForm);
            },
            getIssueAdvice1(){
                this.getIssueAdvice(this.currentIssueId)
            }
        },
    }
</script>

<style scoped>

</style>
