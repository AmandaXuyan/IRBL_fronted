<template>
    <div class="issue-editor">
        <tinymce
                id="myedit"
                ref="editor"
                v-model="issueContent"
                :disabled="disabled"
                @onClick="onClick"
        />
<!--        <button @click="saveIssue()">清空内容</button>-->
<!--        <button @click="disabled = true">禁用</button>-->
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import tinymce from './tinymce'


    export default {
        name: "issueModal",
        components:{
            tinymce,
        },
        data(){
            return{
                disabled: false,
                issueContent: 'Welcome to Use Tinymce Editor',
                isabled: false,
            };
        },
        computed:{
            ...mapGetters([
            ])
        },
        async mounted() {

        },
        methods:{
            ...mapMutations([

            ]),
            ...mapActions([
            ]),
            // 内容
            getContent () {
                console.log('内容', this.issueContent)
            },
            // 鼠标单击的事件
            onClick (e, editor) {
                console.log('Element clicked')
                console.log(e)
                console.log(editor)
            },
            // 清空内容
            clear () {
                console.log(this.$refs.editor)
                this.$refs.editor.clear()
            },

        },
    }
</script>


<style scoped>

</style>
