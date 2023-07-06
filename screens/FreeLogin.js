import React, { Component,useEffect,useReducer,useState } from "react";
import { StyleSheet,View,Text,Button,Alert } from "react-native";
import LoginInput from "../components/LoginInput";
import Category from "../models/category";
import FreePostAd from "./Freelancer/FreePostAd";
import Buttons from "../components/Buttons";
import Header from "../components/Header";
import { TextInput } from "react-native-paper";
//import { set } from "react-native-reanimated";
import { connect } from 'react-redux'
import actions from './actions';


function FreeLogin({navigation,route,props}){

  const initValues = {
    
    email: '',
    password: ''
     
  }
   const catId = route.params.categoryId;
   const [Mode,setMode] = useState(false)
   
   const [email , setEmail] = useState("");
   const [password,setPass] = useState("");
   const [eError, seteError] = useState("");
   const [pError,setpError] = useState("");
   const [error,setError] = useState("");  
    

   const LoginHandler=()=>{
    
    console.log(email);
    console.log(password);    

    /**Email Validation **/
    let reg_mail = /^\S+@\S+\.\S+$/; 
    if(email.trim() === "")
    {
      seteError('Email is Required!');
    }
    else if(reg_mail.test(email) === false)    
    {
      seteError('Enter Valid email Id!');
      }  
    else{
      seteError('');
    }

    /*Password Validation*/
    let reg_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if(password.trim() === "")
    {
      setpError('Password is Required!');
    }
    if(reg_pass.test(password) == false)
    {
      setpError('Invalid Password!');
    } 
    else{
      setpError('');
    }  

    if(email != " " && password != " ")  
    {
    fetch('https://reclancer.com/reclancerapi/appfree_login.php', {
     method: 'POST',
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    email: email,     
    password: password
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => { 

       
       if(responseJson.code === 200)
       {
        console.log(JSON.stringify(responseJson)+"data source value");
        var id = responseJson.id;
        console.log(id);
        var token = responseJson.jwt;
        console.log(token);

        //Alert.alert("Success");
        navigation.navigate('Drawer',
        {screen: 'Freelancer Home',
        params:{          
            id:id,
            token:token
          },            
        });
       
       }
       else{
        //console.log("Failure");
        //Alert.alert("Incorrect Email Or Password");
        setError('Incorrect Email Or Password!!')
       }           
       
      }).catch((error) => {
        console.error(error);
      });
      }
   else{
    setError('Fill in all required fields!')

  }

    
 }

  const cancelHandler = () => {
   
    
  }

  const MLogin = () =>{
    navigation.navigate('Freelancer Mobile Login');
  }
  

 
        {/*ReUsable LoginInput Form component*/} 
          {/*<LoginInput onSubmit={()=>navigation.navigate('Drawer')}/>*/}

          {/*<LoginInput onSubmit={(email,password)=> LoginHandler(email,password)}/>*/}

          return(      
       
       <View style={styles.screen}>

       <View style={styles.headerStyle}>
       {/* Header reusable component*/ }
       <Header title="Login Page" style={styles.headerTitle}/>
       </View>

       <Text style={styles.errorText}>{error}</Text>

       <TextInput
         style={styles.inputStyle}
         placeholder = "Enter Email"
         theme={{colors: {primary: '#069A8E'}}}
         //placeholder = "Enter Email"
         onChangeText={(email) => setEmail(email)}
         />
         <Text style={styles.errorText}>{eError}</Text>          
         
         <TextInput
         style={styles.inputStyle}
         placeholder = "Enter Password"
         secureTextEntry={true}
         onChangeText={(password) => setPass(password)}
         />
        <Text style={styles.errorText}>{eError}</Text>

         {/*<Button title="Login" 
         onPress={LoginHandle}/>*/}
         <View style={styles.btnHolder}>
         <Buttons text="Submit" onPress={LoginHandler}/>
         <Buttons text="Cancel" onPress={cancelHandler}/>
         </View>    
         <Buttons text="Mobile Login" onPress={MLogin}/>     
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
)(FreeLogin)


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

//export default FreeLogin;