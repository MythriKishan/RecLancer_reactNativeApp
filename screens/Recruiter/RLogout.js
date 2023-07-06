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
          
        <View style={styles.btnHolder}>
                    <Buttons text="Logout" onPress={LogoutHandler} />
                    
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
       }

});

export default RLogout;