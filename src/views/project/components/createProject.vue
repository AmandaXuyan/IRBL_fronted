<template>
    <div class="create-project">
        <div class="add-header">
            <span class="add-header-title">Create a new project</span>
            <div class="add-header-desccription">
            <span >
                First, creating a new project.
                Then, you can import a existing project from 'github.com' or upload a local project.
            </span>
            </div>
            <Divider style="background-color: #658885"/>
            <div class="add-first">
                <div class="add-title-style" >
                    <span> Project Name</span>
                </div>
                <div class="add-header-desccription" style="margin-bottom: 5px">
            <span >
                Great repository names are short and memorable.
            </span>
                </div>

                <div class="add-input">
                    <Input v-model="projectName"
                           maxlength="30"
                           show-word-limit placeholder=" Enter project name" style="width: 200px" />
                </div>
                <div class="add-title-style">
                    <span> Project Description</span>
                </div>
                <div class="add-input">
                    <Input v-model="projectDescription"
                           type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           style="width: 500px"
                           placeholder="Enter project description"
                    />
                </div>
            </div>
            <div class="create-header" @click="addProject1">
                Create
            </div>
        </div>

    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {Modal} from 'ant-design-vue'
    export default {
        name: "createProject",
        props:[],
        data(){
            return{
                id:this.currentProjectId,
                projectName:'',
                projectDescription:'',
                addProjectForm:{
                    userId:0,
                    projectName:'',
                    projectDescription:'',
                },

            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'currentProjectId',
            ])
        },
        async mounted() {

        },
        methods:{
            ...mapMutations([
                'set_currentProjectId',
                'set_addProjectVisible'
            ]),
            ...mapActions([
                'addProject',


            ]),
            jumpToDetail(){
                this.$router.push({ name: 'projectDetail'})
            },
            addProject1(){
                this.addProjectForm.projectDescription=this.projectDescription;
                this.addProjectForm.projectName=this.projectName;
                this.addProjectForm.userId=this.userId;
                if(this.userId==0){
                    Modal.confirm({
                        title: '请先登陆再创建项目',
                        content: '确定前往登陆？',
                        onOk: () => {
                            this.$router.push({ name: 'loginPage'})
                        },
                        onCancel: () => {
                            console.log('点击了取消');
                        },
                    });
                }else{
                    this.addProject(this.addProjectForm);
                    this.$router.push({ name: 'addProjectUrl'})
                }
                this.set_addProjectVisible(false);

            }

        },

    }
</script>

<style scoped>
    .create-project{
        margin-left: 120px;
        margin-top: 80px;
        margin-right: 100px;
    }
    .add-header-title{
        color: #DBF5E0;
        font-size: 26px;
        font-weight: 400;
        flex: 1 1 auto;

    }
    .add-header-desccription{
        color: #fff;
        font-size: 13px;
        margin-top: 5px;

    }
    .add-title-style{
        color: #DBF5E0;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 5px;
    }
    .add-input{
        margin-bottom: 20px;
    }
    .create-header{
        width: 80px;
        text-align: center;
        margin-left: 5px;
        margin-top: 30px;
    }

</style>
