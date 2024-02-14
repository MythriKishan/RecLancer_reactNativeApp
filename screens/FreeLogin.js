import React, { Component,useEffect,useReducer,useState } from "react";
import { StyleSheet,View,Text,Button,Alert,TouchableOpacity } from "react-native";
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
   const[active,setActive] = useState('');
    

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
  navigation.navigate('Home')
 
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
    <Text style={styles.headerText}>Login as Freelancer</Text>
    </View>


       <Text style={styles.errorText}>{error}</Text>

       <Text style={styles.titleStyle}>Email<Text style={{color: 'red'}}> *</Text></Text>
       <TextInput
         style={styles.inputStyle}
         theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
       mode="outlined"
       //label="Email"
       label={
        <Text>
             Email
             <Text style={{color: 'red'}}> *</Text>
        </Text>
        }
               
         onChangeText={(email) => setEmail(email)}
         />
         <Text style={styles.errorText}>{eError}</Text>          
         

         <Text style={styles.titleStyle}>Password<Text style={{color: 'red'}}> *</Text></Text>
         <TextInput
         style={styles.inputStyle}
         theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
         mode="outlined"
         //label="Password"
         label={
          <Text>
               Password
               <Text style={{color: 'red'}}> *</Text>
          </Text>
         }
         secureTextEntry={true}
        
         onChangeText={(password) => setPass(password)}
         inputContainerStyle={{borderBottomWidth:0}}
         onFocus={()=>{
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
      let reg_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if(password.trim() === "")
      {
        setpError('Password is Required!');
      }
      if(reg_pass.test(password) == false)
      {
        setpError('Password must contain at least eight characters, at least one number and both lower and uppercase letters!');
      } 
      else{
        setpError('');
      }  
        }}
         />
        <Text style={styles.errorText}>{pError}</Text>

        
         <View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={LoginHandler}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
     <TouchableOpacity style={styles.button} onPress={cancelHandler}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
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
)(FreeLogin)


const styles= StyleSheet.create({
  screen:{
    flex:1,
    margin:20
  },
  headerStyle:{    
   justifyContent:'center',
   alignItems:'center'
  },
  headerText:{               
      fontFamily:'OpenSans-Bold',
      fontSize:20,
      fontWeight:'bold',       
      color:'#23211d'
      //color:'#363062'      
  },
  formCont:{       
      justifyContent:'center',
      alignItems:'center',
      borderColor:'blue',
  },
  phoneContainer: {
      width: '80%',
      height: 50,
      borderRadius:4
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
    textInput: {
      paddingVertical: 0,
    },
    titleStyle:{
      margin:12,
      //color:'#413C69',
      fontStyle: 'italic',
      color:'#23211d',
      fontFamily:'OpenSans-Bold',
      fontSize:18,
      fontWeight:'800'
    },
    inputStyle:{            
      width:'80%',
      height:50,        
      backgroundColor:'#FFFFFF',
      outlineColor:'white',
      activeoutlineColor:'#6B240C',
      borderRadius:1,
      borderColor:'#C5DFF8'    
  },
  btnText:{
      color:'#FFFFFF',
      fontWeight:'bold',
      fontSize:18
  },
  btnCont:{
      flexDirection:"row",
      justifyContent:'space-evenly',
      alignItems:'center'
  },
  errorText:{
    fontSize:12,
    fontFamily:'OpenSans-bold',
    color:'red'
   }



})