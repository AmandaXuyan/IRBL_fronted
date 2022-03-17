<template>
    <div class="issueList">
        <layout></layout>
        <h1>issueList!</h1>
        <a-layout>
            <a-layout-content style="margin: 0 16px;background: #EBFFEF">
                <div class="tool-bar">
                    <Button @click="addIssue1()" >addIssue</Button>
                    <Button @click="deleteIssue1()" >deleteIssue</Button>


                </div>
                <List class="project-list">
                    <ListItem class="project-list-item" style="margin: 5px;background: #fff">
                        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                                      title="This is title"
                                      description="This is description, this is description."
                        />
                        <template slot="action">
                            <li>
                                <Button @click="jumpToDetail(issueId)" >Detail</Button>
                            </li>
                            <li>
                                <Button >getList</Button>
                            </li>
                        </template>
                    </ListItem>

                </List>


            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import layout from '../../../components/layout2/layout2'
    export default {
        name: "issueList",
        components:{
            layout
        },
        data(){
            return{
                issueId: 2,
                addIssueInf:{},
                issueForm:{
                    projectId:2,
                },
                addIssueForm:{
                    title:'',
                    description:'',
                    projectId:'',
                    issueName:''
                },
            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'issueList',
                'currentProjectId',
                'issueListLoading',
                'issueModalVisible',


            ])
        },
        async mounted() {
            await this.getIssueList(this.currentProjectId);
        },
        methods:{
            ...mapMutations([
                'set_issueModalVisible'

            ]),
            ...mapActions([
                'addIssue',
                'getIssueList',
                'deleteIssue',


            ]),
            jumpToDetail(){
                this.$router.push({ name: 'issueDetail', params: { issueId: this.issueId }})
            },
            addIssue1(){
                this.$router.push({ name: 'createIssue',});
                this.addIssue(this.addIssueForm);
                // this.set_issueModalVisible(true);

            },
            deleteIssue1(){
                this.deleteIssue(this.deleteIssueForm);

            },

        },
    }
</script>

<style scoped>

</style>
