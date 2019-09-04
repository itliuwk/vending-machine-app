<template>
    <div class="newStorage">

        <div class="label">
            <span class="label-title">商品：</span>
            <div class="label-content">
                <span class="selProduct" @click="selProduct">选择商品</span>
            </div>
        </div>

        <div class="label">
            <span class="label-title">备注：</span>

            <div class="label-content">
                <textarea name=""></textarea>
            </div>
        </div>

        <div class="result">
            <span class="label-title">扫码结果 (共{{epcs.length}}件)</span>
            <span @click="empty">清空</span>
        </div>

        <div class="result-content">
            <van-tag class="num" v-for="(item,index) in epcs" plain>{{item}}<span class="del">x</span></van-tag>
        </div>

        <div class="operation">
            <van-button class="btn" @click="start" v-if="!isStart" type="info">开始扫描</van-button>
            <van-button class="btn" @click="end"  v-if="isStart" type="info">暂停扫描</van-button>
            <van-button class="btn"  type="primary">确认入库</van-button>
        </div>

    </div>
</template>

<script>
    import scanner from  '../utils/scanner'
    import Vue from 'vue';
    import { Notify  } from 'vant';

    Vue.use(Notify);
    export default {
        name: "newStorage",
        data(){
          return{
              isStart:false,
              scanner:null,
              epcs:[]
          }
        },
        watch:{
            $route: {
                handler: function(val, oldVal){
                    console.log(val);
                },
                // 深度观察监听
                deep: true
            },
        },
        mounted(){
            if (this.$route.query.product){
                console.log(this.$route.query.product);
            }
        },
        methods:{
            selProduct(){
                this.$router.replace({
                    path:'./selProduct'
                })
            },
            start(){
                this.scanner = Scanner.create(true);
                let that = this;
                this.isStart = true;
                this.scanner.subscribe({
                    onScan: function (epcs) {
                        that.epcs = [...that.epcs,...epcs]
                    }
                });
                this.scanner.startScan();
            },
            end(){
                this.isStart = false;

                //组件销毁，把资源释放
                this.scanner.destroy();
            },
            empty(){
                if (this.isStart){
                    Notify({ type: 'danger', message: '请先暂停扫描' });
                    return false
                }
                this.epcs = []
            }
        }
    }
</script>

<style scoped lang="scss">
    .newStorage {
        padding: 50px 25px 0;
        background: #fff;
        height: 100%;

        .label {
            font-size: 16px;
            margin-bottom: 50px;

            .label-title {
                display: inline-block;
                min-width: 80px;
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
                    border: 1px solid #bbb;
                    border-radius: 4px;
                    font-size: 16px;
                    padding: 14px 0 0 14px;
                    box-sizing: border-box;
                }
            }
        }


        .result {
            display: flex;
            font-size: 16px;
            margin-bottom: 20px;

            span {
                flex: 1;
            }

            span:nth-child(2) {
                text-align: right;
                color: red;
            }
        }

        .result-content{
            margin-bottom: 50px;
            z-index: 1;
            .num{
                margin: 8px 10px;
                font-size: 12px;
                position: relative;

                .del{
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


        .operation{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 9999;
            .btn{
                width: 50%;
            }
        }
    }
</style>