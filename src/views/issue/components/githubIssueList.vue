<template>
    <div class="githubIssueList">
        <div class="github-tool-bar">
            <!--            <div id="tool-bar"-->
            <!--                 style=" position: absolute; left: 10pt; top: 35pt; z-index: 2; background-color: #658885;">-->
            <!--                <div class="tools">-->
            <!--                    <div class="center-center">-->
            <!--                        <Icon style="font-size: 30px; cursor: pointer" title="放大" type="ios-add-circle-outline"-->
            <!--                              @click="magnifying()"/>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--                <div class="tools">-->
            <!--                    <div class="center-center">-->
            <!--                        <Icon style="font-size: 30px;cursor: pointer" title="缩小" type="ios-remove-circle-outline"-->
            <!--                              @click="contractible()"/>-->
            <!--                    </div>-->
            <!--                </div>-->

            <!--            </div>-->
        </div>
        <div class="scroll-wrap" style="height: 805px">
            <vue-scroll>
                <div class="new-github-list" style="position:relative;margin: 75px 60px 30px 45px;">
                    <a-table :columns="columns"
                             :data-source="gitIssueList"
                             :expanded-row-keys.sync="expandedRowKeys"
                    >

                        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                            {{ record.description }}
                        </p>
                        <div
                                slot="filterDropdown"
                                slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                                style="padding: 8px"
                        >
                            <a-input
                                    v-ant-ref="c => (searchInput = c)"
                                    :placeholder="`Search ${column.dataIndex}`"
                                    :value="selectedKeys[0]"
                                    style="width: 188px; margin-bottom: 8px; display: block;"
                                    @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                                    @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            />
                            <a-button
                                    type="primary"
                                    icon="search"
                                    size="small"
                                    style="width: 90px; margin-right: 8px"
                                    @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            >
                                Search
                            </a-button>
                            <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                                Reset
                            </a-button>
                        </div>
                        <a-icon
                                slot="filterIcon"
                                slot-scope="filtered"
                                type="search"
                                :style="{ color: filtered ? '#108ee9' : undefined }"
                        />
                        <template slot="customRender" slot-scope="text,record,index,column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
                v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
                  v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                  :key="i"
                  class="highlight"
          >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
          <span slot="tags" slot-scope="tags">
      <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
      </span>
                            <template v-else>
                                {{ text }}
                            </template>
                        </template>
<!--                        eslint-disable-next-line vue/no-unused-vars-->
                        <span slot="action" slot-scope="text, record">
      <a>Save to local</a>
      <a-divider type="vertical" />
      <a>Delete</a>
    </span>
                    </a-table>
                </div>

            </vue-scroll>
        </div>
    </div>

</template>

<script>

    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {message} from "ant-design-vue";


    export default {
        name: "githubIssueList",
        components: {},

        data() {
            return {
                columns: [{
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        // eslint-disable-next-line no-unused-vars
                        customRender(text,record,index,column){
                            return text;
                        },
                    },
                    onFilter: (value, record) =>
                        record.title
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            }, 0);
                        }
                    },
                }, {
                    title: 'Author',
                    dataIndex: 'userName',
                    key: 'userName',
                    width: '20%',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        // eslint-disable-next-line no-unused-vars
                        customRender(text,record,index,column){
                            return text;
                        },
                    },
                    onFilter: (value, record) =>
                        record.userName
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            });
                        }
                    },

                }, {
                    title: 'Tags',
                    key: 'tags',
                    dataIndex: 'tags',
                    scopedSlots: { customRender: 'tags' },
                },{
                    title: 'Action',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },],
                searchText: '',
                searchInput: null,
                searchedColumn: '',
                expandedRowKeys: [],

            };
        },
        computed: {
            ...mapGetters([
                'gitIssueList',
                'currentProjectDetail',
                'currentProjectId'
            ])
        },
        async mounted() {
            await this.getGithubIssue();
        },
        methods: {
            ...mapMutations([]),
            ...mapActions([
                'getRepoAllIssues'
            ]),
            async getGithubIssue() {
                console.log(this.currentProjectId);
                if (this.currentProjectDetail.githubRepoName == null) {
                    message.warning('该项目没有github相关信息')
                } else {
                    await this.getRepoAllIssues(this.currentProjectId);
                }

            },
            handleSearch(selectedKeys, confirm, dataIndex) {
                confirm();
                this.searchText = selectedKeys[0];
                this.searchedColumn = dataIndex;
            },
            /**
             * to do: tag and click 后的评论 以及筛选获得与我相关
             * @param clearFilters
             */
            handleReset(clearFilters) {
                clearFilters();
                this.searchText = '';
            },



        },
    }
</script>

<style scoped>
    .tools {
        display: inline-block;
        height: 40px;
        width: 40px;
        vertical-align: middle;
    }

    .center-center {
        height: 100%;
        display: flex;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
    }


</style>
