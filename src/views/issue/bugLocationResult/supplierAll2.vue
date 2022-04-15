<template>
    <div></div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "supplierAll2",
        data() {
            this.$router.replace({
                path: '/bugLocation',
                name: 'bugLocation'
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
