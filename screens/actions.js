export const USERID= "USERID";
export const TOKEN ="TOKEN";  
export const RESET ="RESET";


export function action_userid(id){
    return {type:USERID,id}
}

export function action_token(token){
    return {type:TOKEN,token}
}


export default {USERID,action_userid,TOKEN,action_token}