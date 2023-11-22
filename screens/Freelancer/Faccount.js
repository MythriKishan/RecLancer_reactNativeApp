import React, { useState,useEffect } from "react";
import { StyleSheet,Text,View,Button,Image, Alert } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import RecSearch from "./RecSearch";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";


const Faccount = ({User,Token,route,navigation}) => {

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
          navigation.navigate('Hide Profile')
        }
        else{
            navigation.navigate('Delete Account')
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
        radioBackground="green"
      >
        <RadioButtonItem value="1" label="Hide Profile" />
        <RadioButtonItem
          value="2"
          label={
            <Text style={{ color: "red" }}>Delete Account</Text>
          }
        />
      </RadioButtonGroup>
    </View>

    <Button title="Submit" onPress={submitHandler}></Button>
  
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
  )(Faccount)
  

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
    
    
    });