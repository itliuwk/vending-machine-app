<template>
    <div class="page">
        <div class="returnTitle" style="padding: 20px;text-align: center">RFID售货机入库盘点端</div>
        <div class="content">
            <div class="item" @click="toStorage">
                <img src="../assets/newStorage.png" alt="">
                新建入库
            </div>
            <div class="item" @click="toRecord">
                <img src="../assets/storageRecord.png" alt="">
                入库记录
            </div>
            <div class="item">
                <img src="../assets/changePassword.png" alt="">
                修改密码
            </div>
            <div class="item" @click="toLogin">
                <img src="../assets/signOut.png" alt="">
                退出
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {}
        },
        mounted() {
            this.$store.commit('SET_PRODUCT', '')
        },
        methods: {
            toStorage() {
                this.$router.push('./newStorage')
            },
            toRecord() {
                this.$router.push('./storageRecord')
            },
            toLogin() {
                this.$router.push('./login')
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        height: 100%;
        background: #444956;
        box-sizing: border-box;


        .content {
            margin: 50px 20px 20px;
            border-top: 2px solid #121212;
            border-left: 2px solid #121212;
            border-radius: 5px;

            .item {
                display: inline-block;
                width: 50%;
                height: 5rem;
                line-height: 2rem;
                text-align: center;
                border-right: 2px solid #121212;
                border-bottom: 2px solid #121212;
                font-size: 16px;
                background: #444956;
                color: #bbbbbb;
                padding-top: 30px;
                img{

                    margin: 0 auto;
                    display: block;
                    width: 60px;
                    height: 60px;
                }
            }
            .item:last-child{
                border-bottom-right-radius: 5px;
            }
        }

    }
</style>