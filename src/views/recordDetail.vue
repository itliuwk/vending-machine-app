<template>
    <div class="recordDetail">
        <div class="label">
            <span>入库单号</span>
            <span>{{detail.id}}</span>
        </div>
        <div class="label">
            <span>入库时间</span>
            <span>{{detail.createdDate}}</span>
        </div>
        <div class="label">
            <span>入库件数</span>
            <span>{{detail.quantity}}件</span>
        </div>
        <div class="product">
            <span>入库商品</span>
            <div class="content">
                <img :src="detail.productImage" alt="">
                <div class="content-info">
                    <div>{{detail.productName}}</div>
                    <div>￥{{detail.productPrice}}</div>
                </div>
            </div>
        </div>
        <div class="label">
            <span>EPC列表</span>
        </div>
        <div class="result-content">
            <van-tag class="num" v-for="item in detail.epcs" plain>{{item}}</van-tag>
        </div>
    </div>
</template>

<script>
    import {stockIns_detail} from '@/api/index'
    import {formatAll} from '@/utils/date'
    export default {
        name: "recordDetail",
        data(){
            return{
                detail:{}
            }
        },
        mounted() {
            if (this.$route.query.id){
                this.get_detail({id:this.$route.query.id});
            }
        },
        methods:{
            get_detail(params){
                stockIns_detail(params).then(res=>{
                    res.createdDate = formatAll( res.createdDate);
                    this.detail = res
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .recordDetail{
        padding: 20px;
        background: #fff;
        height: 100%;
        .label{
            display: flex;
            font-size: 12px;
            margin-bottom: 30px;
            span{
                flex: 1;
            }
            span:nth-child(2){
                text-align: right;
            }
        }

        .product{
            font-size: 14px;
            margin-bottom: 30px;
            .content{
                display: flex;
                margin-top: 20px;
                img{
                    width: 80px;
                    height: 80px;
                }
                .content-info{
                    margin-left: 20px;
                    div:nth-child(2){
                        padding-top: 30px;
                    }
                }
            }
        }

        .result-content{
            background: #fff;
            min-height: 200px;
            .num{
                margin: 8px 10px;
                font-size: 12px;
            }
        }
    }

</style>