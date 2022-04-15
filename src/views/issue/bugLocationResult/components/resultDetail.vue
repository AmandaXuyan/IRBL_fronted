<template>
    <div style="height: 550px">
        <vue-scroll>
        <MyEditor
                :language="fileLanguage"
                :codes="codes"
                @onMounted="htmlOnMounted"
                @onCodeChange="htmlOnCodeChange"
        />
        </vue-scroll>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import MyEditor from "../../../project/components/editor";

    export default {
        name: "resultDetail",
    components: {
        MyEditor
    },
    data() {
        return {};
    },
    computed: {
    ...mapGetters([
        'codes',
        'fileLanguage',
    ])
    },
    async mounted() {

    },
    methods: {
    ...mapMutations([]),
    ...mapActions([]),
        htmlOnMounted(edit) {
            this.htmlEditor = edit;
        },
        // eslint-disable-next-line no-unused-vars
        htmlOnCodeChange(value, event) {
        },


    },
    }
</script>

<style scoped>

</style>
