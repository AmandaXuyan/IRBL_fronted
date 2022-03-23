<template>
    <div class="nav-menu">
        <Icon class="menu-icon" :type=this.iconName @click="jumpToPage"/>
        <div class="menu-title" v-text="iconTitle"></div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "nav-menu",
        components:{

        },
        props:{
            iconName: {
                type: String,
                default: 'md-add'
            },
            iconTitle: {
                type: String,
                default: 'Create'
            },
            pageName:{

            },
        },
        data(){
            return{
                myPage:this.pageName,
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
                'set_visiblePop',
            ]),
            ...mapActions([

            ]),
            jumpToPage(){
                this.set_visiblePop(false);
                this.$router.push({ name:this.pageName})
            },

        },

    }
</script>

<style scoped>
    .nav-menu{
        font-size: large;
        color: #ffffff;}
    .menu-icon{
        margin-top: 20px;
        margin-left: 40px;
        margin-right: 40px;
        cursor: pointer;
        transition: all 0.6s;
        font-size:40px;
    }
    .menu-icon :hover{
        transform: scale(1.4);
    }
    .menu-title{
        margin-left: 40px;
        margin-right: 40px;
    }

</style>
