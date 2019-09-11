<template>
    <div class="product">
        <div class="returnTitle" @click="returnGo">
            <img src="../assets/return.png" alt="">
            <span>商品选择</span>
        </div>

        <van-search
                v-model="params.query"
                placeholder="请输入商品名"
                show-action
                shape="round"
                @search="onSearch"
        >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>


<!--        <van-search placeholder="请输入商品名"  @search="onSearch" v-model="params.query" />-->
        <div class="list">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <van-cell v-for="item in list" :key="item.id">
                    <div class="content">
                        <div class="content-left">
                            <img :src="item.image" alt="">
                            <div class="content-left-info">
                                <div>{{item.name}}</div>
                                <div>￥{{item.price}}</div>
                            </div>
                        </div>
                        <div class="content-right">
                            <van-radio @click="radioHandClick($event,item)" v-model="radio" :name="item.id"></van-radio>
                        </div>
                    </div>
                </van-cell>
            </van-list>

        </div>
        <div class="confirm">
            <van-button type="info" @click="confirm" class="btn">确认</van-button>
        </div>
    </div>
</template>

<script>
    import {products_list} from '@/api/index'

    export default {
        name: "selProduct",
        data() {
            return {
                radio: '',
                list: [],
                params: {
                    query: '',
                    from: 0,
                    size: 20,
                },
                loading: false,
                finished: false
            }
        },

        mounted() {

            this.get_list()
        },
        methods: {
            onSearch() {
                this.list = [];
                this.params = {
                    ...this.params,
                    from: 0,
                    size: 20,
                };
                this.get_list()
            },
            get_list() {
                products_list(this.params).then(res => {
                    res.map(item=>{
                       item.image= item.image +'?imageView2/1/w/200/h/200';
                        return item;
                    });

                    this.list = [...this.list, ...res];
                    this.loading = false;
                    // // 数据全部加载完成
                    if (res.length < this.params.size) {
                        this.finished = true;
                    }
                })
            },
            onLoad() {
                this.params = {
                    ...this.params,
                    from: this.params.size +  this.params.from
                };
                this.get_list();
                // 加载状态结束

            },
            radioHandClick(e, val) {
                this.$store.commit('SET_PRODUCT', val)
            },
            confirm(){
                this.$router.go(-1);
            },
            returnGo(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .product {
        height: 100%;
        overflow: hidden;


        .list {
            height: calc(100% - 144px);
            overflow: auto;
            background: #444956;

            /deep/ .van-cell__value--alone{
                color: #fff;
                border-radius: 5px;
                padding-left: 5px;
            }
        }

        .content {
            display: flex;

            > div {
                flex: 6;
            }

            .content-right {
                flex: 1;
                text-align: right;
                display: flex;
                justify-content: flex-end;
                align-items: center;

                > div {
                    display: inline-block;
                }
            }

            .content-left {
                display: flex;
                color: #bbbbbb;
                img {
                    width: 80px;
                    height: 80px;
                }

                .content-left-info {
                    margin-left: 20px;

                    div:nth-child(2) {
                        padding-top: 20px;
                    }
                }
            }
        }

        .confirm{
            position: fixed;
            bottom: 0;
            width: 100vw;
            .btn{
                width: 100%;
            }
        }


        /deep/ .van-cell{
            background: #444956;
        }

        /deep/ .van-cell:not(:last-child)::after{
            border-bottom: 0.02667rem solid #666;
        }

        /deep/ .van-search{
            background: #444956!important;
            border-bottom: 0.02667rem solid #666;

            .van-search__action{
                color: #fff;
            }
        }
        /deep/ .van-search__content{
            background: #444956;
        }

        /deep/  .van-search .van-cell--borderless{
            border: 1px solid #fff;
            border-radius: 5px;
            padding-left: 5px;
            .van-field__control{
                color: #fff;
            }
        }
        /deep/.van-field__left-icon{
            color: #fff;
        }
    }
</style>