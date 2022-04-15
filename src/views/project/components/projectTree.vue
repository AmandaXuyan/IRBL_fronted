<template>
    <div class="file-tree" style="max-height: 750px">
        <Tree :data="this.treeData" ref="tree" :render="renderContent"></Tree>
        <span></span>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "projectTree",
        components: {},
        props: [],
        data() {
            return {
                contextData: null,
            };
        },
        computed: {
            ...mapGetters([
                'userId',
                'currentProjectId',
                'currentProjectDetail',
                'tabList',
                'activePage',
                'treeData',
            ])
        },
        async mounted() {
            await this.getFileTree(this.currentProjectId);
        },
        methods: {
            ...mapMutations([
                'set_currentProjectId',
                'set_tabList',
                'set_activePage',
                'set_updateProjectPopV'

            ]),
            ...mapActions([
                'addProjectUrl',
                'getFileTree',
                'getFileByTree',

            ]),
            handleContextMenu(data) {
                console.log(data);
                if ((data.children === null)) {
                    const item = {label: data.title, name: data.title, show: true};
                    if (this.tabList == []) {
                        this.tabList.push(item)
                    } else {
                        var isIn = false;
                        this.tabList.forEach(function (item1, index, arr) {
                            if (item1.label == item.label) {
                                isIn = true;
                                arr.splice(index, 1);
                                arr.unshift(item);
                            }
                        });
                        if (!isIn) {
                            this.tabList.push(item);
                        }
                    }
                    this.set_activePage(item.name);
                    this.set_updateProjectPopV(false);
                    console.log(this.activePage)
                }

            },
            // eslint-disable-next-line no-unused-vars
            renderContent(h, {root, node, data}) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span',
                        {
                            domProps: {
                                innerHTML: data.title,
                            },
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            },
                            on: {
                                click: async () => {
                                    if (data.children == null) {
                                        await this.getFileByTree(data.path);
                                    }
                                    this.handleContextMenu(data);

                                }
                            }
                        }
                    ),
                ]);
            },
            append(data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove(root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            },
        },
    }
</script>

<style scoped>
    .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
        background-color: #658885;
    }

</style>
