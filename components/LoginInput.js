import react ,{useState} from "react";
import {StyleSheet,View,Button,Modal,Text} from "react-native";
import Buttons from "./Buttons";
import Header from "./Header";
import { TextInput } from "react-native-paper";
//import { InputOutline} from 'react-native-input-outline';

const LoginInput = ({onSubmit,initialValues}) => {
    let validation;

    const [email , setEmail] = useState("");
    const [password,setPass] = useState("");

    const LoginHandle = () =>{
        props.onLogin(email,password);
        setEmail('');
        setPass('');
    }
 
    return(
       
       
        <View style={styles.screen}>

        <View style={styles.headerStyle}>
        {/* Header reusable component*/ }
        <Header title="Login Page" style={styles.headerTitle}/>
        </View>

        <TextInput
          style={styles.inputStyle}
          label="Email"
          theme={{colors: {primary: '#069A8E'}}}
          //placeholder = "Enter Email"
          onChangeText={(email) => setEmail(email)}
          />
           {validation.email && <p>{validation.email}</p>}
          
          <TextInput
          style={styles.inputStyle}
          placeholder = "Enter Password"
          secureTextEntry={true}
          onChangeText={(password) => setPass(password)}
          />
          {validation.password && <p>{validation.password}</p>}

          {/*<Button title="Login" 
          onPress={LoginHandle}/>*/}
          <View style={styles.btnHolder}>
          <Buttons text="Submit" onPress={() => onSubmit(email,password)}/>
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

export default LoginInput;