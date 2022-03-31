<template>
    <div class="create-issue">
        <div class="add-header">
            <div class="add-input">
                <Input v-model="title"
                       placeholder=" Enter issue title" style="width: 450px"/>
                <Button style="margin-left: 20px" @click="addIssue1">Create</Button>
                <Button style="margin-left: 20px" @click="cancelCreate">Cancel</Button>
            </div>
            <div class="markdown">
                <mavon-editor
                        ref="md"
                        placeholder="请输入Issue内容..."
                        :boxShadow="false"
                        toolbarsBackground="#354A51"
                        previewBackground="#354A51"
                        :subfield="false"
                        style="z-index:1;border: 1px solid #d9d9d9;height: 500px"
                        v-model="issueContent"
                        :toolbars="toolbars"
                        :externalLink="false"
                />
            </div>

        </div>

    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {Modal} from 'ant-design-vue'
    import {message} from 'ant-design-vue'

    export default {
        name: "createIss",
        props: [],
        data() {
            return {
                id: this.currentIssueId,
                projectId: this.currentProjectId,
                issueContent: '',
                title: '',
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: false, // 全屏编辑
                    readmodel: false, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: false, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: false, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: false, // 单双栏模式
                    preview: true // 预览
                },
                addIssueForm: {
                    title: '',
                    description: '',
                    projectId: 0,
                    issueName: '',
                    userId:0,
                },

            };
        },
        computed: {
            ...mapGetters([
                'userId',
                'currentProjectId',
                'currentIssueId'
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_currentProjectId',

            ]),
            ...mapActions([
                'addIssue',
            ]),
            jumpToDetail() {
                this.$router.push({name: 'projectDetail'})
            },
            addIssue1() {
                this.addIssueForm.description = this.issueContent;
                this.addIssueForm.issueName = this.issueName;
                this.addIssueForm.userId = this.userId;
                this.addIssueForm.title=this.title;
                this.addIssueForm.projectId=this.currentProjectId;
                if (this.userId === 0) {
                    Modal.confirm({
                        title: '请先登陆再创建Issue',
                        content: '确定前往登陆？',
                        onOk: () => {
                            this.$router.push({name: 'loginPage'})
                        },
                        onCancel: () => {
                            console.log('点击了取消');
                        },
                    });
                } else if(this.addIssueForm.projectId === 0){
                    message.info('请先选择项目再创建Issue')
                }
                else {
                    if(this.title===''){
                        message.info('请输入标题')
                    }else{
                        this.addIssue(this.addIssueForm);
                        this.$router.push({name: 'issueList'});
                    }

                }

            },
            $imgAdd(pos, $file) {
                console.log(pos, $file);
            },
            cancelCreate(){
                Modal.confirm({
                    title: '取消创建Issue',
                    content: '确认取消创建该Issue？',
                    onOk: () => {
                        this.$router.push({ name: 'issueList'})
                    },
                    onCancel: () => {
                        console.log('点击了取消');
                    },
                });
            },

        },
    }
</script>

<style scoped>
    .create-issue {
        margin-left: 120px;
        margin-top: 80px;
        margin-right: 100px;
    }

    .add-input {
        margin-bottom: 20px;
    }

</style>
