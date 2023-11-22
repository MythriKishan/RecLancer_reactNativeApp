import React, { Component,useEffect,useState } from "react";
import { StyleSheet,View,Text,Button, Alert } from "react-native";
import RegInput from "../components/RegInput";
import Category from "../models/category";
import Header from "../components/Header";
import Buttons from "../components/Buttons";
import { TextInput } from "react-native-paper";

function FreeReg({route}){
   const catId = route.params.categoryId;
   const [Mode,setMode] = useState(false)

   const [error,setError] = useState("");
   const [email,setEmail] = useState("");
   const [mob,setMob] = useState("");
   const [pass,setPass] = useState("");
   const [cpass,setCPass] = useState("");
   const [eError, seteError] = useState("");
   const [mError,setmError] = useState("");
   const [pError,setpError] = useState("");   

   const RegHandler = () => {

    /**Email Validation **/
    /*let reg_mail = /^\S+@\S+\.\S+$/; 
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
    }*/

    /**Mobile Validation **/
   /* let reg_mob = /^[0-9]{10}$/;
    if(mob.trim() === "")
    {
      setmError('Mobile is Required!');
    }
    else if(reg_mob.test(mob) === false)    
    {
      setmError('Enter Valid Mobile Number!');
      }  
    else{
      setmError('');
    }*/

    /*Password Validation*/
    let reg_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if(pass.trim() === "")
    {
      setpError('Password is Required!');
    }
    if(reg_pass.test(pass) == false)
    {
      setpError('Invalid Password!');
    } 
    else{
      setpError('');
    } 
    
    
     /**Password and Confirm Password **/
   /*if(pass != cpass)
   {
      Alert.alert("Password Mismatch")
   }*/

   if((reg_mail.test(email) === true) && (reg_pass.test(pass) === true))  
    {
    fetch('https://reclancer.com/reactnative/appfree_reg.php', {
     method: 'POST',
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    email: email,
    num : mob,     
    password: pass
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => { 

      console.log(responseJson)
      
      }).catch((error) => {
        console.error(error);
      });
      }
   else{
    setError('Fill in all required fields!')

  }
    
   }

  
  
   const cancelHandler = () => {

    console.log("Cancel Function")
    
   }


    return (
        
        <View style={styles.screen}>

        <View style={styles.headerStyle}>
        {/* Header reusable component*/ }
        <Header title="Registration Form" style={styles.headerTitle}/>
        </View>

        <TextInput
          style={styles.inputStyle}
          label="Email"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(email) => setEmail(email)}
          />
          <Text style={styles.errorText}>{eError}</Text>    

        <TextInput
          style={styles.inputStyle}
          label="Mobile"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(mob) => setMob(mob)}
          onFocus={()=>{
            let reg_mail = /^\S+@\S+\.\S+$/; 
            if(email != "")
            {            
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
            }
            else{
              seteError('Enter Vaild email');
            }
          }}
          />
          <Text style={styles.errorText}>{mError}</Text>

         <TextInput
          style={styles.inputStyle}
          label="Password"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(pass) => setPass(pass)}
          onFocus={()=>{
            if(mobile != '')
            {
              let reg_mob = /^[0-9]{10}$/;
              if(mob.trim() === "")
              {
                setmError('Mobile is Required!');
              }
              else if(reg_mob.test(mob) === false)    
              {
                setmError('Enter Valid Mobile Number!');
                }  
              else{
                setmError('');
              }
            }
            else{
              setmError('Enter 10 digit Mobile Number')
            }
          }}

          />
          <Text style={styles.errorText}>{pError}</Text>

         <TextInput
          style={styles.inputStyle}
          label="Confirm Password"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(cpass) => setCPass(cpass)}
          />

          {/*<Button title="Login" 
          onPress={LoginHandle}/>*/}
          <View style={styles.btnHolder}>
          <Buttons text="Submit" onPress={RegHandler}/>
          <Buttons text="Cancel"/>
          </View>
         
 </View>
       
    )


}

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

export default FreeReg;
 