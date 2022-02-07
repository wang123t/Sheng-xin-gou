import { reqUserAddress, reqGetOrderTrade } from "@/api"
const state = {
    userAddress: [],
    orderInfo:[]
}
const mutations = {
    GETUSERADDRESS(state, userAddress) {
        state.userAddress = userAddress
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    //地址信息
    async getUserAddress({ commit }) {
        let result = await reqUserAddress();
        commit('GETUSERADDRESS', result.data)
    },
    //订单信息
    async GetOrderInfo({ commit }) {
        let result = await reqGetOrderTrade();
        commit('GETORDERINFO', result.data)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    orderInfo(state){
        return state.orderInfo.orderDetailVoList ||[]
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}