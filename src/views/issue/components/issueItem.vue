<template>
    <div class="issueItem" @mouseenter="getIssueInf" @click="jumpToDetail" >
        <ListItem class="issueItem-one">
            <ListItemMeta :title="this.title"/>
            <Icon type="ios-trash-outline"  @click="deleteIssue1"/>
        </ListItem>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {Modal} from 'ant-design-vue'
    export default {
        name: "issueItem",
        props:["issueName","description","projectId","id","title"],
        data(){
            return{
            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'currentProjectId',
                'currentIssueId',
                'issueList',
                'pageName'
            ])
        },
        async mounted() {
            this.set_currentProjectId(this.projectId);
        },
        methods:{
            ...mapMutations([
                'set_currentProjectId',
                'set_panelLeftFirst',
                'set_currentIssueId',
                'set_pageName'
            ]),
            ...mapActions([
                'deleteIssue',
                'getIssueList',
                'getIssueDetailById',

            ]),
            jumpToDetail(){
                // this.set_currentProjectId(this.projectId);
                this.set_currentIssueId(this.id);
                this.getIssueDetailById(this.id);
                if(this.pageName!=1){
                    this.set_pageName(1);
                }
                // this.$router.push({ name: 'issueDetail'})
            },
            async deleteIssue1(){
                this.$router.push({ name: 'issueDetail'})
                Modal.confirm({
                    title: '删除Issue',
                    content: '确认删除该Issue？',
                    onOk: () => {
                        this.dele();
                        this.$router.push({ name: 'issueList'})
                    },
                    onCancel: () => {
                        console.log('点击了取消');
                    },
                });
                this.getIssueList(this.currentProjectId);
                // this.$router.push({ name: 'issueList'})

            },
            getIssueInf(){
                this.set_panelLeftFirst(true)
                // this.set_currentProjectId(this.projectId)
                this.set_currentIssueId(this.id)
            },
            async dele(){
                await this.deleteIssue();
            }

        },
    }
</script>

<style scoped>
    .issueItem{
        color: #fff;

    }
    .issueItem :hover{
        /*border: 2px solid #658885;*/
        background: #658885;

    }
    .issueItem-one :hover{
        border: 0px;
    }

    .ivu-list-item-meta-content{
        margin-left: 10px;
    }
    .ivu-list-item-meta-title{
        text-align:left;
        font-size: 12px;
        font-weight: 200;
        color: #354A51;
        line-height: 16px;
    }
    .ivu-list-item{
        padding:4px 0;
    }


</style>
