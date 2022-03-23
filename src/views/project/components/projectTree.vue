<template>
    <div class="file-tree">
        <Tree :data="data1" expand-node @on-contextmenu="handleContextMenu"></Tree>
        <template slot="contextMenu">
            <DropdownItem @click.native="handleContextMenuEdit">编辑</DropdownItem>
            <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
        </template>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    export default {
        name: "projectTree",
        components: {

        },
        props:[],
        data(){
            return{
                data1: [
                    {
                        title: 'parent 1',
                        expand: true,
                        contextmenu: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                contextmenu: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                contextmenu: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                contextData: null,
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

            ]),
            jumpToDetail(){
                this.$router.push({ name: 'projectDetail'})
            },
            handleContextMenu (data) {
                this.contextData = data;
            },
            handleContextMenuEdit () {
                this.$Message.info('Click edit of' + this.contextData.title);
            },
            handleContextMenuDelete () {
                this.$Message.info('Click delete of' + this.contextData.title);
            }


        },

    }
</script>

<style scoped>

</style>
