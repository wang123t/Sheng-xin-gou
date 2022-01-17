import { nanoid } from 'nanoid'
export const getNANOID = ()=>{
    let nanoid_token = localStorage.getItem('NANOIDTOKEN');
    if (!nanoid_token) {
        //没有临时id就生成一个,并且存一下
        nanoid_token = nanoid();
        localStorage.setItem('NANOIDTOKEN',nanoid_token)
    }
    return nanoid_token;
}
