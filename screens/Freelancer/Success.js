import React from "react";
import { StyleSheet,Text,View } from "react-native";
import Header from "../../components/Header";
import { connect } from "react-redux";

const Success = ({User,Token,route}) => {

return(
<View style={styles.screen}>    
<View style={styles.headerStyle}>
       {/* Header reusable component*/ }
       {/*<Header title="Login Page" style={styles.headerTitle}/>*/}
       <Text style={styles.headerTitle}>Freelancer Ad posted successfully</Text>
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


});