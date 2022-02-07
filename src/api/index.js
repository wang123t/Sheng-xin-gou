//接口请求函数模块：统一管理API【切记要按请求逻辑顺序来写接口】

import service from './ajax';
import mockAjax from './Mock';

//mock数据模拟 获取banner,rank,like数据
export const reqBanners = () => mockAjax.get('/banners')
export const reqRankList = () => mockAjax.get('/rank')
export const reqLikeList = () => mockAjax.get('/like')

//获取商品的三级分类列表接口
export const reqBaseCategoryList = () => service.get('/product/getBaseCategoryList');

//搜索获取List列表接口 post
export const reqGetSearchInfo = (params) => service({ url: "/list", method: "post", data: params });

//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => service({ url: `/user/passport/sendCode/${phone}`, method: 'get' });//【最好写成这种格式接口】

// 注册Register接口
export const reqUserRegister = (data) => service.post('/user/passport/register', data);

// 登录  /api/user/passport/login
export const reqUserLogin = (data) => service({ url: '/user/passport/login', data, method: 'post' });

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = () => service({ url: '/user/passport/auth/getUserInfo', method: 'get' });

//退出登录
//URL:/api/user/passport/logout  get
export const reqLoginOut = () => service({ url: '/user/passport/logout', method: 'get' });

//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get
export const reqGoodsInfo = (skuId) => service({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中（获取更新某一个产品的个数）
//URL:/api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddshopcart = (skuId, skuNum) => service({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表数据接口
//URL:/api/cart/cartList   method:get 
export const reqShopCart = () => service({ url: `/cart/cartList`, method: 'get' })

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}   method:DELETE 
export const reqDeleteCart = (skuId) => service({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqchangeChecked = (skuId, isChecked) => service({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList GET
export const reqUserAddress = ()=>service({url:'/user/userAddress/auth/findUserAddressList',method:'get'}) 

//获取订单交易的接口
//URL:/api/order/auth/trade  GET
export const reqGetOrderTrade = () =>service({url:'/order/auth/trade',method:'get'})

//提交订单
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  POST
export const reqSubmitOrder=(tradeNo,data) =>service({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayOrderInfo=(orderId)=>service({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付状态信息
//URL:/api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId)=>service({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单列表
//URL：/api/order/auth/{page}/{limit} GET
export const reqMyOrderList = (page,limit)=>service({url:`/order/auth/${page}/${limit}`,method:'get'})