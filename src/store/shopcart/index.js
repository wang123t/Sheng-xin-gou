import { reqShopCart, reqDeleteCart, reqchangeChecked } from '@/api'
const state = {
    shopcartList: [],
};
const mutations = {
    SHOPCART(state, shopcartList) {
        state.shopcartList = shopcartList;
    }
};
const actions = {
    //获取加入购物车的信息
    async getShopcart({ commit }) {
        let result = await reqShopCart();
        commit('SHOPCART', result.data);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //删除购物车的某个商品（没有返回data）
    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //删除勾选的所以商品
    //这里在actions里再次派发actions，一个个删除勾选的商品
    //利用forEach()循环遍历，每一个都执行一次回调dispatch
    deleteAllCheckedCart({ dispatch, getters }) {
        let P = [];
        getters.shopcartList.cartInfoList.forEach(item => {
            let p = item.isChecked == 1 ? dispatch('deleteCart', item.skuId) : '';
            P.push(p)
        });
        //Promise数组中所有的promise对象都resolve，Promise.all(P)才成功
        return Promise.all(P);
    },
    //修改商品勾选状态
    async changeCartChecked({ commit }, { skuId, isChecked }) {
        let result = await reqchangeChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //全部勾选切换
    //利用forEach()循环遍历，每一个都执行一次回调dispatch
    isAllCartChecked({ dispatch, getters }) {
        let P = [];
        getters.shopcartList.cartInfoList.forEach(item => {
            let p = dispatch('changeCartChecked', { skuId: item.skuId, isChecked: item.isChecked });
            P.push(p)
        })
        return Promise.all(P)
    }
};
const getters = {
    shopcartList(state) {
        return state.shopcartList[0] || {}
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}