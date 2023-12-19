import React,{useState,useEffect}from "react";
import { StyleSheet,Text,View,FlatList,TouchableOpacity,Alert,Button } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Buttons from "../../components/Buttons";


const Fdelete = ({User,Token,route,navigation}) => {

    const DeleteHandler = () => {

        fetch('https://reclancer.com/reclancerapi/fdelete.php',
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



    return (        
        <View style={styles.screen}>

        <View style={styles.headerStyle}>
      
        </View>   

          <Text style={styles.errorStyle}>User {User} are you sure you want to Delete this Account?</Text>

     {/* <View style={styles.Btnrow}>

        <TouchableOpacity onPress={DeleteHandler} style={styles.btnStyle}>
          <Text style={styles.textStyle}>Yes</Text>
    </TouchableOpacity> */}
        {/*<TouchableOpacity onPress={cancelHandler} style={styles.btnStyle}>
          <Text style={styles.textStyle}>No</Text>
    </TouchableOpacity>*/}

<View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={DeleteHandler}><Text style={styles.btnText}>Yes</Text></TouchableOpacity>
     <TouchableOpacity style={styles.button} ><Text style={styles.btnText}>No</Text></TouchableOpacity>
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
  )(Fdelete)

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

