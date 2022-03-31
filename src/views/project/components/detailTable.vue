<template>
    <div class="detail-table">
        <!--        closable :draggable="true" @on-tab-remove="handleTabRemove"-->
        <Tabs type="card"
              v-model="activePage"
              @on-drag-drop="handleDragDrop" >
            <TabPane v-for="(tab, index) in tabList" :key="index" :label="tab.label" :name="tab.name"
                     v-model="activePage" :v-if="tab.show">
                <MyEditor
                        :language="fileLanguage"
                        :codes="codes"
                        @onMounted="htmlOnMounted"
                        @onCodeChange="htmlOnCodeChange"
                        :tabName="tab.name"
                />
            </TabPane>
        </Tabs>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import MyEditor from './editor'

    export default {
        name: "detailTable",
        components: {
            MyEditor
        },
        data() {
            return {
                htmlCodes: "<div>默认</div>",
                htmlEditor: null,

            };
        },

        computed: {
            ...mapGetters([
                'tabList',
                'activePage',
                'codes',
                'userId',
                'currentProjectId',
                'fileLanguage',
            ])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([
                'set_activePage',
                'set_codes',
                'set_tabList'
            ]),
            ...mapActions([
                'getFileByTree'
            ]),
            // eslint-disable-next-line no-unused-vars
            handleDragDrop(name, newName, a, b, names) {
                // names 为调整后的 name 集合
                this.tabList.splice(b, 1, ...this.tabList.splice(a, 1, this.tabList[b]));
            },
            handleTabRemove(name) {
                this['tab' + name] = false;
            },
            htmlOnMounted(edit) {
                this.htmlEditor = edit;
            },
            // eslint-disable-next-line no-unused-vars
            htmlOnCodeChange(value, event) {
            },
            getFileByTree1() {
                // eslint-disable-next-line no-unused-vars
                const data = {userId: this.userId, projectId: this.currentProjectId, fileName: this.activePage}
            },


        },
    }
</script>

<style scoped>

</style>
