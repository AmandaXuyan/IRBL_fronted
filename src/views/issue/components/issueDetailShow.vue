<template>
    <div class="markdown">
        <div class="create-issue">
            <div id="tool-bar" style=" position: absolute; right: 100pt;top:10pt;margin-top: 30px; z-index: 2; "
                 v-if="!this.issueEditVisible">
                <div class="tools">
                    <div class="center-center">
                        <Button @click="toUpdateIssue1">Edit</Button>
                    </div>
                </div>
                <div class="tools">
                    <div class="center-center">
                        <Button @click="toAdviceIssue1">Advice</Button>
                    </div>
                </div>
                <div class="tools">
                    <div class="center-center">
                        <Button @click="writeBackSingle1">Write Back</Button>
                    </div>
                </div>
                <div class="tools">
                    <div class="center-center">
                        <Button @click="BugLocate1">Bug Locate</Button>
                    </div>
                </div>
                <div class="tools">
                    <div class="center-center">
                        <Button @click="deleteIssue1">Delete</Button>
                    </div>
                </div>
            </div>
            <div class="add-header" style="margin-top: 80px;height: 650px">
                <vue-scroll>
                <div class="show" v-if="!this.issueEditVisible">
                    <div class="add-input">
                        <Input v-model="this.currentIssueDetail.title"
                               disabled
                               style="width: 600px"/>
                    </div>
                    <div class="markdown">
                        <mavon-editor
                                :value="this.currentIssueDetail.description"
                                defaultOpen="preview"
                                :boxShadow="false"
                                previewBackground="#354A51"
                                style="z-index:1;height:auto;border: 1px solid #d9d9d9;color: #fff"
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
                               :placeholder=" this.currentIssueDetail.title" style="width: 600px"/>
                        <Button style="margin-left: 20px" @click="saveIssue">Save</Button>
                        <Button style="margin-left: 20px" @click="cancelUpdate">Cancel</Button>
                    </div>
                    <div class="markdown">
                        <mavon-editor
                                ref="md1"
                                placeholder="请输入Issue内容..."
                                :boxShadow="false"
                                toolbarsBackground="#354A51"
                                previewBackground="#354A51"
                                :subfield="false"
                                style="z-index:1;border: 1px solid #d9d9d9;height: 500px"
                                v-model="this.currentIssueDetail.description"
                                :toolbars="toolbars"
                                :externalLink="false"
                        />
                    </div>
                </div>
                </vue-scroll>
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
                title: '',
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
                'bugLocationList',

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
                'getIssueList',
                'getIssueAdvice',
                'writeBackSingle',
                'getBugLocation',
                'deleteIssue'
            ]),

            saveIssue() {
                Modal.confirm({
                    title: '确定保存',
                    content: '确认对Issue进行修改？',
                    onOk: () => {
                        this.currentIssueDetail.description = this.$refs.md1.d_value;
                        this.currentIssueDetail.title = this.title;
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
            toUpdateIssue1() {
                this.set_issueEditVisible(true);
            },
            cancelUpdate() {
                this.set_issueEditVisible(false);
            },
            async BugLocate1() {
                await this.getBugLocation(this.currentIssueId);
                await this.$router.push({name: 'bugLocation'})

            },
            async writeBackSingle1() {
                await this.writeBackSingle(this.currentIssueId);
            },
            async toAdviceIssue1(){
                await this.getIssueAdvice(this.currentIssueId);
            },
            async deleteIssue1(){
                this.$router.push({ name: 'issueDetail'});
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
            async dele(){
                await this.deleteIssue();
            }

        },
    }
</script>

<style scoped>
    .create-issue {
        margin-left: 120px;
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

    .tools {
        display: inline-block;
        height: 40px;
        width: auto;
        vertical-align: middle;
    }

    .center-center {
        height: 100%;
        display: flex;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
        margin-left: 20px;
    }

</style>
