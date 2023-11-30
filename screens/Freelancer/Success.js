import React from "react";
import { StyleSheet,Text,View } from "react-native";
import Header from "../../components/Header";
import { connect } from "react-redux";

const Success = ({User,Token,route}) => {

return(
<View style={styles.screen}>    
<View style={styles.textCont}>
      
       <Text style={styles.textStyle}>Freelancer Ad posted successfully</Text>
       </View>
</View>
)
}

const mapDispatchToProps = (dispatch) => {
    return {
      userId: (id) => dispatch(actions.action_userid(id)),
      TokenId: (token) => dispatch(actions.action_token(token)),
    };
  };
  
  const mapStateToProps = (state) => {
    return {
      User: state.appstate.userid,
      Token: state.appstate.tokenid,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Success);

const styles = StyleSheet.create({
screen:{
 flex:1,
 margin:20
},
headerStyle:{
  justifyContent:'center',
  alignItems:'center',      
},
headerTitle:{     
  fontFamily:'OpenSans-Bold',
  fontSize:20,
  fontWeight:'bold',
  color:'#967E76'
},
textCont:{
  
  justifyContent:'center',
  alignItems:'center'
 },

 textStyle:{
   fontFamily:'OpenSans-Bold',
   fontSize:18,
   fontWeight:'bold',
   color:'#FC6C85',
   margin:20


 },



});