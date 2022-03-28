<template>
    <div class="markdown">
        <div class="create-issue">
            <div class="add-header">
                <div class="show" v-if="!this.issueEditVisible">
                <div class="add-input">
                    <Input v-model="this.currentIssueDetail.title"
                           disabled
                           style="width: 500px"/>
                    <Button style="margin-left: 40px" @click="toUpdateIssue1" >Edit</Button>
                </div>
                <div class="markdown">
                    <mavon-editor
                            :value="this.currentIssueDetail.description"
                            defaultOpen="preview"
                            :boxShadow="false"
                            previewBackground="#354A51"
                            style="z-index:1;height:50vh;border: 1px solid #d9d9d9;color: #fff"
                            :editable="false"
                            :subfield="false"
                            :toolbarsFlag="false"
                            :externalLink="false"
                    >
                    </mavon-editor>
                </div>
                </div>
                <div class="edit" v-if="this.issueEditVisible">
                    <div class="add-input">
                        <Input v-model="title"
                               maxlength="100"
                               show-word-limit
                               :placeholder=" this.currentIssueDetail.title" style="width: 450px"/>
                        <Button style="margin-left: 20px" @click="saveIssue">Save</Button>
                        <Button style="margin-left: 20px" @click="cancelUpdate">Cancel</Button>
                    </div>
                    <div class="markdown">
                        <mavon-editor
                                ref="md1"
                                placeholder="请输入Issue内容..."
                                :boxShadow="false"
                                toolbarsBackground="#354A51"
                                :subfield="false"
                                style="z-index:1;border: 1px solid #d9d9d9;height: 500px"
                                v-model="this.currentIssueDetail.description"
                                :toolbars="toolbars"
                                :externalLink="false"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {Modal} from "ant-design-vue";

    export default {
        name: "issueDetailShow",
        components: {},
        data() {
            return {
                title:'',
                updateIssueForm: {
                    id: '',
                    title: '',
                    description: '',
                    projectId: '',
                    issueName: ''
                },
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
                    fullscreen: true, // 全屏编辑
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

            };
        },
        computed: {
            ...mapGetters([
                'currentIssueDetail',
                'currentIssueId',
                'issueEditVisible',

            ])
        },
        async mounted() {
        },
        methods: {
            ...mapMutations([
                'set_issueEditVisible'
            ]),
            ...mapActions([
                'updateIssue',
                'getIssueDetailById',
                'getIssueList'
            ]),

            saveIssue() {
                Modal.confirm({
                    title: '确定保存',
                    content: '确认对Issue进行修改？',
                    onOk: () => {
                        this.currentIssueDetail.description=this.$refs.md1.d_value;
                        this.currentIssueDetail.title=this.title;
                        this.updateIssue(this.currentIssueDetail);
                        this.getIssueList(this.currentIssueDetail.projectId);
                        this.set_issueEditVisible(false);
                        // this.$router.push({ name: 'issueList'})
                    },
                    onCancel: () => {
                        console.log('点击了取消');
                    },
                });
            },
            toUpdateIssue1(){
                this.set_issueEditVisible(true);
            },
            cancelUpdate(){
                this.set_issueEditVisible(false);
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

    .add-header-title {
        color: #DBF5E0;
        font-size: 26px;
        font-weight: 400;
        flex: 1 1 auto;

    }

    .add-header-desccription {
        color: #fff;
        font-size: 13px;

    }

    .add-title-style {
        color: #DBF5E0;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 5px;
    }

    .add-input {
        margin-bottom: 20px;
    }

    .create-header {
        width: 80px;
        text-align: center;
        margin-left: 5px;
        margin-top: 30px;
    }

</style>
