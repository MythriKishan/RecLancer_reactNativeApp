import React,{useState,useEffect}from "react";
import { StyleSheet,Text,View,FlatList,TouchableOpacity,Alert,Button } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Buttons from "../../components/Buttons";


const RLogout = ({User,Token,route,navigation}) => {

    const LogoutHandler = () => {
     
        navigation.navigate('Home')

    }


    return (        
        <View style={styles.screen}>

        <View style={styles.headerStyle}>
      
        </View>      
          
       
        <View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={LogoutHandler}><Text style={styles.btnText}>Logout</Text></TouchableOpacity>
     
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
    justifyContent:'center',
    alignItems:'center'
    },
    errorText:{
        fontSize:12,
        fontFamily:'OpenSans-bold',
        color:'red'
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

export default RLogout;