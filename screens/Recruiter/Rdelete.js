import React,{useState,useEffect}from "react";
import { StyleSheet,Text,View,FlatList,TouchableOpacity,Alert,Button } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Buttons from "../../components/Buttons";


const Rdelete = ({User,Token,route,navigation}) => {

    const DeleteHandler = () => {

        fetch('https://reclancer.com/reclancerapi/rdelete.php',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          },
          body: JSON.stringify({
                id: User,
                
          })
        }).then((response) => response.json())
        .then((responseJson) => {
    
            if(responseJson.code===200)
            {
                navigation.navigate('Home')
            }
            else
            {
                Alert.alert(Error,Retry);
            }
         
         })
       

    }

    const cancelHandler = () =>{
      Alert.alert("Dont Delete");
    }



    return (        
        <View style={styles.screen}>

        <View style={styles.headerStyle}>
      
        </View>   

          <Text style={styles.errorStyle}>User {User} are you sure you want to Delete this Account?</Text>

      <View style={styles.btnHolder}>

        <TouchableOpacity onPress={DeleteHandler} style={styles.btnStyle}>
          <Text style={styles.textStyle}>Yes</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={cancelHandler} style={styles.btnStyle}>
          <Text style={styles.textStyle}>No</Text>
    </TouchableOpacity>
      </View>
   
          
       

          
        </View>
       
    )


}

const mapDispatchToProps = dispatch => {
    return {
      userId: (id) => dispatch(actions.action_userid(id)),
      TokenId: (token) => dispatch(actions.action_token(token)),
  
    }
  }
  
  const mapStateToProps = (state /*, ownProps*/) => {
  
    return {
  
      User: state.appstate.userid,
      Token: state.appstate.tokenid,
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rdelete)

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
    justifyContent:'center',
    alignItems:'center'
    },
    errorText:{
        fontSize:12,
        fontFamily:'OpenSans-bold',
        color:'red'
       },
       btnStyle: {
        backgroundColor: '#565e5e',
        width: '45%',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorStyle: {
        color: '#E21818',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 16
    
      },

});

