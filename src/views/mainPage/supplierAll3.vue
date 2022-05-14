<template>
    <div></div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "supplierAll3",
        data() {
            this.$router.replace({
                path: '/connectDetail',
                name: 'connectDetail'
            })
            return {}
        },
        components: {},
        computed: {
            ...mapGetters([])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([]),
            ...mapActions([]),


        },

    }
</script>

<style scoped>

</style>
