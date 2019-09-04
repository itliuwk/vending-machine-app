<template>
    <div class="product">
        <van-search
                v-model="value"
                placeholder="请输入商品名"
                show-action
                shape="round"
                @search="onSearch"
        >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>

        <div class="list">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <van-cell v-for="item in list" :key="item">
                        <div class="content">
                            <div class="content-left">
                                <img src="https://s2.ax1x.com/2019/09/03/nACikt.jpg" alt="">
                                <div class="content-left-info">
                                    <div>可口可乐</div>
                                    <div>￥10</div>
                                </div>
                            </div>
                            <div class="content-right">
                                <van-radio  @click="radioHandClick($event,item)" v-model="radio" :name="item"></van-radio>
                            </div>
                        </div>
                </van-cell>
            </van-list>

        </div>
    </div>
</template>

<script>
    export default {
        name: "selProduct",
        data() {
            return {
                value: '',
                radio:'',
                list: [],
                loading: false,
                finished: false
            }
        },
        methods: {
            onSearch(val) {
                console.log(val);
            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);
            },
            radioHandClick(e,val){
                this.$router.replace({
                    path:'./newStorage?product='+val
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .product {
        height: 100%;
        overflow: hidden;

        .list {
            height: calc(100% - 60px);
            overflow: auto;
        }

        .content{
            display: flex;
            >div{
                flex: 1;
            }
            .content-right{
                text-align: right;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                >div{
                    display: inline-block;
                }
            }
            .content-left{
                display: flex;
                img{
                    width: 80px;
                    height: 80px;
                }
                .content-left-info{
                    div:nth-child(2){
                        padding-top: 20px;
                    }
                }
            }
        }
    }
</style>