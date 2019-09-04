<template>
    <div class="login">
        <van-cell-group>
            <van-field
                    v-model="username"
                    clearable
                    size="large"
                    label="用户名"
                    placeholder="请输入用户名"
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
            <van-button class="sign-in-btn" type="info">登录</van-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        background: #F8F8F8;
        margin: 0px auto;
        padding: 20px;
        padding-top: 200px;
        height: 100%;
        .sign-in{
            text-align: center;
            margin-top: 40px;
            .sign-in-btn{
                width: 100%;
            }
        }
        .password{
        }
    }
</style>