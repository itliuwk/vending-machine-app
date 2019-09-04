<template>
    <div class="storageRecord">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <van-cell
                    v-for="item in list"
                    :key="item"
            >
                <div @click="detail(item)">
                    <div class="oddMumbers">
                        <span>单号：968464646413</span>
                        <span>2019-9-4 17:17:54</span>
                    </div>
                    <div class="content">
                        <div class="content-left">
                            <img src="https://s2.ax1x.com/2019/09/03/nACikt.jpg" alt="">
                            <div class="content-left-info">
                                <div>可口可乐</div>
                                <div class="oddMumbers">
                                    <span style="color: red">￥10</span>
                                    <span>100件</span>
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
    export default {
        name: "storageRecord",
        data() {
            return {
                list: [],
                loading: false,
                finished: false
            };
        },

        methods: {
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
            detail(val) {
                this.$router.push('./recordDetail?detail=' + val)
            }
        }
    }
</script>

<style scoped lang="scss">
    .oddMumbers {
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

            img {
                width: 80px;
                height: 80px;
                margin-right: 15px;
            }

            .content-left-info {
                width: 100%;

                div:nth-child(2) {
                    padding-top: 20px;
                }
            }
        }
    }
</style>