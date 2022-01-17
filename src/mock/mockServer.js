import Mock from 'mockjs'
import banners from './banner.json'//引入外部资源
import rankList from './rank.json'
import likeList from './like.json'

//注册banners数据接口
Mock.mock('/mock/banners','get', {
    code: 200,
    data: banners
})

//注册rank数据接口
Mock.mock('/mock/rank', 'get', {
    code: 200,
    data:rankList
})
//注册like数据接口
Mock.mock('/mock/like', 'get', {
    code: 200,
    data:likeList
})