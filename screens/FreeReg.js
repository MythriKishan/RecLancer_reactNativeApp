import React, { Component,useEffect,useState,useRef } from "react";
import { StyleSheet,View,Text,Button, Alert ,Pressable,TouchableOpacity} from "react-native";
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
       <Text style={styles.headerText}>Register As Freelancer</Text>
       </View>

        <Text style={styles.titleStyle}>Mobile<Text style={{color: 'red'}}> *</Text></Text>
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
       
       <Text style={styles.titleStyle}>Password<Text style={{color: 'red'}}> *</Text></Text>
         <TextInput
          style={styles.inputStyle}
          theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
          mode="outlined"
          //label="Email"
          label={
           <Text>
                Password
                <Text style={{color: 'red'}}> *</Text>
           </Text>
          }
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

         
<View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={RegHandler}><Text style={styles.btnText}>Register</Text></TouchableOpacity>
     <TouchableOpacity style={styles.button} onPress={cancelHandler}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
     </View>
          
        
 </View>
       
    )


}

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
      fontSize:16
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
export default FreeReg;
 