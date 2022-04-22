<template>
    <div class="advice-confirm">

        <div class="add-header-title" style="margin-top: 30px">
            <span style="margin-left: 30px;margin-right: 20px">Issue Title:</span>
            <span style="font-size: 17px;font-weight: 500">{{this.currentIssueDetail.title}}</span>

        </div>
        <div class="add-header-desccription" style="margin-left: 30px;margin-top: 15px">
            <span style="color: #42b983"> 🔧This is the issue refactored by the tool Bee. If you are satisfied with the refactored content, you can click here to update the issue content.</span>
            <Icon type="ios-archive" style="margin-left: 10px;cursor: pointer" @click="updateIssue1"/>
            <div></div>
            <span style="color: #42b983"> 🔧Not satisfied with the result？ Click here to return.</span>
            <Icon type="ios-backspace" style="margin-left: 10px;cursor: pointer" @click="returnBack"/>
        </div>
        <div style="margin-top: 5px">
        <rs-panes split-to="columns"
                  :allow-resize="true"
                  :size=this.split
                  :min-size=this.minSize
                  class="panes-wrap">
            <div slot="firstPane" class="first-pane" style="width: 100%;text-align: left">
                <div class="add-header" style="margin-top: 30px;height: 650px">
                    <div class="add-header-title" style="margin-top: 30px">
                        <span style="margin-left: 30px;margin-right: 20px;margin-bottom: 10px"> </span>
                    </div>
                    <vue-scroll>
                        <div class="show" style="margin-left: 10px;">
                            <div class="markdown">
                                <mavon-editor
                                        :value="this.currentIssueDetail.description"
                                        defaultOpen="preview"
                                        :boxShadow="false"
                                        previewBackground="#354A51"
                                        style="z-index:1;width: 380px;height:auto;border: 1px solid #d9d9d9;color: #fff"
                                        :editable="false"
                                        :subfield="false"
                                        :toolbarsFlag="false"
                                        :externalLink="false"
                                >
                                </mavon-editor>
                            </div>
                        </div>
                    </vue-scroll>
                </div>
            </div>
            <div slot="secondPane" class="second-pane" ref="element"
                 style="padding-right: 70px;width: 100%;text-align: left;">

                <div class="add-header" style="margin-top: 30px;height: 650px">
                    <div class="add-header-title" style="margin-top: 30px">
                        <span style="margin-left: 30px;margin-right: 20px;font-size:18px;margin-bottom: 10px">Adviced : </span>
                    </div>
                    <vue-scroll>
                        <div class="show" style="margin-left: 20px">
                            <div class="markdown">
                                <mavon-editor
                                        :value="this.issueAdviceList[0]"
                                        defaultOpen="preview"
                                        :boxShadow="false"
                                        previewBackground="#354A51"
                                        style="z-index:1;width: 655px;height:auto;border: 1px solid #d9d9d9;color: #fff"
                                        :editable="false"
                                        :subfield="false"
                                        :toolbarsFlag="false"
                                        :externalLink="false"
                                >
                                </mavon-editor>
                            </div>
                        </div>
                    </vue-scroll>
                </div>

            </div>
        </rs-panes>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        name: "adviceConfirm",
        components: {

        },
        data() {
            return {
                split:400,

            };
        },
        computed: {
            ...mapGetters([
                'size',
                'minSize',
                'currentIssueDetail',
                'issueAdviceList'
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_addProjectVisible',
                'set_adviceVisible'
            ]),
            ...mapActions([
                'updateIssue',
                ]),
            async updateIssue1(){
                let update=this.currentIssueDetail;
                update.description=this.issueAdviceList[0];
                update.title=update.title+"(adviced)";
                await this.updateIssue(update);
                this.set_adviceVisible(false);
                await this.$router.replace({
                    path:'/supplierAll',
                    name:'supplierAll'
                })
            },
            returnBack(){
                this.set_adviceVisible(false);
                this.$router.replace({
                    path:'/supplierAll',
                    name:'supplierAll'
                })
            }


        },
    }
</script>

<style scoped>

</style>
