<template>
    <div class="create-project-file">
        <div class="add-header">
            <span class="add-header-title">Upload File From Local</span>
            <div class="add-header-desccription">
            <span >
                 You can import a existing project from 'github.com' or upload a local project.
            </span>
            </div>
            <Divider style="background-color: #658885"/>
            <div class="choose-tag">
                <div class="add-title-style">
                    <span> Project Tag (Optional)</span>
                    <Input v-model="tag"
                           placeholder="enter project tag..." style="width: 200px;margin-left: 20px"/>
                </div>
                <div class="add-header-desccription" style="margin-bottom: 20px;margin-top: 10px">
            <span >
                 You can judge the project version by project tag.
            </span>
                </div>
            </div>
            <div class="add-first">
                <div class="add-title-style">
                    <span> Upload File</span>
                </div>
                <div class="upload-block" style="margin-top: 20px">
                    <Upload
                            :before-upload="handleUpload"
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0;background-color: #354A51">
                            <Icon type="ios-cloud-upload" size="52" style="color: #DBF5E0;background-color: #354A51"></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload>
                    <div v-if="file !== null" style="margin-top: 5px">
                        <Button type="text" @click="upload" :loading="loadingStatus">
                            {{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button>
                    </div>
                </div>
            </div>
            <!--            <div class="create-header" @click="uploadFile1">-->
            <!--                Upload-->
            <!--            </div>-->
        </div>

    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {message} from "ant-design-vue";

    export default {
        name: "createProjectFile",
        components: {

        },
        props:[],
        data(){
            return{
                id:this.currentProjectId,
                projectUrl:'',
                file: null,
                loadingStatus: false,
                canUpload: false,
                addProjectFileForm:{
                    userId:0,
                    id:0,
                    file:null,
                    tag:null
                },
                tag:'',
            };
        },
        computed:{
            ...mapGetters([
                'userId',
                'currentProjectId',
                'currentProjectDetail',
            ])
        },
        async mounted() {

        },
        methods:{
            ...mapMutations([
                'set_currentProjectId',

            ]),
            ...mapActions([
                'addProjectUrl',
                'addByFile'

            ]),
            jumpToDetail(){
                this.$router.push({ name: 'projectDetail'})
            },
            handleUpload (file) {
                this.file = file;
                const isZIP = (file.type === 'application/zip')|| (file.type === 'application/x-zip-compressed');
                const isLt2M = file.size / 1024 / 1024 < 500;
                if (!isZIP) {
                    this.$message.error('上传文件只能是 ZIP 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 500MB!');
                }
                this.canUpload =isZIP && isLt2M;
                if(!this.canUpload){
                    this.file=null;
                }
                return this.canUpload;

            },
            async upload () {
                this.loadingStatus = true;
                this.addProjectFileForm.file=this.file;
                this.addProjectFileForm.id=this.currentProjectId;
                this.addProjectFileForm.userId=this.userId;
                this.addProjectFileForm.tag=this.tag;
                var mydata = new FormData();
                mydata.append("id",this.currentProjectId);
                mydata.append("file",this.file);
                mydata.append("tag",this.tag);
                console.log(this.addProjectFileForm);
                await this.addByFile(mydata);
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    message.success('Success')
                }, 1500);
                this.$router.push({ name: 'projectDetail'});
            }
        },
    }
</script>

<style scoped>
    .create-project-file{
        margin-left: 140px;
        margin-top: 90px;
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



</style>
