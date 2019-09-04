<template>
    <div class="page">
        <div>
            <div class="item" @click="toStorage">
                <span>新建入库</span>
            </div>
            <div class="item"  @click="toRecord">
                <span>入库记录</span>
            </div>

        </div>
        <div>
            <div class="item">
                <span>修改密码</span>
            </div>
            <div class="item"  @click="toLogin">
                <span>退出</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{

            }
        },
        methods: {
            toStorage(){
                this.$router.push('./newStorage')
            },
            toRecord(){
                this.$router.push('./storageRecord')
            },
            toLogin(){
                this.$router.push('./login')
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        height: 100%;
        text-align: center;
        padding-top: 50px;

        .item {
            display: inline-block;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            border: 1px solid #bbb;
            margin: 20px;
            font-size: 16px;
            border-radius: 5px;
            background: #fff;
        }
    }
</style>