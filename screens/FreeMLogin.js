import React, { Component,useEffect,useReducer,useState,useRef } from "react";
import { StyleSheet,View,Text,Button,Alert, TouchableOpacity, } from "react-native";
import Header from "../components/Header";
import { TextInput } from "react-native-paper";
import Buttons from "../components/Buttons";
//import { set } from "react-native-reanimated";
import { connect } from 'react-redux'
import actions from './actions';

const FreeMLogin = ({route,navigation}) =>{

  const [mobile, setMobile] = useState('');
  const [merror, setMerror] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [code, setCode] = useState('');
  const [data, setData] = useState('');


  LoginHandler=()=>{
    Alert.alert("Mobile Number Entered");
  }

  confirmCode = () =>{
    Alert.alert("Received Code");
  }

    return(      
       
        <View style={styles.screen}>
 
        <View style={styles.headerStyle}>
        {/* Header reusable component*/ }
        <Header title="Mobile Login Page" style={styles.headerTitle}/>
        </View>
 
        <Text style={styles.errorText}>{error}</Text>
 
        <TextInput
          style={styles.inputStyle}
          placeholder = "Mobile Number"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={setMobile}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          />
          <Text style={styles.errorText}>{merror}</Text>

          <Buttons text="Send OTP" onPress={LoginHandler}/>
         
            <TextInput
          style={styles.inputStyle}
          placeholder="Confirm Code"
          editable={!!verificationId}
          
          onChangeText={setCode}
          keyboardType="number-pad"
        />
        <Text style={styles.errorStyle}>{merror}</Text>
        <Buttons text="Confirm OTP" onPress={confirmCode}/>
        </View>        
 
       
    )
 

}

const mapDispatchToProps = dispatch => {
    return {
      userId: (id) => dispatch(actions.action_userid(id)),  
      TokenId:(token) => dispatch(actions.action_token(token)),
    }
  }
    
  const mapStateToProps = (state /*, ownProps*/) => {
    //console.log(state.appstate.userid+"userjkdjfasdkjfakj")
    //console.log(state.appstate.token+"userjkdjfasdkjfakj")
    return {
      //GetGoalScore: state.appstate.GoalScore
  
  
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FreeMLogin)

  const styles = StyleSheet.create({

    screen:{
        flex:1,        
        margin:20
    },
    headerStyle:{
        justifyContent:'center',
        alignItems:'center',
       
    },

    textInputStyle: {
        color: '#000',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#f1ddc3',
        borderColor: '#fff',
        marginHorizontal: 20,
        margin: 10,
      },
    btnStyle: {
        margin: 10,
        backgroundColor: '#4aa567',
        height: 50,
        width: '70%',
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center'
      },
      resetStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        margin: 10
      },
      loginBtn: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
      },
    headerTitle:{
        justifyContent:'center',
        alignItems:'center',
    },
    inputStyle:{
         margin:15,
         width:250,
         height:50,
         borderColor:'grey',
         borderRadius:4,
         borderWidth:1
 
    },
    btnHolder:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'stretch'
    },
    errorText:{
     fontSize:12,
     fontFamily:'OpenSans-bold',
     color:'red'
    }
 
 });
 
