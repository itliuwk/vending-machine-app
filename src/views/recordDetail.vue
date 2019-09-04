<template>
    <div class="recordDetail">
        <div class="label">
            <span>入库单号</span>
            <span>65456465411</span>
        </div>
        <div class="label">
            <span>入库时间</span>
            <span>2019-9-4 17:45:16</span>
        </div>
        <div class="label">
            <span>入库件数</span>
            <span>100件</span>
        </div>
        <div class="product">
            <span>入库商品</span>
            <div class="content">
                <img src="https://s2.ax1x.com/2019/09/03/nACikt.jpg" alt="">
                <div class="content-info">
                    <div>可口可乐</div>
                    <div>￥10</div>
                </div>
            </div>
        </div>
        <div class="label">
            <span>EPC列表</span>
        </div>
        <div class="result-content">
            <van-tag class="num" plain>5415641561</van-tag>
            <van-tag class="num" plain>2341243463</van-tag>
            <van-tag class="num" plain>2386748679</van-tag>
            <van-tag class="num" plain>2579692867</van-tag>
        </div>
    </div>
</template>

<script>
    export default {
        name: "recordDetail",
        data(){
            return{
                detail:null
            }
        },
        mounted() {
            if (this.$route.query.detail){
                console.log(this.$route.query.detail);
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
            font-size: 14px;
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
            .num{
                margin: 8px 10px;
                font-size: 12px;
            }
        }
    }

</style>