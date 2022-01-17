//vuex管理的home模块
import { reqBaseCategoryList, reqBanners, reqRankList,reqLikeList } from "@/api";

const state = {
    baseCategoryList: [],//用于贮存数据
    bannerList: [],
    rankList: [],
    likeList:[]
}
const mutations = {
    //接收保存分类列表
    RECEIVE_BASE_CATEGORY_LIST(state, list) {
        state.baseCategoryList = list
    },
    //接受banner,rank数据
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETRANKLIST(state, rankList) {
        state.rankList = rankList
    },
    GETLIKELIST(state,likeList) {
        state.likeList = likeList
    }
}
const actions = {
    // 异步获取商品三级分类列表
    async getBaseCategoryList({ commit }) {
        const result = await reqBaseCategoryList();
        if (result.code === 200) {
            commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
        }
    },
    //获取banners数据
    async getBannersList({ commit }) {
        let result = await reqBanners();
        commit('GETBANNERLIST', result.data);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //获取rankList数据
    async getRankList({ commit }) {
        let result = await reqRankList();
        commit('GETRANKLIST', result.data);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //获取likeList数据
    async getLikeList({ commit }) {
        let result = await reqLikeList();
        commit('GETLIKELIST', result.data);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}