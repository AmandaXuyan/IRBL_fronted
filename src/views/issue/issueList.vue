<template>
    <div class="issueList">
        <h1>issueList!</h1>
        <a-layout>
            <a-layout-content style="margin: 0 16px;background: #EBFFEF">
                <div class="tool-bar">

                    <router-link to="/issue/addIssue">
                        <Button @click="addIssue1()" >addIssue</Button>
                    </router-link><router-view/>

                    <Button @click="deleteOneIssue1()" >deleteIssue</Button>

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

    export default {
        name: "issueList",
        components:{

        },
        data(){
            return{
                issueId: 2,
                addIssueInf:{},

            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'issueList',
                'issueListLoading',
                'issueModalVisible',

            ])
        },
        async mounted() {
            await this.getIssueList(this.userId);
        },
        methods:{
            ...mapMutations([
                'set_issueModalVisible'

            ]),
            ...mapActions([
                'addIssue',
                'getIssueList'

            ]),
            jumpToDetail(){
                this.$router.push({ name: 'issueDetail', params: { issueId: this.issueId }})
            },
            addIssue1(){
                this.set_issueModalVisible(true);

            },
            deleteOneIssue1(){

            },
        },
    }
</script>

<style scoped>

</style>
