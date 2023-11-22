import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Platform,
  Modal
} from "react-native";

import { connect } from "react-redux";
import ImageViewer from "react-native-image-zoom-viewer";

const ImageZoom = ({ User, Token, navigation, route }) => {
    const { imgname} = route.params;
   //console.log(imgname);
   
   let images = [];
    var obj = {
      id:1,
      url:"https://bztran.com/User_project/" + imgname
    }
    images.push(obj)
  
        return (
          <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                <ImageViewer menuContext={true} index={0} show={false} imageUrls={imgname}
                style={{ 
                  width:'100%',
                  height:'100%',
                  }} />
            </SafeAreaView>
        )           
    
  
};

const mapDispatchToProps = (dispatch) => {
  return {
    userId: (id) => dispatch(actions.action_userid(id)),
    TokenId: (token) => dispatch(actions.action_token(token)),
  };
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    //GetGoalScore: state.appstate.GoalScore
    User: state.appstate.userid,
    Token: state.appstate.tokenid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageZoom);

const styles = StyleSheet.create({
  textInputStyle: {
    color: "#000",
    borderWidth: 1,
    padding: 15,
    borderColor: "#4aa567",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  listMain: { shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginTop:8,
    borderRadius: 6,
    margin:6,
    backgroundColor: 'white'
  },
  lines:{
    position:'absolute', 
    backgroundColor:"#565e5e",
    width:8,height:"100%",
    elevation:3,
    borderTopLeftRadius:6,
    borderBottomLeftRadius:6
},
values:{ 
  fontSize: 16,
  color:'#565e5e',
  fontWeight:'bold',
  paddingTop:4,
  marginLeft:20,
  textDecorationLine:'underline'
},
videoContainer:{
  padding:8, 
  marginVertical:8,
  borderRadius:14, 
  marginHorizontal:6,
  backgroundColor:'white',
  height:"94%",
  shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
},
audioContainer:{
  padding:8,
  justifyContent:'center',
  marginVertical:8,
  borderRadius:14, 
  marginHorizontal:6,
  backgroundColor:'white', 
  height:"95%",
  shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
},
nameBox:{
  backgroundColor:"#565e5e",
  elevation:3,
  width:'50%',
  alignSelf:'center',
  borderBottomRightRadius:8,
  borderBottomLeftRadius:8
},
nameTxt:{
  fontWeight:'bold',
  fontSize:16,
  color:"white",
  alignSelf:'center',
  padding:6
},
roundTxt:{
  borderWidth:0.8,
  borderRadius:20,
  borderColor:'#E76161',
  padding:8,
  fontWeight:'500',
  color:'#565e5e',
  fontSize:14,
  marginHorizontal:5
},
icon:{
  tintColor:'#565e5e',
  height:20,
  width:20,
  alignSelf:'center'
},
iconContainer:{
  justifyContent:'center',
  height:40,
  width:40,
  backgroundColor:'#E76161',
  borderRadius:20,
  elevation:3,
  shadowColor: 'black',
  shadowOpacity: 0.26,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 8
},
iconHeading:{
  paddingLeft:4,
  color:'gray',
  fontWeight:'400'
},
iconValue:{
  paddingLeft:4,
  color:'#565e5e',
  fontWeight:'bold',
  fontSize:14
},
mainCon:{
  flexDirection:'row',
  marginTop:20,
  marginLeft:20
},
detailHeading:{ 
  paddingTop:4,
  fontSize: 16,
  color:"#E76161",
  fontWeight:'600'
},
detailValues:{ 
  fontSize: 16,
  paddingTop:4,
  fontWeight: 'bold',
  color:'#565e5e',
  fontWeight:'600'
},
});


