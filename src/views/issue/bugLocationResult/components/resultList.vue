<template>
    <div class="result-small" style="height:300px;margin: 5px">
        <vue-scroll>
            <div class="table-content">
                <a-table
                        :columns="columns"
                        :data-source="this.bugLocationList"
                        :pagination="false"
                        :customRow="customRow"

                >
                </a-table>
            </div>
        </vue-scroll>
    </div>

</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    const columns = [
        {
            title: 'RESULT: File Path',
            dataIndex: 'fileName',
            width: '80%',

        },
        {
            title: 'Score',
            dataIndex: 'score',
        },
    ];


    export default {
        name: "resultList",
        components: {},
        data() {
            return {
                columns,
                // selectedRowKeys: [],
            };
        },
        computed: {
            // hasSelected() {
            //     return this.selectedRowKeys.length > 0;
            // },
            ...mapGetters([
                'bugLocationList',
                'tableId'

            ])
        },
        async mounted() {
            await this.getFileByTree(this.bugLocationList[0].fileName);
        },
        methods: {
            ...mapMutations([
                'set_tableId'
            ]),
            ...mapActions([
                'getFileByTree'
            ]),
            // eslint-disable-next-line no-unused-vars
            customRow(record, index) {
                return {
                    style: {
                        // 字体颜色
                        'color': record.id === this.tableId ? '#DBF5E0' : 'white',
                        // 行背景色
                        'background-color': record.id === this.tableId ? '#556F61' : '#354A51'
                        // // 字体类型
                        // 'font-family': 'Microsoft YaHei',
                        // // 下划线
                        // 'text-decoration': 'underline',
                        // // 字体样式-斜体
                        // 'font-style': 'italic',
                        // // 字体样式-斜体
                        // 'font-weight': 'bolder'
                    },
                    on: {
                        // 鼠标单击行
                        // eslint-disable-next-line no-unused-vars
                        click: async event => {
                            console.log(record);
                            this.set_tableId(record.id);
                            await this.getFileByTree(record.fileName);
                            await this.$router.replace({
                                path: '/supplierAll2',
                                name: 'supplierAll2'
                            })
                        },
                    },

                }
            },



        },
    }
</script>

<style scoped>




</style>
