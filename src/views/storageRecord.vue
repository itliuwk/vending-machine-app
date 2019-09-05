<template>
    <div class="storageRecord">
        <div class="returnTitle" @click="returnGo">
            <img src="../assets/return.png" alt="">
            <span>入库记录</span>
        </div>
        <van-list
                class="list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <van-cell
                    v-for="item in list"
                    :key="item.id"
            >
                <div style="background: #444956;" @click="detail(item.id)">
                    <div class="oddMumbers">
                        <span>单号：{{item.id}}</span>
                        <span>{{item.createdDate}}</span>
                    </div>
                    <div class="content">
                        <div class="content-left">
                            <img :src="item.productImage" alt="">
                            <div class="content-left-info">
                                <div>{{item.productName}}</div>
                                <div class="oddMumbers">
                                    <span style="color: red">￥{{item.productPrice}}</span>
                                    <span>{{item.quantity}}件</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
    import {stockIns} from '@/api/index'
    import {formatAll} from '@/utils/date'

    export default {
        name: "storageRecord",
        data() {
            return {
                list: [],
                params: {
                    query: '',
                    from: 0,
                    size: 10,
                },
                loading: false,
                finished: false
            };
        },
        mounted() {
            this.get_stockIns()
        },
        methods: {
            get_stockIns() {
                stockIns(this.params).then(res => {
                    res.map(item => {
                        item.createdDate = formatAll(item.createdDate);
                        return item;
                    });

                    this.list = [...this.list, ...res];
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                })
            },
            onLoad() {
                this.get_stockIns();
                // 加载状态结束
            },
            detail(val) {
                this.$router.push('./recordDetail?id=' + val)
            },
            returnGo() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">

    .storageRecord {
        overflow: hidden;
        height: 100%;
    }

    .list {
        height: calc(100% - 60px);
        overflow: auto;
        background: #444956;

    }

    .oddMumbers {
        color: #bbb;
        font-size: 14px;
        display: flex;

        span {
            flex: 1;
            font-size: 12px;
        }

        span:nth-child(2) {
            text-align: right;
        }
    }

    .content {
        display: flex;
        margin-top: 15px;
        font-size: 14px;

        > div {
            flex: 1;
        }

        .content-right {
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
            color: #bbb;

            img {
                width: 80px;
                height: 80px;
                margin-right: 15px;
            }

            .content-left-info {
                flex: 3;

                div:nth-child(2) {
                    padding-top: 20px;
                }
            }
        }
    }

    /deep/ .van-cell {
        background: #444956;
        border-bottom: 0.02667rem solid #ebedf0;
    }

    /deep/ .van-cell:not(:last-child)::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 0;
        bottom: 0;
        left: 0.42667rem;
        border-bottom: none;
        transform: scaleY(.5);
    }


</style>