import React,{useEffect, useState}from "react";
import { StyleSheet,Text,View,FlatList,TouchableOpacity,Alert,Button,ScrollView} from "react-native";
import Header from "../../components/Header";
import { connect } from "react-redux";

const RImage_success = ({User,navigation,Token,route}) => {

    return(

<View>
   <View  style={styles.headerStyle}>
    <Text style={styles.errorText}>Files Edited Successfully</Text>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(RImage_success);

const styles = StyleSheet.create({
screen:{
 flex:1,
 margin:20
},
headerStyle:{    
  justifyContent:'center',
  alignItems:'center',
  

 },
 headerText:{               
     fontFamily:'OpenSans-Bold',
     fontSize:20,
     fontWeight:'bold',       
     color:'#23211d'
     //color:'#363062'      
 },
listItem: {
  borderRadius: 6,
  paddingHorizontal: 8,
  paddingVertical: 8,
  marginVertical: 4,
  marginHorizontal: 12,
  backgroundColor: '#EEEEEE',
},
itemText: {
  color: '#65451F',
  fontSize:20,
  fontStyle:'normal',
  fontWeight:'bold',
  textAlign: 'left',
},
flatlist:{
  padding:0
},
btnHolder: {
flexDirection: 'row',
justifyContent: 'space-evenly',
alignItems: 'stretch'  

}, 
title:{
fontSize:18,
fontWeight:'bold',
color:'#413C69',      
fontStyle: 'italic',
textAlign:'center'
},
btnText:{
color:'#FFFFFF',
fontWeight:'bold',
fontSize:16
},
btnCont:{
flexDirection:"row",
justifyContent:'space-evenly',
alignItems:'center'
},
button: {
marginTop: 30,
width: '40%',
padding: 20,
justifyContent:'center',
alignItems:'center',        
//backgroundColor: '#413C69',
backgroundColor:'#413C69',
borderRadius:8,
shadowColor: 'rgba(0,0,0, .4)', // IOS
shadowOffset: { height: 1, width: 1 }, // IOS
shadowOpacity: 1, // IOS
shadowRadius: 1, //IOS        
elevation: 2, // Android
},
errorText:{
    fontSize:20,
    fontFamily:'OpenSans-bold',
    color:'red',
    paddingLeft:20,
    paddingVertical:100,   
    
   },

});