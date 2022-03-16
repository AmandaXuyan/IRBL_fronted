<template>
    <div class="loginPage">
        <div class="logo-title">
            <self-building-square-spinner
                    :animation-duration="4000"
                    :size="35"
                    color="#354A51"
                    style="float: left;margin-top: 9px;"
            />
            <span class="title">Information Retrieval</span>
            <h3 style="color: #354A51;">IRBL</h3>
        </div>
        <transition name="slide-fade">
            <Card class="loginCard" v-if="loginShow">
                <h2 slot="title" style="color: #354A51">
                    <span>登录</span>
                </h2>
                <a href="#" slot="extra" @click.prevent="changeCard" style="color: #354A51">
                    <Icon type="shuffle"></Icon>
                    <span>注册</span>
                </a>
                <Form ref="loginFrom" :model="loginFrom" :rules="loginRule">
                    <Form-item prop="userName">
                        <Input type="text" v-model="loginFrom.email" placeholder="邮箱">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="loginFrom.password" placeholder="密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('loginFrom')">登录</Button>
                    </Form-item>
                </Form>
            </Card>
        </transition>
        <transition name="slide-fade">
            <Card class="loginCard" v-if="registerShow">
                <h2 slot="title" style="color: #354A51">
                    <span>注册</span>
                </h2>
                <a href="#" slot="extra" @click.prevent="changeCard" style="color: #354A51">
                    <Icon type="shuffle" ></Icon>
                    <span>登录</span>
                </a>

                <Form ref="registerFrom" :model="registerFrom" :rules="registerRule">
                    <Form-item prop="userName">
                        <Input type="text" v-model="registerFrom.userName" placeholder="用户名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input v-model="registerFrom.password" type="password" placeholder="密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="email">
                        <Input v-model="registerFrom.email" placeholder="邮箱">
                            <Icon type="ios-mail-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary"  @click="handleSubmit('registerFrom')">注册</Button>
                    </Form-item>
                </Form>
            </Card>
        </transition>

    </div>
</template>
<style src="./login.less" lang="less"></style>
<script>
    // eslint-disable-next-line no-unused-vars
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import { SelfBuildingSquareSpinner } from 'epic-spinners';

    export default {
        name: "loginPage",
        components:{
            SelfBuildingSquareSpinner,
        },
        data(){
            return{
                loginShow: true,
                registerShow: false,
                loginFrom: {
                    email: '',
                    password: '',
                },
                registerFrom: {
                    userName: '',
                    password: '',
                    email: '',
                },
                loginRule: {
                    email: [
                        { required: true, message: '请填写邮箱', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' },
                    ],
                },
                registerRule: {
                    userName: [
                        { required: true, message: '请填写用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请填写邮箱', trigger: 'blur' },
                    ],
                },
            };
        },
        computed:{
            ...mapGetters([
                'token'
            ])
        },
        mounted() {
        },
        watch:{
            $route: {
                handler: function(route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            },
        },
        methods:{
            ...mapActions([
                'login',
                'register'
            ]),
            async handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(name=='loginFrom'){
                            this.login(this.loginFrom);
                        }
                        else{
                            this.register(this.registerFrom);
                            this.changeCard();
                        }
                    } else {
                        this.$Message.error('未填写完整!');
                    }
                });
            },
            changeCard() {
                if (this.loginShow) {
                    this.loginShow = false;
                    setTimeout(() => {
                        this.registerShow = true;
                    }, 400);
                } else {
                    this.registerShow = false;
                    setTimeout(() => {
                        this.loginShow = true;
                    }, 400);
                }
            },

        },
    }
</script>

<style scoped>

</style>
