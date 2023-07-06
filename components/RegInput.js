import react ,{useReducer, useState} from "react";
import {StyleSheet,View,Button,Modal,Text} from "react-native";
import Buttons from "./Buttons";
import Header from "./Header";
import { TextInput } from "react-native-paper";
//import { InputOutline} from 'react-native-input-outline';

const RegInput = props => {

    const [email , setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [password,setPass] = useState("");
    const [cpass,setCPass] = useState("");
    
    return(
       
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

        <TextInput
          style={styles.inputStyle}
          label="Mobile"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(mobile) => setMobile(mobile)}
          />

         <TextInput
          style={styles.inputStyle}
          label="Password"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(password) => setPass(password)}
          />

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
          <Buttons text="Submit"/>
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
    


    }

});

export default RegInput;