//储存token
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}

//获取token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}

//清除本地存储的token
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
}
//存储userName
export const setUserName = (name) => {
    localStorage.setItem("NAME", name);
}
//清除userName
export const removeName = () => {
    localStorage.removeItem('NAME')
}