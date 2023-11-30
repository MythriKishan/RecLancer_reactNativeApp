import React from "react";
import { StyleSheet,Text,View } from "react-native";
import Header from "../../components/Header";
import { connect } from "react-redux";

const SuccessPage = () => {

return(
<View style={styles.screen}>    
    <View style={styles.textCont}>
     
    <Text style={styles.textStyle}>Recruiter Ad Post Successful</Text>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);

const styles = StyleSheet.create({
screen:{
 flex:1,
 margin:20
},
headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40

},
headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:'OpenSans-bold',
    fontSize:20,
    color:'white'
    
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