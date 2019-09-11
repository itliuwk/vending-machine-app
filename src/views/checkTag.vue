<template>
    <div class="newStorage">
        <div class="returnTitle" @click="returnGo">
            <img src="../assets/return.png" alt="">
            <span>检验标签</span>
        </div>
        <div class="newStorage_c">
            <div class="info">标签总数：<strong>{{count}}</strong>个</div>
            <div class="info">有效标签：<strong>{{valid.length}}</strong>个，无效标签：<strong>{{invalid.length}}</strong>个</div>

            <div class="content">
                <ul>
                    <li v-for="(item,index) in valid" :key="index">
                        <div>{{item}}</div>
                        <div>可入库</div>
                    </li>
                    <li v-for="(item,index) in invalid" :key="index">
                        <div>{{item}}</div>
                        <div>已入库，无效标签</div>
                    </li>
                </ul>
            </div>

            <div class="operation" :style="{top:(docmHeight-48)+'px'}">
                <van-button class="btn" @click="returnGo" type="info">返回</van-button>
                <van-button class="btn" type="primary" @click="confirm">确认入库</van-button>
            </div>

        </div>
    </div>

</template>

<script>

    import {verify, post_stockIn} from '@/api/index'
    import Vue from 'vue';
    import {Notify} from 'vant';

    Vue.use(Notify);
    export default {
        name: "checkTag",
        data() {
            return {
                vaild: [],
                invalid: [],
                params: {},
                count: 0,
                docmHeight: document.documentElement.clientHeight,
            }
        },
        mounted() {
            this.verify();
        },
        methods: {
            verify() {
                let params = this.$route.query.params;
                if (params) {
                    params = JSON.parse(params);
                    this.params = params;
                }
                verify(params.epcs).then(res => {
                    this.invalid = res.invalid;
                    this.valid = res.valid;
                    this.count = res.valid.length + res.invalid.length
                })
            },
            confirm() {

                let params = {
                    remarks: this.params.remarks,
                    epcs: this.valid,
                    productId: this.params.productId,
                    price: this.params.price
                };

                post_stockIn(params).then(res => {
                    Notify({type: 'success', message: '入库成功'});

                    setTimeout(() => {
                        this.$router.go(-2)
                    }, 1500)
                });
            },
            returnGo() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .newStorage {
        height: 100vh;
        background: #444956;
        position: relative;
        overflow: hidden;

    }

    .newStorage_c {
        padding: 20px 25px 0;
        overflow: auto;
        height: calc(100% - 58.5px);

        .info {
            font-size: 14px;
            margin-bottom: 10px;
        }

        .content {
            width: 100%;
            margin-top: 20px;
            font-size: 14px;

            padding-bottom: 40px;

            ul {
                li {
                    list-style: none;
                    display: flex;
                    margin-bottom: 10px;

                    div {
                        flex: 1;
                    }

                    div:nth-child(2) {
                        color: rgba(37, 155, 36, 1);
                        text-align: right;
                    }
                }
            }
        }

        .operation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 9999;

            .btn {
                width: 50%;
            }
        }
    }
</style>