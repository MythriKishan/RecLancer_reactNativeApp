import React, { Component,useEffect,useState,useRef } from "react";
import { StyleSheet,View,Text,Button, Alert ,Pressable} from "react-native";
import RegInput from "../components/RegInput";
import Category from "../models/category";
import Header from "../components/Header";
import Buttons from "../components/Buttons";
import { TextInput } from "react-native-paper";
import PhoneInput from 'react-native-phone-number-input';
import { useFocusEffect } from '@react-navigation/native';


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
   
   const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };

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

   let reg_mail = /^\S+@\S+\.\S+$/;
   if((reg_mail.test(email) === true) && (reg_pass.test(pass) === true))  
    {
    fetch('https://reclancer.com/reclancerapi/appfree_reg.php', {
     method: 'POST',
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    email: email,
    num : phoneNumber,     
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

    
    
   }


    return (
        
        <View style={styles.screen}>

<View style={styles.headerStyle}>
       {/* Header reusable component*/ }
       {/*<Header title="Login Page" style={styles.headerTitle}/>*/}
       <Text style={styles.headerTitle}>Freelancer Register</Text>
       </View>

        <Text style={styles.titleStyle}>Mobile</Text>
        <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="IN"
        layout="first"
        withShadow
        autoFocus
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
        //textContainerStyle={styles.inputStyle}
        onChangeFormattedText={text => {
          setphoneNumber(text);
        }}
        onFocus={()=>{
          if(phoneNumber === '')
          {
            setmError('Enter Mobile Number');
          }
          else{
            setmError('');
          }
        }}
      />
      <Text style={styles.errorText}>{mError}</Text>

      <Text style={styles.titleStyle}>Email</Text>
        <TextInput
          style={styles.inputStyle}         
          label="Email"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(email) => setEmail(email)}
          onFocus={()=>{
            if(phoneNumber != '')
            {
              let reg_mob = /^[0-9]{10}$/;
             if(reg_mob.test(phoneNumber) === false)    
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
          <Text style={styles.errorText}>{eError}</Text>    

       {/*} <TextInput
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
        />*/}
       
       <Text style={styles.titleStyle}>Password</Text>
         <TextInput
          style={styles.inputStyle}
          label="Password"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(pass) => setPass(pass)}
          onFocus={()=>{
            let reg_mail = /^\S+@\S+\.\S+$/;
            if(email != "" && reg_mail.test(email) === true)
            {     
              seteError('');              
                
              }
              else 
                {
                  seteError('Enter Valid email ID')
                }

              if(pass === ''){
                setpError('Enter Password');
              }
              else{
                let reg_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
               
                if(reg_pass.test(pass) === false)
                 {
                  setpError('Invalid Password!');
                 } 
               else{
                 setpError('');
                 } 
              }
            
           
          }}
          

          />
          <Text style={styles.errorText}>{pError}</Text>

         {/*<TextInput
          style={styles.inputStyle}
          label="Confirm Password"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(cpass) => setCPass(cpass)}
        />*/}

          {/*<Button title="Login" 
          onPress={LoginHandle}/>*/}
          <View style={styles.btnHolder}>
          {/*<Pressable style={styles.button} onPress={() => buttonPress()}>
        <Text style={styles.continueText}>Get Phone Number</Text>
        </Pressable>*/}
          <Buttons text="Submit" onPress={RegHandler}/>
          <Buttons text="Cancel" onPress={cancelHandler}/>
          </View>
         
 </View>
       
    )


}

const styles = StyleSheet.create({

    screen:{
        flex:1,        
        margin:20,
        backgroundColor:'#F4EAD5'
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
  inputStyle:{
    margin:15,
    width:'80%',
    height:40,
    borderColor:'#D7C0AE',
    borderBottomColor: "#65451F",
    borderRadius:10,
    underlineColorAndroid:"transparent",
    borderWidth:1,
    backgroundColor:'#FFFFFF',

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
       phoneContainer: {
        width: '75%',
        height: 50,
      },
      button: {
        marginTop: 30,
        width: '75%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      },
      textInput: {
        paddingVertical: 0,
      },
      titleStyle:{
        margin:20,
        color:'#6B240C',
        fontFamily:'OpenSans-Bold',
        fontSize:18,
        fontWeight:'bold'

      }

});

export default FreeReg;
 