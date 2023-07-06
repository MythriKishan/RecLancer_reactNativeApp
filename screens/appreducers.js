import * as actions from './actions'

let initialState={
    userid:"",
    tokenid:"",
    
}

function appstate(state = initialState, action) {
   
    switch(action.type){
        case actions.USERID:
            console.log("userid" +JSON.stringify(action.id))

            return {...state,userid:action.id}

        case actions.TOKEN:
            console.log("tokenid"+JSON.stringify(action.token))

            return {...state,tokenid:action.token}       
           
        default:
            return state    
    }
}

export default appstate