<template>
    <div class="product">
        <van-search
                v-model="params.query"
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
                    size: 10,
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
                    query: '',
                    from: 0,
                    size: 10,
                };
                this.get_list()
            },
            get_list() {
                products_list(this.params).then(res => {
                    this.list = [...this.list, ...res];
                    this.loading = false;
                    // 数据全部加载完成
                    if (this.list.length >= 40) {
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

                // this.$router.replace({
                //     path: './newStorage?product=' + val
                // });
                this.$router.go(-1);
                this.$store.commit('SET_PRODUCT', val)

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
    }
</style>