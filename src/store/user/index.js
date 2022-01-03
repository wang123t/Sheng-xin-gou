import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqLoginOut,
    reqUserInfo
} from '@/api';
import { setToken, getToken, removeToken } from "@/tokens/token";

//登录与注册模块
const state = {
    code: "",
    token: getToken('TOKEN'),
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;//成功登录,收集token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //退出登录后清除本地数据
    CLEAR_TOKEN(state) {
        //帮仓库中用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储数据清空
        removeToken();
    }
};

const actions = {
    //获取验证码
    async GetCode({ commit }, phone) {
        //获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //用户注册
    async UserRegister({ commit }, data) {
        let result = await reqUserRegister(data);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        //服务器下发token，用户唯一标识符(uuid)
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            //用户已经登录成功且获取到token
            commit("USERLOGIN", result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error("手机号或密码错误"));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code === 200) {
            //提交用户信息
            commit("GETUSERINFO", result.data);
            return 'ok';
        }
    },
    //退出登录
    async userLoginOut({ commit }) {
        //只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLoginOut();
        console.log("退出成功")
        //action里面不能操作state，提交mutation修改state
        if (result.code == 200) {
            commit("CLEAR_TOKEN");
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
};
