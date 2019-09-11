import request from '@/utils/request'


/**
 * 商品列表
 * @param params
 * @returns {PromiseLike<T> | Promise<T>}
 */
export function products_list(params) {
    console.log(params);
    return request({
        url: "/rfid/android/api/products",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 确认入库
 * @param params
 * @returns {PromiseLike<T> | Promise<T>}
 */
export function stockIn(params) {
    return request({
        url: "/rfid/android/api/stockIn",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 校验标签
 * @param params
 * @returns {PromiseLike<T> | Promise<T>}
 */
export function verify(params) {
    return request({
        url: "/rfid/android/api/stockIns/verify",
        method: 'POST',
        data:params
    }).then(res => res.data.data)
}



/**
 * 入库记录
 * @param params
 * @returns {PromiseLike<T> | Promise<T>}
 */
export function stockIns(params) {
    return request({
        url: "/rfid/android/api/stockIns",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 * 入库单详情
 * @param params
 * @returns {PromiseLike<T> | Promise<T>}
 */
export function stockIns_detail(params) {
    return request({
        url: "/rfid/android/api/stockIns/detail",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 确认入库
 * @param params
 * @returns {PromiseLike<T> | Promise<T>}
 */
export function post_stockIn(data) {
    return request({
        url: "/rfid/android/api/stockIns",
        method: 'post',
        data:data
    }).then(res => res.data.data)
}



