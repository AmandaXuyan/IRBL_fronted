import {SelfBuildingSquareSpinner} from "epic-spinners";
<template>
    <div class="projectListPage">
        <div class="page-head">
            <layout></layout>
        </div>

        <a-layout>
        <a-layout-content style="margin: 0 16px;background: #EBFFEF">
            <div class="project-text">我的项目</div>
            <div class="tool-bar">
                <Button @click="addProject1()" >addProject</Button>
                <Button @click="addProjectUrl1()" >addProjectUrl</Button>
                <Button @click="uploadVis()" >addByFile</Button>
                <Button @click="deleteOneProject1()" >deleteProject</Button>
                <Button @click="searchIssue1()" >searchIssue</Button>

            </div>
            <List class="project-list">
                <ListItem class="project-list-item" style="margin: 5px;background: #fff">
                    <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                                  title="This is title"
                                  description="This is description, this is description."
                    />
                    <template slot="action">
                        <li>
                            <Button @click="jumpToDetail(projectId)" >Detail</Button>
                        </li>
                        <li>
                            <Button >getList</Button>
                        </li>
                    </template>
                </ListItem>

            </List>


        </a-layout-content>
        </a-layout>

        <el-dialog
                v-dialogDrag
                :visible="uploadVisible"
                width="40%"
                :modal-append-to-body=false
                @cancel="cancelUpload"
                style="text-align: center">
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
                    multiple
                    :on-change="uploadPrepare"
                    :limit="1"
                    :on-error="uploadError"
                    :file-list="fileList"
                    :auto-upload="true"
                    :before-upload="beforeAvatarUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__text">仅支持zip文件</div>
            </el-upload>
            <el-button type="primary" plain @click="addByFile1()" style="margin-top: 10px">确认上传</el-button>
        </el-dialog>

    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import layout from '../../../components/layout2/layout2'
    export default {
        name: "projectList",
        components:{
            layout
        },
        data(){
            return{
                //todo:改id
                projectId:'',

                fileList:[],
                addProjectForm:{
                    userId:1,
                    projectName:'',
                    projectDescription:'',
                },
                addProjectUrlForm:{
                    userId:1,
                    projectId:1,
                    url:'https://github.com/AmandaXuyan/irbl_fronted.git'
                },
                addProjectFileForm:{
                    userId:1,
                    projectId:1,

                },
                deleteProjectForm:{
                    id:1
                },
                searchIssueForm:{
                    id:1,
                    keywords:"",
                },


            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'token',
                'projectList',
                'projectListLoading',
                'projectModalVisible',
                'uploadVisible',
                'currentProjectId',
            ])
        },
        async mounted() {
            await this.getProjectList(this.userId);

        },
        methods:{
            ...mapMutations([
                'set_projectList',
                'set_ProjectListLoading',
                'set_uploadVisible',
                'set_currentProjectId',
            ]),
            ...mapActions([
                'getProjectList',
                'addProject',
                'addByFile',
                'deleteProject',
                'addProjectUrl',
                'searchIssue'

            ]),
            jumpToDetail(){
                this.set_currentProjectId(this.projectId);
                this.$router.push({ name: 'projectDetail', params: { projectId: this.projectId }})
            },
            addProject1(){
                this.addProject(this.addProjectForm);
            },
            addProjectUrl1(){
                this.addProjectUrl(this.addProjectUrlForm)
            },
            /**
             *
             */
            uploadVis(){
                this.set_uploadVisible(true);
            },
            cancelUpload(){
                this.set_uploadVisible(false);
            },
            addByFile1(){
                this.addByFile(this.addProjectFileForm);
                this.set_uploadVisible(false);
            },
            deleteProject1(){

            },
            uploadPrepare(file, list) {
                this.fileList = list;
            },
            uploadExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeAvatarUpload(file) {
                const isZIP = file.type === 'application/zip';
                const isLt2M = file.size / 1024 / 1024 < 500;

                if (!isZIP) {
                    this.$message.error('上传文件只能是 ZIP 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 500MB!');
                }
                return isZIP && isLt2M;
            },
            uploadError(error) {
                console.log("here"+error)

            },
            /**
             *
             */
            deleteOneProject1(){
                this.deleteProject(this.deleteProjectForm);
            },
            searchIssue1(){
                this.searchIssue(this.searchIssueForm)
            }

        },
    }
</script>

<style scoped>
    .project-text{
        margin: 0px;
        color: #6a8bad;
        font-size: 18px;
        height: 58px;
        padding-right: 85%;
    }





</style>
