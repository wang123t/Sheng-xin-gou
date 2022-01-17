import { reqGoodsInfo, reqAddshopcart } from '@/api'
import { getNANOID } from '@/tokens/nanoid_token';

const state = {
    goodsInfo: {},
    //临时id
    nanoid_token: getNANOID()
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    }
}
const actions = {
    //获取商品信息
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //获取加入购物车的信息（后端并没有返回数据，所以不需要存state）
    async getAddshopcart({ commit }, { skuId, skuNum }) {
        let result = await reqAddshopcart(skuId, skuNum);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('fail'));
        }
    }
}
const getters = {
    //简化仓库的数据
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}