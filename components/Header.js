import React from "react";
import { StyleSheet,Text,View } from "react-native";

const Header = ({title}) => {

    return(
    <View style={styles.pageTitle}>
    <Text style={styles.pageText}>{title}</Text>
    </View>
    )

}

export default Header;

const styles = StyleSheet.create({
 pageTitle:{
    padding:15,
    width:200,
    backgroundColor:'#069A8E',
    borderRadius:6,
    justifyContent:'center',
    alignItems:'center',
 },
 pageText:{    
    color:'white',    
    fontSize:16,
    fontWeight:'bold'
 }

})