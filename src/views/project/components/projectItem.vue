<template>
<div class="projectItem" @mouseenter="getProjectInf" @click="jumpToDetail">
    <ListItem class="projectItem-one">
        <ListItemMeta avatar="https://joeschmoe.io/api/v1/random"
                      :title="this.projectName"
                      :description='"description: "+this.projectDescription'
        />
        <template slot="action" >
            <li>
                <a @click="jumpToDetail" style="color: #fff">Edit</a>
            </li>
            <li>
                <a @click="deleteProject1" style="color: #fff">Delete</a>
            </li>
        </template>
    </ListItem>

</div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {Modal} from 'ant-design-vue'

    export default {
        name: "projectItem",
        props:["projectName","projectDescription","id","tags","githubRepoName"],
        data(){
            return{
                allDes:"description:"+this.projectDescription,
            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'currentProjectId',
            ])
        },
        async mounted() {
            this.set_updateProjectPopV(true);

        },
        methods:{
            ...mapMutations([
                'set_currentProjectId',
                'set_panelLeftFirst',
                'set_issueShowVisible',
                'set_updateProjectPopV',

            ]),
            ...mapActions([
                'deleteProject',
                'getProjectList',
                'getProjectDetailById',
                'getFileTree',
                'getIssueList'

            ]),
            async jumpToDetail(){
                await this.set_currentProjectId(this.id);
                this.getProjectDetailById();
                this.set_issueShowVisible(true);
                this.getFileTree(this.id);
                this.getIssueList(this.id);
                this.$router.push({ name: 'projectDetail'})
            },
            deleteProject1(){
                Modal.confirm({
                    title: '删除项目',
                    content: '确认删除该项目？',
                    onOk: () => {
                        this.deleteProject();
                        this.$router.push({ name: 'projectList'})
                    },
                    onCancel: () => {
                        console.log('点击了取消');
                    },
                });

            },
            getProjectInf(){
                this.set_panelLeftFirst(true);
                this.set_currentProjectId(this.id);
                this.getProjectDetailById();
            }

        },
    }
</script>

<style scoped>
    .projectItem{
        right:20px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 15px;
        color: #fff;
        background: #658885;
    }
    .projectItem :hover{
        border: 2px solid #658885;
    }
    .projectItem-one :hover{
        border: 0px;
    }
    .ivu-list-item{
        padding-right: 10px;
        padding-left: 10px;
    }
    .ivu-list-item-meta-content{
        margin-left: 10px;
    }
    .ivu-list-item-meta-title{
        text-align:left;
        color: #354A51;
    }




</style>
