//接口请求函数模块：统一管理API【切记要按请求逻辑顺序来写接口】

import service from './ajax';

//获取商品的三级分类列表接口
export const reqBaseCategoryList = () => service.get('/product/getBaseCategoryList');

//搜索获取List列表接口 post
export const reqGetSearchInfo = (params) => service({ url: "/list", method: "post", data: params });

//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone)=>service({url:`/user/passport/sendCode/${phone}`,method:'get'});//【最好写成这种格式接口】

// 注册Register接口
export const reqUserRegister = (data) => service.post('/user/passport/register', data);

// 登录  /api/user/passport/login
export const reqUserLogin = (data)=>service({url:'/user/passport/login',data,method:'post'});

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = ()=>service({url:'/user/passport/auth/getUserInfo',method:'get'});

//退出登录
//URL:/api/user/passport/logout  get
export const reqLoginOut = ()=> service({url:'/user/passport/logout',method:'get'});
