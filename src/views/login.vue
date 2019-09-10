<template>
    <div class="login">
        <van-cell-group>
            <van-field
                    v-model="username"
                    clearable
                    size="large"
                    label="账号"
                    placeholder="请输入账号"
            />

            <van-field
                    class="password"
                    v-model="password"
                    clearable
                    size="large"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
            />
        </van-cell-group>

        <div class="sign-in">
            <van-button class="sign-in-btn" @click="signIn" :loading="Loading" loading-text="登录" type="info">登录
            </van-button>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import {Notify} from 'vant';
    import {loginByUsername} from  '../api/login';
    import {setCookie} from '../utils/cookie';

    Vue.use(Notify);
    export default {
        name: "login",
        data() {
            return {
                Loading: false,
                username: 'test',
                password: '123456'
            }
        },
        methods: {
            signIn() {
                if (!this.username) {
                    Notify({type: 'danger', message: '请输入账号'});

                    return false;
                }
                if (!this.password) {
                    Notify({type: 'danger', message: '请输入密码'});
                    return false;
                }
                this.Loading = true;
                loginByUsername(this.username, this.password).then(response => {
                    console.log(response);
                    const data = response.data;
                    if (data.access_token) {
                        setCookie("access_token", data.access_token);
                        Notify({type: 'success', message: '登录成功'});
                        setTimeout(() => {
                            this.Loading = false;
                            this.$router.push('/index');
                        }, 1000)

                    }
                }).catch(err=>{
                    console.log(err);
                    Notify({type: 'danger', message: err});
                    this.Loading = false;
                })


            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        background: #444956;
        margin: 0px auto;
        padding: 20px;
        padding-top: 200px;
        height: 100%;

        .sign-in {
            text-align: center;
            margin-top: 40px;

            .sign-in-btn {
                width: 100%;
            }
        }

        .password {
        }
    }
</style>