import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import FPostForm from "../../components/FPostForm";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from "../../components/Buttons";
import Header from "../../components/Header";
import { TextInput } from "react-native-paper";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';

const FreePostAd = ({User,Token,route,navigation}) => {

    
  const dispatch = useDispatch();

  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[mobile,setMobile] = useState("");
  const[ptitle,setPtitle] = useState("");
  const[st,setSt] = useState([]);

  useEffect(()=>{
    /*State list API Call*/
    fetch('https://reclancer.com/reactnative/getstate.php',{
      method: "Get",
      headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
      },  
    }).then((response) => response.json())
      .then((responseJson) => {

        const data = responseJson

      /*  const options = data.map(d => ({
          "value" : d.id,
          "label" : d.name
        }))*/
        setSt(data.map(d => ({
            "value" : d.id,
            "label" : d.name
          })));
        //console.log(responseJson);


        
           }).catch((error) => {
             console.error(error);
           });

          

   })
  
  const Validate=()=>{
    
     
  }

    return (
        <View style={styles.screen}>
          
          <FPostForm onSubmit={Validate}/>

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
    //console.log(state);
    //console.log(state.appstate.userid+"userjkdjfasdkjfakj")
    //console.log(state.appstate.tokenid+"userjkdjfasdkjfakj")
    return {
      //GetGoalScore: state.appstate.GoalScore
      User:state.appstate.userid,
      Token:state.appstate.tokenid,
    }
  }
  
  export default connect(
    mapStateToProps   
  )(FreePostAd)
  
const styles = StyleSheet.create({
     screen: {
            flex: 1,
            margin: 20
        },
        headerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
    
        },
        headerTitle: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputStyle: {
            margin: 15,
            width: 250,
            height: 50,
            borderColor: 'grey',
            borderRadius: 4,
            borderWidth: 1
    
        },
        btnHolder: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'stretch'
    
    
    
        }    

});