import React, { useState,useEffect } from "react";
import { StyleSheet,Text,View,Button,Image, Alert,TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";


const Raccount = ({User,Token,route,navigation}) => {

    const [current, setCurrent] = useState("test");
    const [data,setData] = useState(null);
    console.log(User+"Manage Ads")
    console.log(Token+"manage Ads")
    

    const submitHandler = () => {

        console.log(current);

        if(current != 'test')
       {
        if(current === '1')
        {
          navigation.navigate('Recruiter Hide Profile')
        }
        else{
            navigation.navigate('Recruiter Delete Account')
        }
    }
    else{
        Alert.alert("Selection is Mandatory");
    }
    }
    

return(
  
<View style={styles.screen}>
<View style={{ marginTop: 50 }}>
      <RadioButtonGroup
        containerStyle={{ marginBottom: 10 }}
        selected={current}
        onSelected={(value) => setCurrent(value)}
        radioBackground="#413C69"
      >
        <RadioButtonItem value="1" label={ <Text style={{ color: "#000000",fontSize:18,fontWeight:'bold' }}>Hide Profile</Text>}  />
        <RadioButtonItem
          value="2"
          label={
            <Text style={{ color: "#000000",fontSize:18,fontWeight:'bold' }}>Delete Account</Text>
          }
        />
      </RadioButtonGroup>
    </View>

   {/* <Button title="Submit" onPress={submitHandler}></Button>*/}
   <View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={submitHandler}><Text style={styles.btnText}>Submit</Text></TouchableOpacity>
     <TouchableOpacity style={styles.button} ><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
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
    
    return {
      
      User:state.appstate.userid,
      Token:state.appstate.tokenid,
    }
  }
  
  export default connect(
   
    mapStateToProps   
  )(Raccount)
  

const styles = StyleSheet.create({
    screen:{
     flex:1
    },
    headerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40
    
    },
    headerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    transImage:{
      height: 250,
      width: 250,
      opacity: 0.5,
      borderRadius:4, 
      marginTop:30     
    },
    textCont:{  
      justifyContent:'center',
      alignItems:'center'
     },
     textStyle:{
      fontFamily:'OpenSans-Bold',
      fontSize:18,
      marginTop:20,
      fontWeight:'bold',
      color:'#65451F'
      //color:'#FC6C85'    
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
    
    
    });