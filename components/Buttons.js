import React from 'react';
import { StyleSheet,Text,View,TouchableOpacity } from 'react-native';


const Buttons = ({ text, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.btnCon}>
          
          <Text style={styles.btnText}> {text} </Text>
        </View>
      </TouchableOpacity>
    )
  }
  

export default Buttons;

const styles = StyleSheet.create({
    btnCon:{
        marginTop:5,      
        marginBottom:30,
        backgroundColor:'#069A8E',
        borderColor:'#94B49F',
        borderRadius:10,
        width:100, 
        fontWeight:"900",
        justifyContent:'center',
        alignItems: "center",
        padding: 15,
        
        },
        btnText:{
          color:'white',          
          fontSize:16,
          fontWeight:'bold'
        }
     
    
});