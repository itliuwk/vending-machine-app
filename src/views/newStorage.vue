<template>
    <div class="newStorage">
        <div class="returnTitle" @click="returnGo">
            <img src="../assets/return.png" alt="">
            <span>新建入库</span>
        </div>
        <div class="newStorage_c">

            <div class="label">
                <span class="label-title">商品：</span>
                <div class="label-content">
                    <span class="selProduct" v-if="!product.id" @click="selProduct">选择商品</span>
                    <div v-else class="product" @click="selProduct">
                        <img :src="product.image" alt="">
                        <div>
                            <div>{{product.name}}</div>
                            <div style="color: red">￥{{product.price}} 元</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="label">
                <span class="label-title">价格：</span>

                <div class="label-content">
                    <input  v-model="price" />
                </div>
            </div>

            <div class="label">
                <span class="label-title">备注：</span>

                <div class="label-content">
                    <textarea name="" v-model="remarks"></textarea>
                </div>
            </div>

            <div class="result">
                <span class="label-title">扫码结果 (共{{epcs.length}}件)</span>
                <span @click="empty">清空</span>
            </div>

            <div class="result-content">
                <van-tag class="num" v-for="(item,index) in epcs" plain>{{item}}<span  v-if="!isStart" class="del" @click="del(index)">x</span></van-tag>
            </div>

            <div class="operation" :style="{top:(docmHeight-48)+'px'}">
                <van-button class="btn" @click="start" v-if="!isStart" type="info">开始扫描</van-button>
                <van-button class="btn" @click="end" v-if="isStart" type="info">暂停扫描</van-button>
                <van-button class="btn" type="primary" @click="confirm">确认入库</van-button>
            </div>

        </div>
    </div>

</template>

<script>

    import {post_stockIn} from '@/api/index'
    import scanner from '../utils/scanner'
    import Vue from 'vue';
    import {Notify} from 'vant';

    Vue.use(Notify);
    export default {
        name: "newStorage",
        data() {
            return {
                isStart: false,
                scanner: null,
                epcs: [],
                remarks: '',
                docmHeight: document.documentElement.clientHeight,
            }
        },
        computed: {
            product() {
                return this.$store.state.product
            },
            price(){
                return this.$store.state.product.price
            }
        },
        mounted() {
        },
        methods: {
            selProduct() {
                this.$router.push({
                    path: './selProduct'
                })
            },
            start() {
                this.scanner = Scanner.create(false);
                let that = this;
                this.isStart = true;
                this.scanner.subscribe({
                    onScan: function (epcs) {
                        that.epcs = JSON.parse(epcs);
                    }
                });
                this.scanner.startScan();
            },
            end() {
                this.isStart = false;

                //组件销毁，把资源释放
                this.scanner.destroy();
            },
            empty() {
                if (this.isStart) {
                    Notify({type: 'danger', message: '请先暂停扫描'});
                    return false
                }
                this.epcs = []
            },
            del(idx){
                this.epcs.splice(idx,1)
            },
            confirm() {
                if (this.isStart) {
                    Notify({type: 'danger', message: '请先暂停扫描'});
                    return false
                }

                if (!this.product.id) {
                    Notify({type: 'danger', message: '请选择商品'});
                    return false
                }


                if (!this.remarks) {
                    Notify({type: 'danger', message: '请填写备注'});
                    return false
                }


                if (this.epcs.length === 0) {
                    Notify({type: 'danger', message: '请扫码epcs结果'});
                    return false
                }

                let params = {
                    remarks: this.remarks,
                    epcs: this.epcs,
                    productId: this.product.id,
                    price:this.price
                };

                post_stockIn(params).then(res => {
                    Notify({type: 'success', message: '入库成功'});

                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 1500)
                });
            },
            returnGo(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .newStorage{
        height: 100vh;
        background: #444956;
        position: relative;

    }
    .newStorage_c {
        padding: 50px 25px 0;


        .label {
            font-size: 14px;
            margin-bottom: 50px;

            .label-title {
                display: inline-block;
                min-width: 60px;
                vertical-align: top;
            }

            .label-content {
                display: inline-block;

                .selProduct {
                    padding: 5px 10px;
                    border: 1px solid #bbb;
                    border-radius: 4px;
                }

                textarea {
                    width: 200px;
                    height: 100px;
                    resize: none;
                    background: #444956;
                    color: #fff;
                    border: 1px solid #bbb;
                    border-radius: 4px;
                    font-size: 14px;
                    padding: 14px 0 0 14px;
                    box-sizing: border-box;
                }



                input{
                    background: #444956;
                    color: #fff;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 4px;
                    font-size: 14px;
                    padding-left: 14px;
                    border: 1px solid #bbb;
                    box-sizing: border-box;

                }
            }
        }


        .result {
            display: flex;
            font-size: 14px;
            margin-bottom: 20px;

            span {
                flex: 1;
            }

            span:nth-child(2) {
                text-align: right;
                color: red;
            }
        }

        .result-content {

            z-index: 1;
            background: #444956;
            .num {
                margin: 8px 10px;
                font-size: 12px;
                position: relative;

                .del {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    line-height: 12px;
                    text-align: center;
                    background: #000;
                    color: #fff;
                    font-size: 10px;
                    border-radius: 50%;
                    top: -8px;
                    right: -5px;
                    z-index: 999;
                    cursor: pointer;
                }

            }
        }

        .product {
            display: flex;

            img {
                width: 80px;
                height: 80px;
            }

            div {
                margin-left: 10px;
                flex: 3;

                div:nth-child(1) {
                    padding-top: 20px;
                }

                div:nth-child(2) {
                    padding-top: 20px;
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