import React, { Component,useEffect,useReducer,useState,useRef } from "react";
import { StyleSheet,View,Text,Button,Alert, TouchableOpacity, } from "react-native";
import Header from "../components/Header";
import { TextInput } from "react-native-paper";
import Buttons from "../components/Buttons";
//import { set } from "react-native-reanimated";
import { connect } from 'react-redux'
import actions from './actions';
import { NavigationRouteContext } from '@react-navigation/native';
import { FirebaseAuthApplicationVerifier, FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';

const FreeMLogin = ({route,navigation}) =>{

  const [mobile, setMobile] = useState('');
  const [merror, setMerror] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [code, setCode] = useState('');
  const [data, setData] = useState('');


 
    LoginHandler = async (event) => {

      /**Email and Password or Mandatory **/
      if (mobile === '') {
        setError('Please enter Registered Mobile Number');
        return;
      }
  
  
      /** Mobile Number Validation **/
      if (mobile === "") {
        setMerror("Enter Valid Mobile Number");
      }
      else {
        setMerror("");
  
  
        let reg_mob = /^((\+91))[7-9]\d{9}$/;
        if (reg_mob.test(mobile) === false) {
          //Alert.alert("Enter 10 digit Mobile number!!")
          setMerror("Enter Valid 10 digit number with country code +91 in format +9188*******8");
          return false;
        }
        else {
          setMerror("");
        }
  
        /* let reg_mob = /^[0-9]{10}$/;
         if (reg_mob.test(mobile) === false) {
           //Alert.alert("Enter 10 digit Mobile number!!")
           setMerror("Enter Valid 10 digit mobile number.");
           return false;
         }
         else {
           setMerror("");
         }*/
      }
  
      if (mobile != '') {
        fetch('https://reclancer.com/reclancerapi/FMlogin.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
  
            num: mobile,
  
          })
  
        }).then((response) => response.json())
          .then((responseJson) => {
  
            console.log(responseJson);
  
            if (responseJson.code === 200) {
  
           
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            phoneProvider.verifyPhoneNumber(mobile, recaptchaVerifier.current)
              .then(setVerificationId);
              setMobile('');
              //setMobile('');
              setData(responseJson);
            }
            else {
              Alert.alert("Not a Registered Mobile Number")
            }
            /* navigation.navigate('OTP',
              {
                motp : responseJson.otp,
                mobile:mobile
            });*/
            /*if(jsonObj.status === 'success')
             {  
       
              this.props.navigation.navigate('Second',
              {otp:responseJson.otp,
              mobile:mob
              });
      
          }
          else if(responseJson === "400"){
      
            Alert.alert("Failed to send SMS.Please check if the Number is registered")
          }
          else{
            Alert.alert("Failed!")
          }*/
  
  
          }).catch((error) => {
            console.error(error);
          });
  
      }
  
    }
  
    
  
  
    const confirmCode = () => {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      firebase.auth().signInWithCredential(credential).then(() => {
        setCode('');
        var id = data.id;
        //console.log(id);
        var token = data.jwt;
        //console.log(token);
  
        navigation.navigate('Drawer',
        {screen: 'Freelancer Home',
        params:{          
            id:id,
            token:token
          },            
        });
      })
        .catch((error) => {
          Alert.alert('Error:', error.message)
        })
  
      // Alert.alert("Login Successfull");
  
      //console.log(data);
  
    }
  
    return(      
       
        <View style={styles.screen}>
 
 <View style={styles.headerStyle}>
                 
                 <Text style={styles.headerText}>Freelancer Mobile Login</Text>
                 </View>
 
        <Text style={styles.errorText}>{error}</Text>
        <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}/>
        
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

          <View style={styles.btnCont}>
          <TouchableOpacity style={styles.button} onPress={LoginHandler}><Text style={styles.btnText}>Send OTP</Text></TouchableOpacity>
          </View>

            <TextInput
          style={styles.inputStyle}
          placeholder="Confirm Code"
          editable={!!verificationId}
          
          onChangeText={setCode}
          keyboardType="number-pad"
        />
        <Text style={styles.errorStyle}>{merror}</Text>

        <View style={styles.btnCont}>
        
        <TouchableOpacity style={styles.button} onPress={confirmCode}><Text style={styles.btnText}>Confirm OTP</Text></TouchableOpacity>
        </View>
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
    headerStyle: {
      justifyContent: 'center',
      alignItems: 'center',

  },
  headerTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      color:'white',
      fontFamily:'OpenSans-bold'
  },
  headerText:{               
    fontFamily:'OpenSans-Bold',
    fontSize:20,
    fontWeight:'bold',       
    color:'#23211d'
    //color:'#363062'      
  },
      
    
    
 
 });
 
